// basicamente o método down tem a função de desfazer o que o método up fez
// se o método up criou a tabela, o método down deleta a tabela
// as migrations são um histórico de alterações do banco de dados

//  npm run knex -- migrate:make nome-da-migration => cria a migration
//  npm run knex -- migrate:latest => executa a última migration
//  npm run knex -- migrate:rollback => desfaz a última migration
import { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('transactions', (table) => {
    table.uuid('id').primary() // chave primária
    table.text('title').notNullable() // não pode ser nulo
    table.decimal('amount', 10, 2).notNullable() // não pode ser nulo
    table.timestamp('created_at').defaultTo(knex.fn.now()).notNullable() // a data de criação
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('transactions')
}
