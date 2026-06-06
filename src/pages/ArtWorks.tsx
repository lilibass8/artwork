import { useState } from "react";
import { paintings, type Painting } from "../data/paintings";

interface ArtWorksProps {
  onNavigate: (page: string) => void;
}

export default function ArtWorks({ onNavigate }: ArtWorksProps) {
  const [selected, setSelected] = useState<Painting | null>(null);

  return (
    <div className="artworks-page">
      <div className="artworks-header fade-in">
        <p className="explore-eyebrow">العمل الفني — Catalogue</p>
        <h1 className="explore-title">Art Works</h1>
        <p className="explore-desc">
          The complete collection housed within وهج. Click any work to explore its story.
        </p>
      </div>

      <table className="artworks-table">
        <thead className="artworks-table-head">
          <tr>
            <th style={{ width: "76px" }}></th>
            <th>Work</th>
            <th style={{ width: "100px" }}>Year</th>
            <th style={{ width: "180px" }}>Movement</th>
          </tr>
        </thead>
        <tbody>
          {paintings.map((p, i) => (
            <tr
              key={p.id}
              className="artworks-row"
              style={{ animationDelay: `${i * 0.04}s` }}
              onClick={() => setSelected(p)}
            >
              <td>
                <img className="artwork-thumb" src={p.imageUrl} alt={p.title} />
              </td>
              <td className="artwork-title-cell">
                <div>
                  <div className="artwork-title-text">{p.title}</div>
                  <div className="artwork-artist-text">{p.artist}</div>
                </div>
              </td>
              <td className="artwork-year-text">{p.year}</td>
              <td>
                <span className="artwork-cat-badge">{p.category}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

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
