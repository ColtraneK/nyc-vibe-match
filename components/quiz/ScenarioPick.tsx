"use client";

interface Option {
  label: string;
  val: string;
  icon: string;
  w: Record<string, number>;
}

interface Props {
  opts: Option[];
  onAnswer: (answer: { val: string; w: Record<string, number> }) => void;
}

export default function ScenarioPick({ opts, onAnswer }: Props) {
  return (
    <div style={{ padding: "0 24px", display: "flex", flexDirection: "column", gap: "8px" }}>
      {opts.map((opt) => (
        <button
          key={opt.val}
          onClick={() => onAnswer({ val: opt.val, w: opt.w })}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "13px",
            width: "100%",
            padding: "16px 18px",
            borderRadius: "14px",
            background: "rgba(255,255,255,.04)",
            border: "1.5px solid rgba(255,255,255,.1)",
            fontSize: "15px",
            textAlign: "left",
            color: "var(--t1)",
            transition: "all .15s",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,.09)";
            (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255,255,255,.2)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,.04)";
            (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255,255,255,.1)";
          }}
        >
          <span style={{ fontSize: "21px", flexShrink: 0 }}>{opt.icon}</span>
          <span>{opt.label}</span>
        </button>
      ))}
    </div>
  );
}
