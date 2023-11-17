import { knex as setupKnex, Knex } from 'knex'
import { env } from './env'

export const config: Knex.Config = {
  client: 'sqlite',
  connection: {
    filename: env.DATABASE_URL,
  },
  useNullAsDefault: true, // Todos os campos do banco de dados são nulos por padrão
  migrations: {
    extension: 'ts',
    directory: './db/migrations',
  },
}
export const knex = setupKnex(config)
