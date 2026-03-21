const TICKER_TEXT =
  "ASTORIA · WILLIAMSBURG · PARK SLOPE · BUSHWICK · EAST VILLAGE · CHELSEA · SOHO · UWS · UES · HARLEM · INWOOD · BED-STUY · GREENPOINT · LIC · JACKSON HTS · FLUSHING · COBBLE HILL · DUMBO · SUNSET PARK · BAY RIDGE · CROWN HTS · FLATBUSH · FOREST HILLS · RIDGEWOOD · WASH HTS · WEST VILLAGE · TRIBECA · HELL'S KITCHEN · GRAMERCY · FIDI · MORNINGSIDE · SUNNYSIDE · DITMAS PARK · KENSINGTON · EAST HARLEM · WOODSIDE · CARROLL GARDENS · BK HEIGHTS · BENSONHURST · BAYSIDE · RIVERDALE · MOTT HAVEN · BELMONT · ST. GEORGE · ELMHURST · JAMAICA · TOTTENVILLE · ";

export default function NeighborhoodTicker() {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: "28px",
        background: "var(--s0)",
        display: "flex",
        alignItems: "center",
        overflow: "hidden",
        zIndex: 20,
      }}
    >
      <div
        style={{
          display: "flex",
          whiteSpace: "nowrap",
          animation: "scroll 50s linear infinite",
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: "10px",
          color: "var(--t3)",
          letterSpacing: ".1em",
          textTransform: "uppercase",
        }}
      >
        <span>{TICKER_TEXT}</span>
        <span>{TICKER_TEXT}</span>
        <span>{TICKER_TEXT}</span>
      </div>
    </div>
  );
}
