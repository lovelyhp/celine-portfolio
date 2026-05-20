import './BuildingDiagram.css';

type FloorIndex = 0 | 1 | 2 | 3 | 4 | 5;

export type BuildingSize = 'mini' | 'standard' | 'large';

export interface BuildingDiagramProps {
  /** 0 = ground floor (1F), 5 = top floor (6F). Highlights the given floor with amber. */
  highlight?: FloorIndex;
  size?: BuildingSize;
  /** If true, show full floor labels. False = only the floor number. */
  showLabels?: boolean;
}

const FLOORS = [
  { num: '6F', label: '대표실 + 유부' },
  { num: '5F', label: 'Léa (MoU)' },
  { num: '4F', label: 'Mail (154통)' },
  { num: '3F', label: 'Nomi (8건)' },
  { num: '2F', label: 'Solène (밸런스)' },
  { num: '1F', label: 'Reception' },
];

export function BuildingDiagram({
  highlight,
  size = 'standard',
  showLabels = true,
}: BuildingDiagramProps) {
  return (
    <div
      className={`building-diagram building-diagram--${size}`}
      role="img"
      aria-label="OIA 자동화 사무실 6층 빌딩 단면도"
    >
      <div className="building-diagram__roof">OIA · EST. 2026</div>
      <div className="building-diagram__body">
        {FLOORS.map((f, i) => {
          // FLOORS는 6F → 1F 순서이므로 highlight index와 매칭 시 5 - i
          const floorIndex = 5 - i;
          const isHighlighted = highlight === floorIndex;
          return (
            <div
              key={f.num}
              className="building-diagram__floor"
              data-floor={floorIndex}
              data-highlighted={isHighlighted}
            >
              <span className="building-diagram__floor-num">{f.num}</span>
              {showLabels && (
                <span className="building-diagram__floor-label">{' '}· {f.label}</span>
              )}
              <span className="building-diagram__lights" aria-hidden="true">
                <span className={isHighlighted ? 'on' : 'off'} />
                <span className={isHighlighted ? 'on' : 'off'} />
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
