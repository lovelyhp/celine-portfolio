import { useLang } from '../context/LangContext';
import './Contact.css';

export function ContactChapter() {
  const { t } = useLang();
  return (
    <div className="chapter-inner contact-inner">
      <div>
        <div className="section-label">
          <span>{t.contact.number}</span>
          <span>{t.contact.title}</span>
        </div>
        <h2 className="contact-heading font-display">{t.contact.heading}</h2>
      </div>

      <div className="contact-links">
        <a href={`mailto:${t.contact.email}`} className="contact-link">
          <span className="contact-link-label">Email</span>
          <span className="contact-link-value font-italic-serif">{t.contact.email}</span>
          <span className="contact-link-arrow">↗</span>
        </a>
        <a
          href={t.contact.linkedinUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="contact-link"
        >
          <span className="contact-link-label">LinkedIn</span>
          <span className="contact-link-value font-italic-serif">{t.contact.linkedin}</span>
          <span className="contact-link-arrow">↗</span>
        </a>
      </div>

      <div className="contact-footer font-italic-serif">{t.footer.copyright}</div>
    </div>
  );
}
