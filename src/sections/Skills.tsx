import { useLang } from '../context/LangContext';
import './Skills.css';

export function SkillsChapter() {
  const { t } = useLang();
  return (
    <div className="chapter-inner skills-inner">
      <div className="skills-head">
        <div className="section-label">
          <span>{t.skills.number}</span>
          <span>{t.skills.title}</span>
        </div>
        <h2 className="skills-heading font-display">Skills</h2>
      </div>

      <div className="skills-grid">
        {t.skills.groups.map((g, i) => (
          <div key={i} className="skills-item">
            <div className="skills-item-num">0{i + 1}</div>
            <h3 className="skills-item-heading font-serif">{g.heading}</h3>
            <p className="skills-item-list">{g.items}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
