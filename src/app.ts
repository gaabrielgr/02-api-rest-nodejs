import fastify from 'fastify'
import cookie from '@fastify/cookie'
import { transactionRoutes } from './routes/transactions'

export const app = fastify()

app.register(cookie)
// // cria um middleware global
// app.addHook('preHandler', async (request) => {
//   console.log(`[${request.method}] ${request.url}`)
// })
// esse plugin é responsável por chamar o método transactionRoutes que possui a rota /transactions
app.register(transactionRoutes, {
  prefix: '/transactions',
})
