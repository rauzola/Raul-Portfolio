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
}

export const ContactForm = ({ texts }: Props) => {
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
      name: formData.get("name"),
      email: formData.get("email"),
      message: formData.get("message"),
    };

    setIsLoading(true);
    try {
      const res = await fetch("/api/contato", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        setResult({ isSuccess: true });
        form.reset();
      } else {
        const errorData = await res.json();
        setResult({ isSuccess: false, errors: errorData?.errors || {} });
      }
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
        {isLoading ? "Enviando..." : texts.sendButton}
      </ButtonForm>
    </form>
  );
};
