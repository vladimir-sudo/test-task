import { registerAs } from '@nestjs/config';

interface AppConfig {
  name: string;
  env: string;
  port: number;
}

export default registerAs(
  'app',
  (): AppConfig => ({
    name: process.env.APP_NAME,
    env: process.env.APP_ENV,
    port: Number(process.env.APP_PORT),
  }),
);
