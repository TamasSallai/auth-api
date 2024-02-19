import session from 'express-session'

type SessionUser = {
  id: string
  name: string
  email: string
}

declare module 'express-session' {
  export interface SessionData {
    user: SessionUser
  }
}
