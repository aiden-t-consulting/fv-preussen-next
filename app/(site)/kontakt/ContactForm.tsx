"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Send, CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

const schema = z.object({
  name: z.string().min(2, "Bitte geben Sie Ihren Namen ein"),
  email: z.string().email("Bitte geben Sie eine gültige E-Mail-Adresse ein"),
  subject: z.string().min(1, "Bitte wählen Sie ein Betreff"),
  message: z.string().min(10, "Ihre Nachricht muss mindestens 10 Zeichen lang sein"),
  privacy: z.literal(true, {
    error: "Bitte stimmen Sie der Datenschutzerklärung zu",
  }),
});

type FormValues = z.infer<typeof schema>;

const subjects = [
  { value: "allgemein", label: "Allgemeine Anfrage" },
  { value: "mitgliedschaft", label: "Mitgliedschaft" },
  { value: "sponsoring", label: "Sponsoring & Partnerschaft" },
  { value: "training", label: "Training & Probetraining" },
  { value: "presse", label: "Presse & Medien" },
  { value: "sonstiges", label: "Sonstiges" },
];

function FieldWrapper({ label, error, children, htmlFor }: {
  label: string;
  error?: string;
  children: React.ReactNode;
  htmlFor: string;
}) {
  return (
    <div>
      <label htmlFor={htmlFor} className="block text-sm font-semibold text-gray-700 mb-1.5">
        {label}
      </label>
      {children}
      {error && (
        <p className="mt-1.5 text-xs text-red-600 flex items-center gap-1">
          <AlertCircle className="w-3 h-3" />
          {error}
        </p>
      )}
    </div>
  );
}

const inputClass = (hasError: boolean) =>
  cn(
    "w-full px-4 py-2.5 rounded-xl border text-sm transition-colors",
    "focus:outline-none focus:ring-2 focus:ring-[#21a530] focus:border-transparent",
    hasError
      ? "border-red-300 bg-red-50"
      : "border-gray-200 bg-white hover:border-[#21a530]/40"
  );

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormValues) => {
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Failed");
      setStatus("success");
      reset();
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="flex flex-col items-center text-center py-12 gap-4">
        <div className="w-16 h-16 rounded-full bg-[#e8f5e9] flex items-center justify-center">
          <CheckCircle className="w-8 h-8 text-[#21a530]" />
        </div>
        <h3 className="text-xl font-bold text-gray-900">Nachricht gesendet!</h3>
        <p className="text-gray-500 max-w-sm">
          Vielen Dank für Ihre Nachricht. Wir werden uns so bald wie möglich bei Ihnen melden.
        </p>
        <Button variant="outline" size="sm" onClick={() => setStatus("idle")}>
          Weitere Nachricht senden
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
      <div className="grid sm:grid-cols-2 gap-5">
        <FieldWrapper label="Ihr Name *" error={errors.name?.message} htmlFor="name">
          <input
            id="name"
            type="text"
            autoComplete="name"
            className={inputClass(!!errors.name)}
            placeholder="Max Mustermann"
            {...register("name")}
          />
        </FieldWrapper>

        <FieldWrapper label="E-Mail-Adresse *" error={errors.email?.message} htmlFor="email">
          <input
            id="email"
            type="email"
            autoComplete="email"
            className={inputClass(!!errors.email)}
            placeholder="max@beispiel.de"
            {...register("email")}
          />
        </FieldWrapper>
      </div>

      <FieldWrapper label="Betreff *" error={errors.subject?.message} htmlFor="subject">
        <select
          id="subject"
          className={inputClass(!!errors.subject)}
          {...register("subject")}
          defaultValue=""
        >
          <option value="" disabled>Bitte auswählen…</option>
          {subjects.map((s) => (
            <option key={s.value} value={s.value}>{s.label}</option>
          ))}
        </select>
      </FieldWrapper>

      <FieldWrapper label="Nachricht *" error={errors.message?.message} htmlFor="message">
        <textarea
          id="message"
          rows={5}
          className={inputClass(!!errors.message)}
          placeholder="Ihre Nachricht an uns…"
          {...register("message")}
        />
      </FieldWrapper>

      {/* Privacy */}
      <div>
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            className="mt-0.5 w-4 h-4 rounded accent-[#21a530]"
            {...register("privacy")}
          />
          <span className="text-sm text-gray-600">
            Ich stimme der{" "}
            <a href="/datenschutz" className="text-[#21a530] underline underline-offset-2" target="_blank">
              Datenschutzerklärung
            </a>{" "}
            zu und erkläre mich damit einverstanden, dass meine Daten zur Bearbeitung meiner
            Anfrage verwendet werden. *
          </span>
        </label>
        {errors.privacy && (
          <p className="mt-1.5 text-xs text-red-600 flex items-center gap-1 ml-7">
            <AlertCircle className="w-3 h-3" />
            {errors.privacy.message}
          </p>
        )}
      </div>

      {status === "error" && (
        <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 text-sm">
          <AlertCircle className="w-4 h-4 shrink-0" />
          Beim Senden ist ein Fehler aufgetreten. Bitte versuchen Sie es erneut.
        </div>
      )}

      <Button
        type="submit"
        size="lg"
        disabled={status === "loading"}
        className="w-full sm:w-auto"
      >
        {status === "loading" ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            Wird gesendet…
          </>
        ) : (
          <>
            <Send className="w-4 h-4" />
            Nachricht senden
          </>
        )}
      </Button>
    </form>
  );
}
