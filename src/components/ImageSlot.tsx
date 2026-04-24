import './ImageSlot.css';

interface ImageSlotProps {
  src: string | null;
  caption: string;
  hint: string;
  variant?: 'portrait' | 'landscape';
}

export function ImageSlot({ src, caption, hint, variant = 'portrait' }: ImageSlotProps) {
  return (
    <figure className={`img-slot img-${variant}`}>
      <div className="img-frame">
        {src ? (
          <img src={`/images/${src}`} alt={caption} />
        ) : (
          <div className="img-placeholder">
            <div className="img-placeholder-corner img-placeholder-tl" />
            <div className="img-placeholder-corner img-placeholder-tr" />
            <div className="img-placeholder-corner img-placeholder-bl" />
            <div className="img-placeholder-corner img-placeholder-br" />
            <div className="img-placeholder-inner">
              <div className="img-placeholder-label font-italic-serif">image goes here</div>
              <div className="img-placeholder-hint">{hint}</div>
            </div>
          </div>
        )}
      </div>
      <figcaption className="img-caption font-italic-serif">— {caption}</figcaption>
    </figure>
  );
}
