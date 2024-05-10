import { FastifyPluginAsync } from 'fastify'

const authRouter: FastifyPluginAsync = async (app) => {
  app.post('/register', async (req, res) => {
    return 'user registeres'
  })

  app.post('/login', async (req, res) => {
    return 'user logged in'
  })

  app.get('/profile', async (req, res) => {
    return 'user profile'
  })
}

export default authRouter
