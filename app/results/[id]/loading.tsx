export default function ResultsLoading() {
  return (
    <div style={{ paddingTop: "16px", paddingBottom: "60px" }}>
      {/* Label */}
      <div
        style={{
          height: "10px",
          width: "140px",
          background: "var(--s1)",
          borderRadius: "4px",
          margin: "0 auto 20px",
          animation: "pulse 1.5s ease infinite",
        }}
      />

      {/* MetroCard skeleton */}
      <div
        style={{
          margin: "0 16px 16px",
          borderRadius: "16px",
          overflow: "hidden",
          border: "1px solid var(--s2)",
        }}
      >
        <div style={{ height: "40px", background: "var(--s1)", animation: "pulse 1.5s ease infinite" }} />
        <div style={{ background: "#1A2030", padding: "18px 16px" }}>
          <div style={{ height: "34px", width: "60%", background: "var(--s1)", borderRadius: "6px", marginBottom: "8px", animation: "pulse 1.5s ease infinite" }} />
          <div style={{ height: "10px", width: "30%", background: "var(--s1)", borderRadius: "4px", marginBottom: "16px", animation: "pulse 1.5s ease infinite" }} />
          <div style={{ height: "28px", width: "80px", background: "var(--s1)", borderRadius: "4px", marginBottom: "14px", animation: "pulse 1.5s ease infinite" }} />
          <div style={{ height: "10px", width: "70%", background: "var(--s1)", borderRadius: "4px", marginBottom: "20px", animation: "pulse 1.5s ease infinite" }} />
          {[...Array(7)].map((_, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "5px" }}>
              <div style={{ height: "3px", flex: 1, background: "var(--s1)", borderRadius: "2px", animation: "pulse 1.5s ease infinite" }} />
            </div>
          ))}
        </div>
      </div>

      {/* Description skeleton */}
      <div
        style={{
          margin: "0 16px 18px",
          padding: "18px 16px",
          borderRadius: "14px",
          background: "var(--s0)",
          border: "1px solid var(--s1)",
        }}
      >
        {[100, 85, 92, 78, 90, 60].map((w, i) => (
          <div
            key={i}
            style={{
              height: "12px",
              width: `${w}%`,
              background: "var(--s1)",
              borderRadius: "4px",
              marginBottom: "8px",
              animation: "pulse 1.5s ease infinite",
            }}
          />
        ))}
      </div>

      {/* Map skeleton */}
      <div
        style={{
          height: "10px",
          width: "80px",
          background: "var(--s1)",
          borderRadius: "4px",
          margin: "0 16px 10px",
          animation: "pulse 1.5s ease infinite",
        }}
      />
      <div
        style={{
          margin: "0 12px 20px",
          borderRadius: "16px",
          height: "260px",
          background: "var(--s0)",
          border: "1px solid var(--s1)",
          animation: "pulse 1.5s ease infinite",
        }}
      />

      {/* List skeletons */}
      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          style={{
            margin: "0 16px 8px",
            height: "56px",
            borderRadius: "14px",
            background: i === 0 ? "var(--s1)" : "var(--s0)",
            border: "1px solid var(--s1)",
            animation: "pulse 1.5s ease infinite",
          }}
        />
      ))}
    </div>
  );
}
