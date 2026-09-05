import React from "react";
import { Link } from "react-router-dom";
import { Home } from "lucide-react";

const FONT_STYLE = `
  @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@600;700&family=Manrope:wght@400;500;600&display=swap');
  .font-display { font-family: 'Space Grotesk', sans-serif; }
  .font-body { font-family: 'Manrope', sans-serif; }
`;

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center font-body px-5 text-center" style={{ backgroundColor: "#14172B" }}>
      <style>{FONT_STYLE}</style>
      <p className="font-display font-bold text-6xl mb-2" style={{ color: "#7CB893" }}>404</p>
      <h1 className="font-display font-semibold text-xl mb-2" style={{ color: "#F3F1FA" }}>Bu sayfa yok</h1>
      <p className="font-body text-sm mb-8 max-w-xs" style={{ color: "#8D89B0" }}>
        Aradığın sayfa kaldırılmış ya da hiç var olmamış olabilir.
      </p>
      <Link
        to="/"
        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg font-body text-sm font-medium"
        style={{ backgroundColor: "#7CB893", color: "#14172B" }}
      >
        <Home size={16} /> Anasayfaya dön
      </Link>
    </div>
  );
}
