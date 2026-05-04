import { useState } from "react";
import { CredentialForm } from "./components/CredentialForm";
import { CredentialCard } from "./components/CredentialCard";
import LogoWorkshop from "./assets/logo-workshop.svg";

export interface FormData {
  nomeCompleto: string;
  email: string;
  whatsapp: string;
}

export default function App() {
  const [formData, setFormData] = useState<FormData | null>(null);

  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center relative overflow-hidden px-4 py-12">
      <div className="bg-glow" />

      <main className="w-full max-w-md z-10">
        {!formData ? (
          <div className="flex flex-col gap-6 items-center fade-in-up">
            <div className="flex flex-col items-center gap-3 text-center">
              <img
                src={LogoWorkshop}
                alt="Workshop Máquina de Lucros"
                className="h-32 w-auto object-contain drop-shadow-lg"
              />
              <h1
                className="text-4xl font-bold uppercase leading-tight mt-2"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                Gere sua{" "}
                <span className="neon-text block">Credencial Digital</span>
              </h1>
              <p className="text-muted-foreground text-base max-w-sm">
                Preencha seus dados para gerar sua credencial de acesso exclusiva
                ao evento presencial em Curitiba.
              </p>
            </div>

            <CredentialForm onSuccess={setFormData} />
          </div>
        ) : (
          <div className="flex justify-center fade-in-up">
            <CredentialCard nome={formData.nomeCompleto} />
          </div>
        )}
      </main>
    </div>
  );
}
