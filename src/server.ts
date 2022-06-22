import { prisma } from './prisma';
import nodemailer from 'nodemailer';
import express from 'express';

const app = express();

app.use(express.json());

const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "c234e4635951ba",
    pass: "1554edf1c5bef6"
  }
});

app.post('/feedback', async (req, res) => {
  const { type, comment, screenshot } = req.body;

  const feedback = await prisma.feedback.create({
    data: {
      type,
      comment,
      screenshot,
    }
  });

  await transport.sendMail({
    from: 'Equipe Feedget <equipef@feedget.com>',
    to: 'Pedro Henrique <pedronexy88@gmail.com',
    subject: 'Novo feedback',
    html: [
      `<div style="font-family: sans-serif; font-size: 16px;">`,
      `<p>Tipo do feedback: ${type}</p>`,
      `<p>Comentário: ${comment}</p>`,
      `</div>`
    ].join('\n')
  });

  return res.status(201).json({ feedback: feedback });
})

app.listen(3333, () => {
  console.log('Servidor iniciado com sucesso!');
});