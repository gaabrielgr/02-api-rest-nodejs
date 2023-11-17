import { config } from 'dotenv'
import { z } from 'zod'

if (process.env.NODE_ENV === 'test') {
  config({
    path: '.env.test',
  })
} else {
  config({
    path: '.env',
  })
}

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('production'), // NODE_ENV será um enum e se não for definido, ficará com o valor padrão 'production'
  DATABASE_CLIENT: z.enum(['sqlite', 'pg']), // DATABASE_CLIENT será um enum e se não for definido, ficará com o valor padrão 'pg'
  DATABASE_URL: z.string(), // DATABASE_URL é a nossa URL
  PORT: z.coerce.number().default(3333), // PORT É a nossa porta, não seja preenchida  vai receber o número 3333 como padrão
})

const _env = envSchema.safeParse(process.env)
if (_env.success === false) {
  console.error('Invalid environment variables: ', _env.error.format())
  throw new Error('Invalid environment variables.')
}

export const env = _env.data
