"use client";

export default function AmbientGlow() {
  return (
    <>
      <div
        aria-hidden="true"
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 0,
          pointerEvents: "none",
          overflow: "hidden",
        }}
      >
        {/* Teal */}
        <div className="glow-blob glow-0" style={{
          width: 800, height: 800,
          background: "radial-gradient(circle, rgba(133,205,202,.22) 0%, transparent 70%)",
        }} />
        {/* Peach */}
        <div className="glow-blob glow-1" style={{
          width: 750, height: 750,
          background: "radial-gradient(circle, rgba(232,168,124,.20) 0%, transparent 70%)",
        }} />
        {/* Lavender */}
        <div className="glow-blob glow-2" style={{
          width: 700, height: 700,
          background: "radial-gradient(circle, rgba(181,184,232,.18) 0%, transparent 70%)",
        }} />
        {/* Gold */}
        <div className="glow-blob glow-3" style={{
          width: 650, height: 650,
          background: "radial-gradient(circle, rgba(232,193,112,.16) 0%, transparent 70%)",
        }} />
      </div>
      <style>{`
        .glow-blob {
          position: absolute;
          border-radius: 50%;
          filter: blur(40px);
          will-change: transform;
        }
        .glow-0 {
          top: -10%; left: -10%;
          animation: drift0 20s ease-in-out infinite;
        }
        .glow-1 {
          bottom: -10%; right: -15%;
          animation: drift1 24s ease-in-out infinite;
        }
        .glow-2 {
          top: 30%; right: -5%;
          animation: drift2 28s ease-in-out infinite;
        }
        .glow-3 {
          bottom: 10%; left: 5%;
          animation: drift3 22s ease-in-out infinite;
        }
        @keyframes drift0 {
          0%   { transform: translate(0, 0); }
          25%  { transform: translate(50vw, 20vh); }
          50%  { transform: translate(30vw, 60vh); }
          75%  { transform: translate(70vw, 30vh); }
          100% { transform: translate(0, 0); }
        }
        @keyframes drift1 {
          0%   { transform: translate(0, 0); }
          25%  { transform: translate(-40vw, -30vh); }
          50%  { transform: translate(-60vw, -10vh); }
          75%  { transform: translate(-20vw, -50vh); }
          100% { transform: translate(0, 0); }
        }
        @keyframes drift2 {
          0%   { transform: translate(0, 0); }
          25%  { transform: translate(-50vw, 25vh); }
          50%  { transform: translate(-20vw, -30vh); }
          75%  { transform: translate(-40vw, 40vh); }
          100% { transform: translate(0, 0); }
        }
        @keyframes drift3 {
          0%   { transform: translate(0, 0); }
          25%  { transform: translate(40vw, -40vh); }
          50%  { transform: translate(60vw, 20vh); }
          75%  { transform: translate(20vw, -20vh); }
          100% { transform: translate(0, 0); }
        }
      `}</style>
    </>
  );
}
