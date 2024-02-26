declare global {
  namespace NodeJS {
    interface ProcessEnv {
      CORS_ORIGIN: string
      PORT: string
      DATABASE_URL: string
      REDIS_URL: string
      SESSION_SECRET: string
      EMAIL_SECRET: string
      SENDGRID_API_KEY: string
    }
  }
}

export {}
