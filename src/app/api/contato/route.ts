// app/api/contato/route.ts
import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { z } from "zod";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS,
  },
});

function getContactSchema(language: "pt-br" | "en") {
  const isEnglish = language === "en";

  return z.object({
    name: z.string().trim().min(1, isEnglish ? "Please enter your name." : "Preencha seu nome."),
    email: z.string()
      .trim()
      .min(1, isEnglish ? "Please enter your email." : "Preencha seu e-mail.")
      .email(isEnglish ? "Please enter a valid email." : "Digite um e-mail valido."),
    message: z.string().trim().min(1, isEnglish ? "Please enter your message." : "Digite sua mensagem."),
  });
}

function escapeHtml(value: unknown): string {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const language = body?.language === "en" ? "en" : "pt-br";
    const result = getContactSchema(language).safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { errors: result.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    if (!process.env.GMAIL_USER || !process.env.GMAIL_PASS) {
      return NextResponse.json(
        { message: "Servico de contato indisponivel no momento." },
        { status: 500 }
      );
    }

    const { name, email, message } = result.data;

    const dataHora = new Date().toLocaleString("pt-BR", {
      timeZone: "America/Sao_Paulo",
    });

    const safeName    = escapeHtml(name);
    const safeEmail   = escapeHtml(email);
    const safeMessage = escapeHtml(message);

    const htmlEmail = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; color: #333;">
        <h2 style="color: #0073e6;">📨 Novo Contato do Site</h2>
        <hr style="margin: 12px 0;" />
        <p><strong>Nome:</strong> ${safeName}</p>
        <p><strong>E-mail:</strong> ${safeEmail}</p>
        <p><strong>Mensagem:</strong></p>
        <p style="background-color: #f9f9f9; padding: 10px; border-radius: 6px; white-space: pre-wrap;">${safeMessage}</p>
        <hr />
        <p style="font-size: 0.9em; color: #777;">📅 Contato recebido em: ${dataHora}</p>
      </div>
    `;

    const emailOptions = {
      from: `"Portfólio Raul Sigoli" <${process.env.GMAIL_USER}>`,
      to: process.env.GMAIL_USER,
      subject: `📥 Novo Contato: ${safeName}`,
      text: `Novo contato recebido pelo site:\n\nNome: ${name}\nE-mail: ${email}\nMensagem: ${message}\n\nData e Hora: ${dataHora}`,
      html: htmlEmail,
    };

    await transporter.sendMail(emailOptions);

    return NextResponse.json(
      { message: "Formulário enviado com sucesso!" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Erro ao processar contato:", error);
    return NextResponse.json(
      { message: "Erro ao processar contato." },
      { status: 500 }
    );
  }
}
