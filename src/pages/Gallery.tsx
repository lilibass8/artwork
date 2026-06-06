import { useEffect, useRef, useState, useCallback } from "react";
import * as THREE from "three";
import { paintings, type Painting } from "../data/paintings";

interface GalleryProps {
  onNavigate: (page: string) => void;
}

const MOVE_SPEED = 0.08;
const TURN_SPEED = 0.035;

// Gallery layout: long corridor with paintings on both sides
const GALLERY_WIDTH = 8;
const GALLERY_LENGTH = 60;
const WALL_HEIGHT = 5;
const PAINTING_Y = 1.9;
const PAINTING_MARGIN = 7;

function buildGallery(scene: THREE.Scene): { mesh: THREE.Mesh; painting: Painting; normal: THREE.Vector3 }[] {
  const textureLoader = new THREE.TextureLoader();

  // Floor
  const floorGeo = new THREE.PlaneGeometry(GALLERY_WIDTH, GALLERY_LENGTH);
  const floorMat = new THREE.MeshLambertMaterial({ color: 0xd8cfc0 });
  const floor = new THREE.Mesh(floorGeo, floorMat);
  floor.rotation.x = -Math.PI / 2;
  floor.position.set(0, 0, -GALLERY_LENGTH / 2 + 2);
  scene.add(floor);

  // Ceiling
  const ceilGeo = new THREE.PlaneGeometry(GALLERY_WIDTH, GALLERY_LENGTH);
  const ceilMat = new THREE.MeshLambertMaterial({ color: 0xf2ede6 });
  const ceil = new THREE.Mesh(ceilGeo, ceilMat);
  ceil.rotation.x = Math.PI / 2;
  ceil.position.set(0, WALL_HEIGHT, -GALLERY_LENGTH / 2 + 2);
  scene.add(ceil);

  // Left wall
  const leftWallGeo = new THREE.PlaneGeometry(GALLERY_LENGTH, WALL_HEIGHT);
  const wallMat = new THREE.MeshLambertMaterial({ color: 0xede8df });
  const leftWall = new THREE.Mesh(leftWallGeo, wallMat);
  leftWall.rotation.y = Math.PI / 2;
  leftWall.position.set(-GALLERY_WIDTH / 2, WALL_HEIGHT / 2, -GALLERY_LENGTH / 2 + 2);
  scene.add(leftWall);

  // Right wall
  const rightWall = new THREE.Mesh(leftWallGeo, wallMat.clone());
  rightWall.rotation.y = -Math.PI / 2;
  rightWall.position.set(GALLERY_WIDTH / 2, WALL_HEIGHT / 2, -GALLERY_LENGTH / 2 + 2);
  scene.add(rightWall);

  // Back wall
  const backWallGeo = new THREE.PlaneGeometry(GALLERY_WIDTH, WALL_HEIGHT);
  const backWall = new THREE.Mesh(backWallGeo, wallMat.clone());
  backWall.position.set(0, WALL_HEIGHT / 2, -GALLERY_LENGTH + 2);
  scene.add(backWall);

  // Front wall
  const frontWall = new THREE.Mesh(backWallGeo, wallMat.clone());
  frontWall.rotation.y = Math.PI;
  frontWall.position.set(0, WALL_HEIGHT / 2, 2);
  scene.add(frontWall);

  // Baseboard trim (thin horizontal strips on walls)
  const baseboardMat = new THREE.MeshLambertMaterial({ color: 0xb8b0a5 });
  [[-GALLERY_WIDTH / 2, 0], [GALLERY_WIDTH / 2, Math.PI]].forEach(([x, ry]) => {
    const geo = new THREE.BoxGeometry(0.04, 0.25, GALLERY_LENGTH);
    const mesh = new THREE.Mesh(geo, baseboardMat);
    mesh.rotation.y = ry as number;
    mesh.position.set(x as number, 0.125, -GALLERY_LENGTH / 2 + 2);
    scene.add(mesh);
  });

  // Ceiling light strip
  const lightStripMat = new THREE.MeshBasicMaterial({ color: 0xfffbe8 });
  const lightStripGeo = new THREE.BoxGeometry(0.4, 0.05, GALLERY_LENGTH - 4);
  const lightStrip = new THREE.Mesh(lightStripGeo, lightStripMat);
  lightStrip.position.set(0, WALL_HEIGHT - 0.02, -GALLERY_LENGTH / 2 + 2);
  scene.add(lightStrip);

  // Paintings
  const paintingMeshes: { mesh: THREE.Mesh; painting: Painting; normal: THREE.Vector3 }[] = [];

  paintings.forEach((painting, i) => {
    const side = i % 2 === 0 ? "left" : "right";
    const zPos = -(i * PAINTING_MARGIN) - 4;

    const paintingW = 2.4;
    const paintingH = 1.8;

    const paintingGeo = new THREE.PlaneGeometry(paintingW, paintingH);
    const paintingMat = new THREE.MeshBasicMaterial({ color: 0x2a2520 });

    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      const texture = new THREE.Texture(img);
      texture.colorSpace = THREE.SRGBColorSpace;
      texture.needsUpdate = true;
      paintingMat.map = texture;
      paintingMat.color.set(0xffffff);
      paintingMat.needsUpdate = true;
    };
    img.src = painting.imageUrl;
    const paintingMesh = new THREE.Mesh(paintingGeo, paintingMat);

    if (side === "left") {
      paintingMesh.position.set(-GALLERY_WIDTH / 2 + 0.06, PAINTING_Y, zPos);
      paintingMesh.rotation.y = Math.PI / 2;
    } else {
      paintingMesh.position.set(GALLERY_WIDTH / 2 - 0.06, PAINTING_Y, zPos);
      paintingMesh.rotation.y = -Math.PI / 2;
    }
    scene.add(paintingMesh);

    // Black frame
    const frameW = paintingW + 0.12;
    const frameH = paintingH + 0.12;
    const frameDepth = 0.06;
    const frameMat = new THREE.MeshLambertMaterial({ color: 0x1a1612 });

    // Frame as 4 bars
    const frameTop = new THREE.Mesh(new THREE.BoxGeometry(frameW, 0.06, frameDepth), frameMat);
    const frameBot = new THREE.Mesh(new THREE.BoxGeometry(frameW, 0.06, frameDepth), frameMat);
    const frameLeft = new THREE.Mesh(new THREE.BoxGeometry(0.06, frameH, frameDepth), frameMat);
    const frameRight = new THREE.Mesh(new THREE.BoxGeometry(0.06, frameH, frameDepth), frameMat);

    [frameTop, frameBot, frameLeft, frameRight].forEach((f) => {
      f.position.copy(paintingMesh.position);
      f.rotation.copy(paintingMesh.rotation);
      scene.add(f);
    });

    if (side === "left") {
      frameTop.position.y += paintingH / 2 + 0.03;
      frameTop.position.x += frameDepth / 2;
      frameBot.position.y -= paintingH / 2 + 0.03;
      frameBot.position.x += frameDepth / 2;
      frameLeft.position.z -= paintingW / 2 + 0.03;
      frameLeft.position.x += frameDepth / 2;
      frameRight.position.z += paintingW / 2 + 0.03;
      frameRight.position.x += frameDepth / 2;
    } else {
      frameTop.position.y += paintingH / 2 + 0.03;
      frameTop.position.x -= frameDepth / 2;
      frameBot.position.y -= paintingH / 2 + 0.03;
      frameBot.position.x -= frameDepth / 2;
      frameLeft.position.z += paintingW / 2 + 0.03;
      frameLeft.position.x -= frameDepth / 2;
      frameRight.position.z -= paintingW / 2 + 0.03;
      frameRight.position.x -= frameDepth / 2;
    }

    // Spotlight
    const spotlight = new THREE.SpotLight(0xfff5e0, 2.5, 6, Math.PI / 6, 0.6);
    spotlight.position.set(
      side === "left" ? -GALLERY_WIDTH / 2 + 1.5 : GALLERY_WIDTH / 2 - 1.5,
      WALL_HEIGHT - 0.3,
      zPos
    );
    spotlight.target = paintingMesh;
    scene.add(spotlight);
    scene.add(spotlight.target);

    const normal = side === "left"
      ? new THREE.Vector3(1, 0, 0)
      : new THREE.Vector3(-1, 0, 0);

    paintingMeshes.push({ mesh: paintingMesh, painting, normal });
  });

  return paintingMeshes;
}

