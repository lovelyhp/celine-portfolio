import { useLang } from '../context/LangContext';
import './Contact.css';

export function ContactChapter() {
  const { t } = useLang();
  return (
    <div className="chapter-inner contact-inner">
      <div className="section-label">
        <span>{t.contact.number}</span>
        <span className="font-serif-italic">Contact</span>
      </div>
      <h2 className="contact-heading font-display">
        {t.contact.heading}
      </h2>
      <p className="contact-sub font-serif-italic">
        {t.contact.sub}
      </p>

      <div className="contact-links">
        <a className="contact-link" href={`mailto:${t.contact.email}`}>
          <span className="contact-link-label">Email</span>
          <span className="contact-link-value font-num">{t.contact.email}</span>
        </a>
        <a className="contact-link" href={t.contact.linkedinUrl} target="_blank" rel="noreferrer">
          <span className="contact-link-label">LinkedIn</span>
          <span className="contact-link-value font-num">{t.contact.linkedin}</span>
        </a>
        <a className="contact-link" href={t.contact.cvUrl} target="_blank" rel="noreferrer">
          <span className="contact-link-label">CV</span>
          <span className="contact-link-value font-num">{t.contact.cvValue}</span>
        </a>
      </div>

      <footer className="contact-footer">{t.footer.copyright}</footer>
    </div>
  );
}
