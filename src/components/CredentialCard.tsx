import { useRef } from "react";
import { QRCodeSVG } from "qrcode.react";
import { toPng } from "html-to-image";
import { Download, MapPin, Calendar } from "lucide-react";
import LogoWorkshop from "../assets/logo-workshop.svg";

const QR_URL = "https://cont.4blue.com.br/central-participantes-cwb/";

interface Props {
  nome: string;
}

export function CredentialCard({ nome }: Props) {
  const cardRef = useRef<HTMLDivElement>(null);

  const slugName = nome
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, "-");

  async function handleDownload() {
    if (!cardRef.current) return;
    try {
      const dataUrl = await toPng(cardRef.current, {
        pixelRatio: 3,
        backgroundColor: "#000000",
        style: { transform: "none", boxShadow: "none" },
      });
      const link = document.createElement("a");
      link.download = `credencial-${slugName}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error("Erro ao exportar imagem:", err);
    }
  }

  return (
    <div className="w-full max-w-[340px] flex flex-col items-center gap-6 fade-in-up">
      {/* Card exportável */}
      <div ref={cardRef} className="glass-card w-full flex flex-col items-center p-8">
        {/* Overlay gradient */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "linear-gradient(135deg, rgba(0,0,0,0.4) 0%, transparent 60%, hsl(39 100% 50% / 0.04) 100%)",
          }}
        />

        <img
          src={LogoWorkshop}
          alt="Workshop Máquina de Lucros"
          className="h-16 w-[80%] object-contain mb-4 relative z-10"
        />

        {/* Divider */}
        <div
          className="w-full h-px mb-6 opacity-50 relative z-10"
          style={{
            background:
              "linear-gradient(to right, transparent, hsl(39 100% 50%), transparent)",
          }}
        />

        <span className="text-[10px] tracking-[0.4em] uppercase font-bold mb-2 text-center relative z-10" style={{ color: "hsl(39 100% 50%)" }}>
          Credencial do Participante
        </span>

        <h2
          className="neon-text text-2xl font-black uppercase text-center mb-8 relative z-10"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          {nome}
        </h2>

        {/* QR Code */}
        <div
          className="bg-white p-3 rounded-xl mb-8 relative z-10"
          style={{ border: "2px solid hsl(39 100% 50% / 0.4)" }}
        >
          <QRCodeSVG value={QR_URL} size={140} level="H" includeMargin={false} />
        </div>

        {/* Divider */}
        <div
          className="w-full h-px mb-6 opacity-50 relative z-10"
          style={{
            background:
              "linear-gradient(to right, transparent, hsl(39 100% 50%), transparent)",
          }}
        />

        {/* Infos do evento */}
        <div className="flex flex-col gap-3 w-full items-center text-sm font-medium relative z-10" style={{ color: "hsl(220 10% 55%)" }}>
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4" style={{ color: "hsl(39 100% 50%)" }} />
            <span>Curitiba / PR</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4" style={{ color: "hsl(39 100% 50%)" }} />
            <span>12 de Maio — 9h às 21h</span>
          </div>
        </div>
      </div>

      {/* Ações */}
      <div className="flex flex-col w-full gap-3">
        <button onClick={handleDownload} className="neon-button h-12 w-full gap-2 text-sm">
          <Download className="w-4 h-4" />
          Salvar como Imagem
        </button>

        <button
          onClick={() => window.location.reload()}
          className="text-xs underline underline-offset-4 text-center transition-colors"
          style={{ color: "hsl(220 10% 55%)" }}
          onMouseOver={(e) => (e.currentTarget.style.color = "white")}
          onMouseOut={(e) => (e.currentTarget.style.color = "hsl(220 10% 55%)")}
        >
          Gerar outra credencial
        </button>
      </div>
    </div>
  );
}
