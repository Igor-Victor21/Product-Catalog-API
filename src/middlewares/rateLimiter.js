import rateLimit from 'express-rate-limit';

// Limite de request global
export const globalLimiter = rateLimit({
  // 1 minuto
  windowMs: 1 * 60 * 1000,

  // 300 requisições por IP por janela de 1 minuto
  max: 300,

  standardHeaders: true,
  legacyHeaders: false,

  message: {
    message: 'Muitas requisições. Tente novamente mais tarde.'
  }
});