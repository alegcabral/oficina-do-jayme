"use client";

import { useState, FormEvent } from "react";
import { motion } from "framer-motion";
import { Loader2, MessageCircle, ImageIcon } from "lucide-react";
import { buildWhatsAppUrl, isValidPhoneBR, maskPhoneBR } from "@/lib/utils";

interface FormState {
  name: string;
  phone: string;
  brand: string;
  model: string;
  year: string;
  service: string;
  description: string;
  hasPhotos: "sim" | "nao" | "";
  consent: boolean;
}

const initialState: FormState = {
  name: "",
  phone: "",
  brand: "",
  model: "",
  year: "",
  service: "",
  description: "",
  hasPhotos: "",
  consent: false,
};

const serviceOptions = ["Mecânica", "Funilaria", "Pintura", "Ainda não sei identificar"];

type Errors = Partial<Record<keyof FormState, string>>;

export default function QuoteForm() {
  const [form, setForm] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<Errors>({});
  const [submitting, setSubmitting] = useState(false);

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((f) => ({ ...f, [key]: value }));
    setErrors((e) => ({ ...e, [key]: undefined }));
  }

  function validate(): Errors {
    const next: Errors = {};
    if (!form.name.trim()) next.name = "Informe seu nome.";
    if (!form.phone.trim()) next.phone = "Informe um telefone para contato.";
    else if (!isValidPhoneBR(form.phone))
      next.phone = "Telefone incompleto. Confira o DDD e o número.";
    if (!form.brand.trim()) next.brand = "Informe a marca do veículo.";
    if (!form.model.trim()) next.model = "Informe o modelo do veículo.";
    if (!form.service) next.service = "Selecione o serviço desejado.";
    if (!form.description.trim())
      next.description = "Descreva brevemente o problema.";
    if (!form.hasPhotos) next.hasPhotos = "Informe se você tem fotos do veículo.";
    if (!form.consent)
      next.consent = "É necessário autorizar o contato para continuar.";
    return next;
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const nextErrors = validate();
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setSubmitting(true);

    const lines = [
      "Olá, Jayme! Encontrei a oficina pelo site e gostaria de solicitar uma avaliação.",
      "",
      `Nome: ${form.name}`,
      `Telefone: ${form.phone}`,
      `Veículo: ${form.brand} ${form.model}`,
      form.year ? `Ano: ${form.year}` : null,
      `Serviço: ${form.service}`,
      `Descrição: ${form.description}`,
      `Tenho fotos disponíveis: ${form.hasPhotos === "sim" ? "Sim" : "Não"}.`,
    ].filter(Boolean);

    const url = buildWhatsAppUrl(lines.join("\n"));

    // Feedback visual breve antes de abrir o WhatsApp; dados são preservados.
    window.setTimeout(() => {
      window.open(url, "_blank", "noopener,noreferrer");
      setSubmitting(false);
    }, 400);
  }

  return (
    <section id="orcamento" className="border-y border-white/10 bg-graphite py-24">
      <div className="container-oj grid grid-cols-1 gap-12 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
        >
          <p className="eyebrow mb-3">Avaliação</p>
          <h2 className="section-title">Solicite uma avaliação</h2>
          <p className="mt-5 max-w-md text-sm leading-relaxed text-mist">
            Preencha os campos ao lado. Ao enviar, o WhatsApp abre com a sua
            mensagem já organizada. Os dados preenchidos são preservados.
          </p>
          <p className="mt-5 flex items-start gap-2 text-xs leading-relaxed text-mist/80">
            <ImageIcon size={16} className="mt-0.5 shrink-0 text-gold" aria-hidden="true" />
            As fotos do veículo devem ser anexadas dentro da conversa do
            WhatsApp. Este formulário não envia arquivos.
          </p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.1 }}
          onSubmit={handleSubmit}
          noValidate
          className="flex flex-col gap-5 rounded-sm border border-white/10 bg-ink p-6 sm:p-8"
        >
          <Field id="name" label="Nome" error={errors.name} value={form.name}
            onChange={(v) => update("name", v)} autoComplete="name" />

          <Field id="phone" label="Telefone" error={errors.phone} value={form.phone}
            onChange={(v) => update("phone", maskPhoneBR(v))} autoComplete="tel"
            inputMode="tel" placeholder="(11) 90000-0000" />

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
            <Field id="brand" label="Marca" error={errors.brand} value={form.brand}
              onChange={(v) => update("brand", v)} placeholder="Ex.: Chevrolet" />
            <Field id="model" label="Modelo" error={errors.model} value={form.model}
              onChange={(v) => update("model", v)} placeholder="Ex.: Onix" />
            <Field id="year" label="Ano (opcional)" value={form.year}
              onChange={(v) => update("year", v.replace(/\D/g, "").slice(0, 4))}
              inputMode="numeric" placeholder="2019" />
          </div>

          <div>
            <label htmlFor="service" className="mb-1.5 block text-sm font-medium text-paper">
              Serviço desejado
            </label>
            <select
              id="service"
              value={form.service}
              onChange={(e) => update("service", e.target.value)}
              aria-invalid={!!errors.service}
              aria-describedby={errors.service ? "service-error" : undefined}
              className="w-full rounded-sm border border-white/15 bg-graphite px-4 py-3 text-sm text-paper outline-none focus:border-gold"
            >
              <option value="">Selecione um serviço</option>
              {serviceOptions.map((opt) => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
            {errors.service && (
              <p id="service-error" role="alert" className="mt-1.5 text-xs text-red-400">
                {errors.service}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="description" className="mb-1.5 block text-sm font-medium text-paper">
              Descrição do problema
            </label>
            <textarea
              id="description"
              value={form.description}
              onChange={(e) => update("description", e.target.value)}
              rows={4}
              aria-invalid={!!errors.description}
              aria-describedby={errors.description ? "description-error" : undefined}
              className="w-full resize-none rounded-sm border border-white/15 bg-graphite px-4 py-3 text-sm text-paper outline-none focus:border-gold"
              placeholder="Conte o que aconteceu com o veículo..."
            />
            {errors.description && (
              <p id="description-error" role="alert" className="mt-1.5 text-xs text-red-400">
                {errors.description}
              </p>
            )}
          </div>

          <fieldset>
            <legend className="mb-2 text-sm font-medium text-paper">
              Você tem fotos do veículo?
            </legend>
            <div className="flex gap-6">
              {(["sim", "nao"] as const).map((opt) => (
                <label key={opt} className="flex items-center gap-2 text-sm text-mist">
                  <input
                    type="radio"
                    name="hasPhotos"
                    value={opt}
                    checked={form.hasPhotos === opt}
                    onChange={() => update("hasPhotos", opt)}
                    className="h-4 w-4 accent-gold"
                  />
                  {opt === "sim" ? "Sim" : "Não"}
                </label>
              ))}
            </div>
            {errors.hasPhotos && (
              <p role="alert" className="mt-1.5 text-xs text-red-400">{errors.hasPhotos}</p>
            )}
          </fieldset>

          <div>
            <label className="flex items-start gap-2.5 text-sm text-mist">
              <input
                type="checkbox"
                checked={form.consent}
                onChange={(e) => update("consent", e.target.checked)}
                aria-invalid={!!errors.consent}
                className="mt-0.5 h-4 w-4 shrink-0 accent-gold"
              />
              <span>
                Autorizo o contato da oficina a partir das informações enviadas.
                Saiba mais na{" "}
                <a href="/privacidade" className="text-gold underline underline-offset-2">
                  política de privacidade
                </a>.
              </span>
            </label>
            {errors.consent && (
              <p role="alert" className="mt-1.5 text-xs text-red-400">{errors.consent}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="btn-primary mt-2 disabled:cursor-wait disabled:opacity-70"
          >
            {submitting ? (
              <>
                <Loader2 size={18} className="animate-spin" aria-hidden="true" />
                Abrindo WhatsApp...
              </>
            ) : (
              <>
                <MessageCircle size={18} aria-hidden="true" />
                Enviar pelo WhatsApp
              </>
            )}
          </button>
        </motion.form>
      </div>
    </section>
  );
}

function Field({
  id, label, value, onChange, error, autoComplete, inputMode, placeholder,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  autoComplete?: string;
  inputMode?: React.HTMLAttributes<HTMLInputElement>["inputMode"];
  placeholder?: string;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-paper">
        {label}
      </label>
      <input
        id={id}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        autoComplete={autoComplete}
        inputMode={inputMode}
        placeholder={placeholder}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
        className="w-full rounded-sm border border-white/15 bg-graphite px-4 py-3 text-sm text-paper outline-none placeholder:text-mist/50 focus:border-gold"
      />
      {error && (
        <p id={`${id}-error`} role="alert" className="mt-1.5 text-xs text-red-400">
          {error}
        </p>
      )}
    </div>
  );
}
