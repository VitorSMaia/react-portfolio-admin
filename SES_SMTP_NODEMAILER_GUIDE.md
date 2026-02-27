# 📧 Envio de E-mails com Nodemailer e AWS SES (SMTP)

Este guia demonstra como configurar o envio de e-mails em um projeto Node.js utilizando a biblioteca **Nodemailer** através das credenciais **SMTP** fornecidas pelo Amazon SES.

---

## 1. Instalação e Configuração

### Requisitos Prévios
- Identidade de e-mail verificada no console do AWS SES.
- Credenciais SMTP (User e Password) geradas no console AWS (AWS SES -> SMTP Settings -> Create STMP Credentials).

### Instalação das Dependências
```bash
npm install nodemailer dotenv
```

---

## 2. Configuração do Arquivo `.env`

Armazene suas credenciais de forma segura. O Amazon SES utiliza hosts específicos por região.

```env
# Configurações AWS SES SMTP
SMTP_HOST=email-smtp.us-east-1.amazonaws.com
SMTP_PORT=587
SMTP_USER=SEU_USUARIO_SMTP_IAM
SMTP_PASS=SUA_SENHA_SMTP_IAM

# Detalhes do E-mail
EMAIL_FROM="Seu Nome <email-verificado@dominio.com>"
```

---

## 3. Implementação do Código

Este script configura o transporte SMTP e envia um e-mail de teste.

```javascript
import nodemailer from 'nodemailer';
import 'dotenv/config';

async function sendMail() {
  // 1. Criar o Transporter usando as credenciais SMTP do SES
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: false, // true para porta 465, false para outras
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
    // Recomendado pela AWS para garantir STARTTLS na porta 587
    tls: {
      ciphers: 'SSLv3',
      rejectUnauthorized: true
    }
  });

  try {
    // 2. Definir as opções do e-mail
    const info = await transporter.sendMail({
      from: process.env.EMAIL_FROM, // Deve ser um e-mail verificado no SES
      to: "destinatario@exemplo.com", // No modo Sandbox, também deve ser verificado
      subject: "Teste de Envio: Nodemailer + SES SMTP ✔",
      text: "Olá! Este é um e-mail enviado via SMTP da Amazon SES usando Nodemailer.",
      html: "<b>Olá!</b> Este é um e-mail enviado via <i>SMTP da Amazon SES</i> usando Nodemailer.",
    });

    console.log("Mensagem enviada: %s", info.messageId);
  } catch (error) {
    console.error("Erro ao enviar e-mail:", error);
  }
}

sendMail();
```

---

## 4. Verificação de Pré-requisitos (Importante)

- **Modo Sandbox**: Se sua conta SES estiver em Sandbox, você **SÓ** pode enviar para e-mails que verificou manualmente no console da AWS.
- **Identidade do Remetente**: O endereço no campo `from` deve coincidir exatamente com uma identidade verificada.
- **Região**: O `SMTP_HOST` deve corresponder à região onde você criou suas identidades.

---

## 5. Troubleshooting: Erros Comuns

| Erro | Causa Provável | Solução |
| :--- | :--- | :--- |
| `Authentication Credentials Invalid` | Usuario ou Senha SMTP incorretos. | Lembre-se que as credenciais SMTP **não são** as mesmas chaves de API (Access Key/Secret Key). Gere-as em *SMTP Settings*. |
| `Message rejected: Email address not verified` | Remetente ou destinatário não verificados. | Verifique o e-mail no console SES ou solicite a saída do modo Sandbox. |
| `Connection timeout` | Porta bloqueada pelo provedor ou firewall. | Certifique-se de usar a porta **587**. Alguns provedores bloqueiam a porta 25 por padrão. |
| `StartTLS required` | Tentativa de conexão insegura. | Garanta que `secure: false` e que o Nodemailer esteja configurado para usar a porta 587 (que faz o upgrade para TLS automaticamente). |
| `Throttling: Daily lead limit exceeded` | Limite de envio diário atingido. | Verifique sua cota de envio no painel SES. Contas Sandbox têm limites muito baixos (ex: 200 e-mails/dia). |

---

## Checklist de Sucesso
- [ ] Credenciais SMTP geradas.
- [ ] E-mail de remetente verificado no SES.
- [ ] Porta 587 configurada no Nodemailer.
- [ ] TLS habilitado nas configurações do transporte.
