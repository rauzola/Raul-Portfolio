// app/api/contato/route.ts
import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER, // seu e-mail do Gmail
    pass: process.env.GMAIL_PASS, // sua senha de app (não a senha da conta)
  },
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, message } = body;

    // Validação básica
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Todos os campos obrigatórios devem ser preenchidos." },
        { status: 400 }
      );
    }

    const dataHora = new Date().toLocaleString("pt-BR", {
      timeZone: "America/Sao_Paulo",
    });

    const htmlEmail = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; color: #333;">
        <h2 style="color: #0073e6;">📨 Novo Contato do Site</h2>
        <hr style="margin: 12px 0;" />
        <p><strong>Nome:</strong> ${name}</p>
        <p><strong>E-mail:</strong> ${email}</p>
        <p><strong>Mensagem:</strong></p>
        <p style="background-color: #f9f9f9; padding: 10px; border-radius: 6px;">${message}</p>
        <hr />
        <p style="font-size: 0.9em; color: #777;">📅 Contato recebido em: ${dataHora}</p>
      </div>
    `;

    const emailOptions = {
      from: `"Portfólio Raul Sigoli" <${process.env.GMAIL_USER}>`,
      to: process.env.GMAIL_USER,
      subject: `📥 Novo Contato: ${name}`,
      text: `
        Novo contato recebido pelo site:

        Nome: ${name}
        E-mail: ${email}
        Mensagem: ${message}

        Data e Hora: ${dataHora}
      `,
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
