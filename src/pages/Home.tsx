interface HomeProps {
  onNavigate: (page: string) => void;
}

export default function Home({ onNavigate }: HomeProps) {
  return (
    <div className="home-page fade-in">
      <div className="home-bg" />

      <div className="home-content">
        <p className="home-eyebrow">A Digital Gallery Experience</p>
        <h1 className="home-title">وهج</h1>
        <p className="home-subtitle">Wahag — The Glow</p>
        <p className="home-desc">
          Step inside a luminous space where masterpieces breathe. Walk through the gallery,
          turn left and right, and let the art find you. Eight iconic works. One singular light.
        </p>
        <div className="home-actions">
          <button className="btn-primary" onClick={() => onNavigate("gallery")}>
            Enter Gallery
          </button>
          <button className="btn-secondary" onClick={() => onNavigate("explore")}>
            Explore Works
          </button>
        </div>
      </div>

      <div className="home-scroll-hint">
        <div className="home-scroll-line" />
        <span>Eight Works</span>
      </div>
    </div>
  );
}
