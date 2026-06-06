import { useState } from "react";
import Home from "./pages/Home";
import Gallery from "./pages/Gallery";
import Explore from "./pages/Explore";
import ArtWorks from "./pages/ArtWorks";

type Page = "home" | "gallery" | "explore" | "artworks";

export default function App() {
  const [page, setPage] = useState<Page>("home");

  const nav = (p: string) => setPage(p as Page);

  return (
    <div style={{ width: "100vw", height: "100vh", position: "relative", overflow: "hidden", background: "#0a0906" }}>
      {/* Navigation */}
      <nav>
        <span className="nav-logo" onClick={() => nav("home")}>
          <span>و</span>هج
        </span>
        <ul className="nav-links">
          <li>
            <a className={page === "home" ? "active" : ""} onClick={() => nav("home")}>
              الرئيسية
            </a>
          </li>
          <li>
            <a className={page === "artworks" ? "active" : ""} onClick={() => nav("artworks")}>
              العمل الفني
            </a>
          </li>
          <li>
            <a className={page === "explore" ? "active" : ""} onClick={() => nav("explore")}>
              اكتشاف
            </a>
          </li>
          <li>
            <a
              className={page === "gallery" ? "active" : ""}
              onClick={() => nav("gallery")}
              style={{ color: page === "gallery" ? "var(--accent)" : undefined }}
            >
              Enter Gallery
            </a>
          </li>
        </ul>
      </nav>

      {/* Pages */}
      {page === "home" && <Home onNavigate={nav} />}
      {page === "gallery" && <Gallery onNavigate={nav} />}
      {page === "explore" && <Explore onNavigate={nav} />}
      {page === "artworks" && <ArtWorks onNavigate={nav} />}
    </div>
  );
}
