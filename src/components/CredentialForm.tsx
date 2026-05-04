import { useState } from "react";
import { Loader2 } from "lucide-react";
import type { FormData } from "../App";

// Cole aqui a URL do seu Google Apps Script publicado
const WEBHOOK_URL =
  (import.meta as any).env?.VITE_WEBHOOK_URL ||
  "https://script.google.com/macros/s/AKfycbx4RwMeVBooTBF7k5FIbSf51EmlOjWbXPOf9gYEk3xtkAxFzq2TdmFJdLa_JzoNJrPw0g/exec";

interface Props {
  onSuccess: (data: FormData) => void;
}

interface Errors {
  nomeCompleto?: string;
  email?: string;
  whatsapp?: string;
}

const DDI_OPTIONS = [
  { value: "+55", label: "🇧🇷 +55", placeholder: "(11) 99999-9999" },
  { value: "+1", label: "🇺🇸 +1", placeholder: "(555) 000-0000" },
  { value: "+351", label: "🇵🇹 +351", placeholder: "900 000 000" },
];

export function CredentialForm({ onSuccess }: Props) {
  const [nomeCompleto, setNomeCompleto] = useState("");
  const [email, setEmail] = useState("");
  const [ddi, setDdi] = useState("+55");
  const [whatsapp, setWhatsapp] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const currentDdi = DDI_OPTIONS.find((d) => d.value === ddi)!;

  function validate(): boolean {
    const newErrors: Errors = {};
    if (!nomeCompleto.trim() || nomeCompleto.trim().length < 3)
      newErrors.nomeCompleto = "Nome deve ter no mínimo 3 caracteres";
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      newErrors.email = "E-mail inválido";
    if (!whatsapp.trim() || whatsapp.replace(/\D/g, "").length < 8)
      newErrors.whatsapp = "Número de WhatsApp inválido";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitError("");
    if (!validate()) return;

    setIsSubmitting(true);
    try {
      await fetch(WEBHOOK_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nome: nomeCompleto.trim(),
          email: email.trim(),
          whatsapp: `${ddi} ${whatsapp.trim()}`,
          timestamp: new Date().toISOString(),
        }),
      });

      onSuccess({
        nomeCompleto: nomeCompleto.trim(),
        email: email.trim(),
        whatsapp: `${ddi} ${whatsapp.trim()}`,
      });
    } catch (err) {
      console.error(err);
      setSubmitError("Erro ao gerar credencial. Verifique sua conexão e tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  }

  const inputClass =
    "w-full h-12 rounded-lg px-4 text-sm text-white placeholder-[hsl(220_10%_45%)] bg-[hsl(220_20%_12%)] border border-[hsl(220_15%_18%)] outline-none transition-all focus:border-[hsl(39_100%_50%)] focus:ring-2 focus:ring-[hsl(39_100%_50%/0.2)]";

  const labelClass =
    "block text-[10px] font-semibold uppercase tracking-widest text-[hsl(220_10%_55%)] mb-1.5";

  return (
    <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4 fade-in-up-delayed">
      {/* Nome */}
      <div>
        <label htmlFor="nomeCompleto" className={labelClass}>
          Nome Completo
        </label>
        <input
          id="nomeCompleto"
          type="text"
          value={nomeCompleto}
          onChange={(e) => {
            setNomeCompleto(e.target.value);
            if (errors.nomeCompleto) setErrors((p) => ({ ...p, nomeCompleto: undefined }));
          }}
          placeholder="Seu nome completo"
          className={inputClass}
          autoComplete="name"
        />
        {errors.nomeCompleto && (
          <span className="text-xs text-red-400 mt-1 block">{errors.nomeCompleto}</span>
        )}
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email" className={labelClass}>
          E-mail
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (errors.email) setErrors((p) => ({ ...p, email: undefined }));
          }}
          placeholder="seu@email.com.br"
          className={inputClass}
          autoComplete="email"
        />
        {errors.email && (
          <span className="text-xs text-red-400 mt-1 block">{errors.email}</span>
        )}
      </div>

      {/* WhatsApp */}
      <div>
        <label className={labelClass}>WhatsApp</label>
        <div className="flex gap-2">
          <select
            value={ddi}
            onChange={(e) => setDdi(e.target.value)}
            className="h-12 rounded-lg px-2 text-sm text-white bg-[hsl(220_20%_12%)] border border-[hsl(220_15%_18%)] outline-none focus:border-[hsl(39_100%_50%)] focus:ring-2 focus:ring-[hsl(39_100%_50%/0.2)] cursor-pointer"
          >
            {DDI_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          <input
            type="tel"
            value={whatsapp}
            onChange={(e) => {
              setWhatsapp(e.target.value);
              if (errors.whatsapp) setErrors((p) => ({ ...p, whatsapp: undefined }));
            }}
            placeholder={currentDdi.placeholder}
            className={`${inputClass} flex-1`}
            autoComplete="tel"
          />
        </div>
        {errors.whatsapp && (
          <span className="text-xs text-red-400 mt-1 block">{errors.whatsapp}</span>
        )}
      </div>

      {/* Submit error */}
      {submitError && (
        <p className="text-sm text-red-400 text-center">{submitError}</p>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="neon-button w-full h-14 mt-2 text-sm"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            Gerando...
          </>
        ) : (
          "Gerar Minha Credencial"
        )}
      </button>
    </form>
  );
}
