declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT: string
      DATABASE_URL: string
      REDIS_URI: string
      REDIS_PORT: number
      SESSION_SECRET: string
      ACCESS_TOKEN_SECRET: string
    }
  }
}

export {}
