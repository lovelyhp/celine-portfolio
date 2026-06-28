import { useState } from 'react';
import { useLightbox } from './Lightbox';
import './Shot.css';

interface ShotProps {
  /** filename inside /public/images/ */
  src: string;
  alt: string;
  /** CSS aspect-ratio, e.g. '16 / 9' (default) */
  ratio?: string;
  /** 'fill' stretches to the frame (no gaps, no crop), 'cover' fills & crops, 'contain' shows whole image */
  fit?: 'cover' | 'contain' | 'fill';
  /** when set, the thumbnail is a new-tab link to this URL instead of opening the lightbox */
  href?: string;
}

/** A thumbnail frame. With `href` it links out in a new tab; otherwise it opens
 *  the image in the Lightbox. Before the file exists it shows a labelled placeholder. */
export function Shot({ src, alt, ratio = '16 / 9', fit = 'cover', href }: ShotProps) {
  const open = useLightbox();
  const [failed, setFailed] = useState(false);

  const inner = (
    <>
      {!failed ? (
        <img
          src={`/images/${src}`}
          alt={alt}
          loading="lazy"
          style={{ objectFit: fit }}
          onError={() => setFailed(true)}
        />
      ) : (
        <span className="shot-ph">
          <span className="shot-ph-icon" aria-hidden="true">▦</span>
          <span className="shot-ph-name">{src}</span>
        </span>
      )}
      {!failed && <span className="shot-zoom" aria-hidden="true">{href ? '↗' : '⤢'}</span>}
    </>
  );

  if (href) {
    return (
      <a
        className="shot shot--link"
        style={{ aspectRatio: ratio }}
        href={href}
        target="_blank"
        rel="noreferrer"
        aria-label={`${alt} — 새 탭에서 열기`}
      >
        {inner}
      </a>
    );
  }

  return (
    <button
      type="button"
      className="shot"
      style={{ aspectRatio: ratio }}
      onClick={() => { if (!failed) open(src, alt); }}
      aria-label={`${alt} — 확대 보기`}
    >
      {inner}
    </button>
  );
}
