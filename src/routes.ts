import express from 'express';
import nodemailer from 'nodemailer';
import { SubmitFeedbackUseCase } from './use-cases/SubmitFeedbackUseCase';
import { PrismaFeedbackRepository } from './repositories/prisma/PrismaFeedbackRepository';
import { NodemailerProvider } from './providers/nodemailer-provider/NodemailerProvider';

export const routes = express.Router();

routes.post('/feedback', async (req, res) => {
  const { type, comment, screenshot } = req.body;

  const prismaFeedbackRepository = new PrismaFeedbackRepository();
  const nodemailerProvider = new NodemailerProvider();
  
  const submitFeedbackUseCase = new SubmitFeedbackUseCase(
    prismaFeedbackRepository, nodemailerProvider
  );
    
  await submitFeedbackUseCase.execute({
    type,
    comment,
    screenshot,
  });

  return res.status(201).send();
});