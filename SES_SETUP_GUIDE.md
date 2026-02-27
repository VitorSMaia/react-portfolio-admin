# 📧 Guia Completo: Envio de E-mails com AWS SES, Node.js e React

Este guia fornece uma solução completa para implementar um sistema de envio de e-mails escalável, seguro e monitorado.

---

## 1. Configuração dos Pré-requisitos na AWS

### A. Verificação de Identidade (SES)
1. Acesse o console [Amazon SES](https://console.aws.amazon.com/ses/).
2. Vá em **Identities** -> **Create identity**.
3. Escolha **Email address** e insira o e-mail que você usará para enviar as mensagens.
4. Verifique o e-mail através do link enviado pela AWS.
   > [!IMPORTANT]
   > Contas novas estão no modo **Sandbox**. Você só pode enviar e-mails para endereços verificados. Para produção, solicite o aumento de limites (Production Access).

### B. Usuário IAM e Permissões
1. Acesse o console [IAM](https://console.aws.amazon.com/iam/).
2. Crie um novo usuário chamado `ses-sender-service`.
3. Selecione **Attach policies directly** e anexe a política: `AmazonSESFullAccess`.
   - *Melhor prática*: Em produção, crie uma Inline Policy restrita ao ARN da sua identidade SES.
4. Gere uma **Access Key** e **Secret Key** (use o tipo "Application running outside AWS").

---

## 2. Backend: Node.js + Express + AWS SDK v3

### Instalação de Dependências
```bash
npm install express cors dotenv @aws-sdk/client-ses
```

### Implementação da API (`server.js`)
```javascript
import express from 'express';
import cors from 'cors';
import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";
import 'dotenv/config';

const app = express();
app.use(cors());
app.use(express.json());

const sesClient = new SESClient({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

app.post('/api/send-email', async (req, res) => {
  const { name, email, message } = req.body;

  const command = new SendEmailCommand({
    Destination: { ToAddresses: [process.env.ADMIN_EMAIL] },
    Message: {
      Body: {
        Html: { Data: `<h3>Nova mensagem de ${name}</h3><p>${message}</p>` },
        Text: { Data: `Nome: ${name}\nEmail: ${email}\n\nMensagem: ${message}` },
      },
      Subject: { Data: `Contato Portfolio: ${name}` },
    },
    Source: process.env.VERIFIED_SENDER_EMAIL,
    ReplyToAddresses: [email],
  });

  try {
    await sesClient.send(command);
    res.status(200).json({ success: true, message: 'E-mail enviado com sucesso!' });
  } catch (error) {
    console.error("Erro SES:", error);
    res.status(500).json({ success: false, error: 'Falha ao enviar e-mail.' });
  }
});

app.listen(3001, () => console.log('Servidor rodando na porta 3001'));
```

---

## 3. Frontend: React + Form de Contato

### Componente de Contato (`ContactForm.tsx`)
```tsx
import React from 'react';
import { useForm } from 'react-hook-form';

export const ContactForm = () => {
  const { register, handleSubmit, reset, formState: { isSubmitting } } = useForm();

  const onSubmit = async (data: any) => {
    try {
      const response = await fetch('http://localhost:3001/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        alert('Mensagem enviada!');
        reset();
      }
    } catch (error) {
      alert('Erro na conexão.');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 max-w-md">
      <input {...register('name')} placeholder="Seu Nome" required className="..." />
      <input {...register('email')} type="email" placeholder="Seu Email" required className="..." />
      <textarea {...register('message')} placeholder="Mensagem" required className="..." />
      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Enviando...' : 'Enviar Mensagem'}
      </button>
    </form>
  );
};
```

---

## 4. Monitoramento com SNS (Bounces e Complaints)

Monitorar falhas é essencial para manter a reputação da sua conta AWS.

1. **SNS Topic**: Crie um tópico no SNS chamado `ses-alerts`.
2. **Subscription**: Adicione sua URL de webhook ou e-mail ao tópico.
3. **SES Configuration Set**:
   - Vá em SES -> **Configuration Sets** -> **Create Set**.
   - Adicione **Event Destination**.
   - Escolha o tópico SNS `ses-alerts`.
   - Selecione os tipos de evento: `Bounce`, `Complaint` e `Delivery`.
4. **Anexar Identity**: Vá na sua Identidade SES, aba **Notifications**, e selecione o Configuration Set criado.

---

## 5. Melhores Práticas e Segurança

- **Variáveis de Ambiente**: Nunca escreva credenciais AWS diretamente no código. Use `.env` e adicione-o ao `.gitignore`.
- **Backend Only**: Nunca chame o AWS SDK diretamente do Frontend. Isso exporia suas Secret Keys.
- **Rate Limiting**: Use pacotes como `express-rate-limit` no backend para evitar que robôs usem seu formulário para spam.
- **Templates**: Utilize a biblioteca `react-email` para construir e-mails bonitos e consistentes que podem ser exportados como HTML para o SES.
- **DKIM/SPF**: Configure DKIM/SPF nas configurações de domínio da AWS para aumentar a taxa de entrega.

---

## Checklist de Validação
- [ ] Identidade verificada na AWS.
- [ ] Credenciais IAM com `AmazonSESFullAccess`.
- [ ] Backend rodando e variáveis `.env` carregadas.
- [ ] Frontend enviando JSON correto para o endpoint.
- [ ] Configuration Set ativo para rastreio de bounces.
