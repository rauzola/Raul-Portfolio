"use client";

import type { ReactNode } from "react";

interface ButtonFormProps {
  children: ReactNode;
  disabled?: boolean;
}

export const ButtonForm = ({ children, disabled }: ButtonFormProps) => (
  <button
    type="submit"
    disabled={disabled}
    className="w-full rounded-lg bg-[#00cfea] px-6 py-3 text-sm font-medium text-[#05080e] transition-all duration-200 hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-50"
  >
    {children}
  </button>
);