export default function Gallery({ onNavigate }: GalleryProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const keysRef = useRef<Set<string>>(new Set());
  const paintingMeshesRef = useRef<{ mesh: THREE.Mesh; painting: Painting; normal: THREE.Vector3 }[]>([]);
  const animFrameRef = useRef<number>(0);
  const [activePainting, setActivePainting] = useState<Painting | null>(null);
  const [activeKeys, setActiveKeys] = useState<Set<string>>(new Set());

  const normalizeKey = useCallback((e: KeyboardEvent) => {
    switch (e.code) {
      case "KeyW":
        return "w";
      case "KeyA":
        return "a";
      case "KeyS":
        return "s";
      case "KeyD":
        return "d";
      case "ArrowUp":
        return "arrowup";
      case "ArrowDown":
        return "arrowdown";
      case "ArrowLeft":
        return "arrowleft";
      case "ArrowRight":
        return "arrowright";
      default:
        return e.key.toLowerCase();
    }
  }, []);

  const onKeyDown = useCallback((e: KeyboardEvent) => {
    const k = normalizeKey(e);
    if (!k) return;
    keysRef.current.add(k);
    setActiveKeys(new Set(keysRef.current));
    if (["w", "a", "s", "d", "arrowup", "arrowdown", "arrowleft", "arrowright"].includes(k)) {
      e.preventDefault();
    }
  }, [normalizeKey]);

  const onKeyUp = useCallback((e: KeyboardEvent) => {
    const k = normalizeKey(e);
    if (!k) return;
    keysRef.current.delete(k);
    setActiveKeys(new Set(keysRef.current));
  }, [normalizeKey]);

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0f0d0b);
    scene.fog = new THREE.Fog(0x0f0d0b, 18, 55);
    sceneRef.current = scene;

    // Camera
    const camera = new THREE.PerspectiveCamera(
      72,
      mountRef.current.clientWidth / mountRef.current.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 1.65, 0);
    camera.rotation.y = Math.PI; // face into gallery
    cameraRef.current = camera;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    renderer.shadowMap.enabled = true;
    mountRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Ambient light (warm gallery)
    const ambient = new THREE.AmbientLight(0xfff5e0, 0.55);
    scene.add(ambient);

    // Corridor point lights
    for (let z = -4; z > -GALLERY_LENGTH + 4; z -= 8) {
      const light = new THREE.PointLight(0xfff8ee, 0.6, 14);
      light.position.set(0, WALL_HEIGHT - 0.5, z);
      scene.add(light);
    }

    // Build gallery
    paintingMeshesRef.current = buildGallery(scene);

    // Raycaster for proximity detection
    const raycaster = new THREE.Raycaster();

    // Animation loop
    const loop = () => {
      animFrameRef.current = requestAnimationFrame(loop);

      const keys = keysRef.current;

      // Movement
      const forward = new THREE.Vector3();
      camera.getWorldDirection(forward);
      forward.y = 0;
      forward.normalize();

      const right = new THREE.Vector3();
      right.crossVectors(forward, new THREE.Vector3(0, 1, 0));

      if (keys.has("w") || keys.has("arrowup")) {
        camera.position.addScaledVector(forward, MOVE_SPEED);
      }
      if (keys.has("s") || keys.has("arrowdown")) {
        camera.position.addScaledVector(forward, -MOVE_SPEED);
      }
      if (keys.has("a") || keys.has("arrowleft")) {
        camera.rotation.y += TURN_SPEED;
      }
      if (keys.has("d") || keys.has("arrowright")) {
        camera.rotation.y -= TURN_SPEED;
      }

      // Clamp to gallery bounds
      camera.position.x = Math.max(-GALLERY_WIDTH / 2 + 0.6, Math.min(GALLERY_WIDTH / 2 - 0.6, camera.position.x));
      camera.position.z = Math.max(-GALLERY_LENGTH + 2.5, Math.min(1.5, camera.position.z));
      camera.position.y = 1.65;

      // Detect closest painting in view
      raycaster.setFromCamera(new THREE.Vector2(0, 0), camera);
      const meshes = paintingMeshesRef.current.map((p) => p.mesh);
      const intersects = raycaster.intersectObjects(meshes);

      if (intersects.length > 0 && intersects[0].distance < 3.5) {
        const hit = paintingMeshesRef.current.find((p) => p.mesh === intersects[0].object);
        if (hit) setActivePainting(hit.painting);
      } else {
        setActivePainting(null);
      }

      renderer.render(scene, camera);
    };
    loop();

    // Resize
    const onResize = () => {
      if (!mountRef.current) return;
      camera.aspect = mountRef.current.clientWidth / mountRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    };
    window.addEventListener("resize", onResize);
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);

    return () => {
      cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
      renderer.dispose();
      if (mountRef.current?.contains(renderer.domElement)) {
        mountRef.current.removeChild(renderer.domElement);
      }
    };
  }, [onKeyDown, onKeyUp]);

  return (
    <div className="gallery-page">
      <div ref={mountRef} className="gallery-canvas" />

      {/* Crosshair */}
      <div className="crosshair" />

      {/* Painting info panel */}
      <div className={`painting-info ${activePainting ? "visible" : ""}`}>
        {activePainting && (
          <div className="painting-info-inner">
            <p className="painting-info-category">{activePainting.category}</p>
            <h3 className="painting-info-title">{activePainting.title}</h3>
            <p className="painting-info-artist">{activePainting.artist}</p>
            <p className="painting-info-year">{activePainting.year}</p>
            <div className="painting-info-divider" />
            <p className="painting-info-desc">{activePainting.description}</p>
          </div>
        )}
      </div>

      {/* HUD controls */}
      <div className="gallery-hud">
        <div className="gallery-controls">
          <div className="controls-row">
            <div className={`key ${activeKeys.has("w") ? "active" : ""}`}>W</div>
          </div>
          <div className="controls-row">
            <div className={`key ${activeKeys.has("a") ? "active" : ""}`}>A</div>
            <div className={`key ${activeKeys.has("s") ? "active" : ""}`}>S</div>
            <div className={`key ${activeKeys.has("d") ? "active" : ""}`}>D</div>
          </div>
          <p className="controls-label">Move · Turn</p>
        </div>
      </div>
    </div>
  );
}
