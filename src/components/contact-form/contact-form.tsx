"use client";

import { ErrorMessage, Input, InputLabel } from "../ui/input";
import { ContactTexts } from "@/types/texts";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { CheckIcon } from "../icons/check";
import { motion } from "framer-motion";
import { ButtonForm } from "./button-form";

interface Props {
  texts: ContactTexts;
  language?: string;
}

export const ContactForm = ({ texts, language = "pt-br" }: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<{
    isSuccess: boolean;
    errors?: Record<string, string[]>;
  } | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);

    const data = {
      name: String(formData.get("name") ?? "").trim(),
      email: String(formData.get("email") ?? "").trim(),
      message: String(formData.get("message") ?? "").trim(),
    };

    const errors: Record<string, string[]> = {};

    if (!data.name) {
      errors.name = [texts.requiredFieldError];
    }

    if (!data.email) {
      errors.email = [texts.requiredFieldError];
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      errors.email = [texts.invalidEmailError];
    }

    if (!data.message) {
      errors.message = [texts.requiredFieldError];
    }

    setResult(null);

    if (Object.keys(errors).length > 0) {
      setResult({ isSuccess: false, errors });
      return;
    }

    setIsLoading(true);

    try {
      const res = await fetch("/api/contato", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, language }),
      });

      if (res.ok) {
        setResult({ isSuccess: true });
        form.reset();
      } else {
        const errorData = await res.json().catch(() => null);
        const fieldErrors = errorData?.errors && typeof errorData.errors === "object"
          ? errorData.errors
          : null;

        setResult({
          isSuccess: false,
          errors: fieldErrors && Object.keys(fieldErrors).length > 0
            ? fieldErrors
            : { form: [texts.submitError] },
        });
      }
    } catch {
      setResult({ isSuccess: false, errors: { form: [texts.submitError] } });
    } finally {
      setIsLoading(false);
    }
  };

  if (result?.isSuccess) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex flex-col justify-center items-center gap-4 h-full mt-8"
      >
        <div className="w-24 h-24">
          <CheckIcon />
        </div>
        <h2 className="text-3xl">{texts.successTitle}</h2>
        <p className="text-[#607a93]">{texts.successMessage}</p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-8">
      <div className="space-y-2">
        <InputLabel htmlFor="name">{texts.nameLabel}</InputLabel>
        <Input
          placeholder={texts.namePlaceholder}
          name="name"
          id="name"
          error={!!result?.errors?.name}
        />
        <ErrorMessage>{result?.errors?.name?.[0]}</ErrorMessage>
      </div>
      <div className="space-y-2">
        <InputLabel htmlFor="email">{texts.emailLabel}</InputLabel>
        <Input
          placeholder={texts.emailPlaceholder}
          type="email"
          name="email"
          id="email"
          error={!!result?.errors?.email}
        />
        <ErrorMessage>{result?.errors?.email?.[0]}</ErrorMessage>
      </div>
      <div className="space-y-2">
        <InputLabel htmlFor="message">{texts.messageLabel}</InputLabel>
        <textarea
          className={cn(
            "h-40 w-full rounded-xl border border-white/10 bg-[#0b1220] px-4 py-3 text-sm text-[#dce7f2] shadow-[0_12px_30px_rgba(0,0,0,0.22)] outline-none transition focus:border-[#00cfea]",
            !!result?.errors?.message && "border-[#ff6b6b]"
          )}
          placeholder={texts.messagePlaceholder}
          name="message"
          id="message"
        />
        <ErrorMessage>{result?.errors?.message?.[0]}</ErrorMessage>
      </div>
      <ButtonForm disabled={isLoading}>
        {isLoading ? texts.sendingButton : texts.sendButton}
      </ButtonForm>
      <ErrorMessage>{result?.errors?.form?.[0]}</ErrorMessage>
    </form>
  );
};
