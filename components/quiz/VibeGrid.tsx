"use client";

interface Cell {
  label: string;
  icon: string;
  val: string;
  w: Record<string, number>;
}

interface Props {
  cells: Cell[];
  onAnswer: (answer: { val: string; w: Record<string, number> }) => void;
}

export default function VibeGrid({ cells, onAnswer }: Props) {
  return (
    <div
      style={{
        padding: "0 24px",
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "10px",
      }}
    >
      {cells.map((cell) => (
        <button
          key={cell.val}
          className="frost-box"
          onClick={() => onAnswer({ val: cell.val, w: cell.w })}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
            padding: "28px 14px",
            borderRadius: "16px",
            background: "var(--s0)",
            border: "1.5px solid var(--b1)",
            fontSize: "14px",
            color: "var(--t1)",
            transition: "all .2s",
            cursor: "pointer",
          }}
          onMouseEnter={(e) => {
            const btn = e.currentTarget as HTMLButtonElement;
            btn.style.background = "var(--s1)";
            btn.style.borderColor = "var(--b2)";
            btn.style.transform = "scale(1.02)";
          }}
          onMouseLeave={(e) => {
            const btn = e.currentTarget as HTMLButtonElement;
            btn.style.background = "var(--s0)";
            btn.style.borderColor = "var(--b1)";
            btn.style.transform = "scale(1)";
          }}
        >
          <span style={{ fontSize: "32px" }}>{cell.icon}</span>
          <span style={{ fontSize: "13px", color: "var(--t2)" }}>{cell.label}</span>
        </button>
      ))}
    </div>
  );
}
