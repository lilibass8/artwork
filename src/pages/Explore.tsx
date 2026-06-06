import { useState } from "react";
import { paintings, type Painting } from "../data/paintings";

interface ExploreProps {
  onNavigate: (page: string) => void;
}

export default function Explore({ onNavigate }: ExploreProps) {
  const [filter, setFilter] = useState("All");
  const [selected, setSelected] = useState<Painting | null>(null);

  const categories = ["All", ...Array.from(new Set(paintings.map((p) => p.category)))];

  const filtered =
    filter === "All" ? paintings : paintings.filter((p) => p.category === filter);

  return (
    <div className="explore-page">
      <div className="explore-header fade-in">
        <p className="explore-eyebrow">اكتشاف — Collection</p>
        <h1 className="explore-title">Explore the Works</h1>
        <p className="explore-desc">
          Eight masterpieces spanning five centuries. Each painting a world unto itself.
        </p>
      </div>

      <div className="explore-filter fade-in">
        {categories.map((cat) => (
          <button
            key={cat}
            className={`filter-btn ${filter === cat ? "active" : ""}`}
            onClick={() => setFilter(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="explore-grid">
        {filtered.map((painting, i) => (
          <div
            key={painting.id}
            className="explore-card"
            style={{ animationDelay: `${i * 0.05}s` }}
            onClick={() => setSelected(painting)}
          >
            <img src={painting.imageUrl} alt={painting.title} loading="lazy" />
            <div className="explore-card-overlay">
              <p className="explore-card-category">{painting.category}</p>
              <h3 className="explore-card-title">{painting.title}</h3>
              <p className="explore-card-artist">{painting.artist}</p>
            </div>
          </div>
        ))}
      </div>

      {selected && (
        <div className="lightbox-backdrop" onClick={() => setSelected(null)}>
          <div className="lightbox-inner" onClick={(e) => e.stopPropagation()}>
            <div className="lightbox-img-wrap">
              <img src={selected.imageUrl} alt={selected.title} />
            </div>
            <div className="lightbox-info">
              <p className="lightbox-category">{selected.category}</p>
              <h2 className="lightbox-title">{selected.title}</h2>
              <p className="lightbox-artist">{selected.artist}</p>
              <p className="lightbox-year">{selected.year}</p>
              <div className="lightbox-divider" />
              <p className="lightbox-desc">{selected.description}</p>
              <button
                className="btn-secondary"
                onClick={() => {
                  setSelected(null);
                  onNavigate("gallery");
                }}
              >
                View in Gallery
              </button>
            </div>
          </div>
          <button className="lightbox-close" onClick={() => setSelected(null)}>
            ✕
          </button>
        </div>
      )}
    </div>
  );
}
