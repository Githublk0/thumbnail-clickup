import 'node:process';
import { z } from 'zod';

const optionalUrl = z.preprocess((value) => value === '' ? undefined : value, z.string().url().optional());
const optionalString = z.string().optional().default('');
const booleanEnv = z.preprocess((value) => value === 'true' || value === true, z.boolean().default(false));

const schema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  PORT: z.coerce.number().int().positive().default(4000),
  APP_ORIGIN: z.string().url(),
  DATABASE_URL: z.string().min(1),
  AUTH_SECRET: z.string().min(32),
  COOKIE_SECRET: z.string().min(32),
  STORAGE_ENDPOINT: optionalUrl,
  STORAGE_REGION: z.string().default('us-east-1'),
  STORAGE_BUCKET: z.string().default('thumbnail-intelligence'),
  STORAGE_ACCESS_KEY: optionalString,
  STORAGE_SECRET_KEY: optionalString,
  STORAGE_FORCE_PATH_STYLE: booleanEnv,
  STORAGE_SERVER_SIDE_ENCRYPTION: optionalString,
  AI_TEXT_PROVIDER: optionalString,
  AI_TEXT_API_KEY: optionalString,
  AI_TEXT_BASE_URL: optionalUrl,
  AI_TEXT_MODEL: optionalString,
  AI_VISION_PROVIDER: optionalString,
  AI_VISION_API_KEY: optionalString,
  AI_VISION_BASE_URL: optionalUrl,
  AI_VISION_MODEL: optionalString,
  AI_IMAGE_PROVIDER: optionalString,
  AI_IMAGE_API_KEY: optionalString,
  AI_IMAGE_BASE_URL: optionalUrl,
  AI_IMAGE_MODEL: optionalString,
  TEXT_AI_PROVIDER: optionalString,
  TEXT_AI_API_KEY: optionalString,
  IMAGE_AI_PROVIDER: optionalString,
  IMAGE_AI_API_KEY: optionalString,
  YOUTUBE_CLIENT_ID: optionalString,
  YOUTUBE_CLIENT_SECRET: optionalString,
  YOUTUBE_REDIRECT_URI: optionalUrl,
  STRIPE_SECRET_KEY: optionalString,
  STRIPE_WEBHOOK_SECRET: optionalString,
  STRIPE_PRICE_PRO: optionalString,
  EMAIL_PROVIDER_API_KEY: optionalString,
  SENTRY_DSN: optionalString
}).passthrough();

export const config = schema.parse(process.env);
