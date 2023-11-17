import { afterAll, beforeAll, it, describe, expect } from 'vitest'
import request from 'supertest'
import { app } from '../src/app'
import { beforeEach } from 'node:test'
import { execSync } from 'node:child_process'

describe('Transactions routes', () => {
  beforeAll(async () => {
    await app.ready()
  })
  afterAll(async () => {
    await app.close()
  })
  beforeEach(async () => {
    // vai limpar o banco de dados antes de cada teste e depois vai rodar as migrations
    execSync('npm run knex migrate:rollback --all')
    execSync('npm run knex migrate:latest')
  })

  it('should be possible to create a new transaction', async () => {
    await request(app.server)
      .post('/transactions')
      .send({
        title: 'New Transaction',
        amount: 100,
        type: 'credit',
      })
      .expect(201)
  })

  it('should be possible to list all transactions', async () => {
    const createTransactionResponse = await request(app.server)
      .post('/transactions')
      .send({
        title: 'New Transaction',
        amount: 100,
        type: 'credit',
      })
      .expect(201)
    const cookies = createTransactionResponse.headers['set-cookie']

    const listTransactionResponse = await request(app.server)
      .get('/transactions')
      .set('Cookie', cookies)
      .expect(200)

    expect(listTransactionResponse.body.transactions).toEqual([
      expect.objectContaining({
        title: 'New Transaction',
        amount: 100,
      }),
    ])
  })

  it('should be possible to get specific transaction', async () => {
    const createTransactionResponse = await request(app.server)
      .post('/transactions')
      .send({
        title: 'New Transaction',
        amount: 100,
        type: 'credit',
      })
      .expect(201)
    const cookies = createTransactionResponse.headers['set-cookie']

    const listTransactionResponse = await request(app.server)
      .get('/transactions')
      .set('Cookie', cookies)
      .expect(200)

    const transactionId = listTransactionResponse.body.transactions[0].id

    const getSpecificTransaction = await request(app.server)
      .get(`/transactions/${transactionId}`)
      .set('Cookie', cookies)
      .expect(200)
    expect(getSpecificTransaction.body.transaction).toEqual(
      expect.objectContaining({
        id: transactionId,
      }),
    )
  })

  it('should be possible to show a specific summary', async () => {
    const createTransactionCreditResponse = await request(app.server)
      .post('/transactions')
      .send({
        title: 'New Transaction Credit 5000',
        amount: 5000,
        type: 'credit',
      })

    const cookies = createTransactionCreditResponse.headers['set-cookie']

    await request(app.server)
      .post('/transactions')
      .set('Cookie', cookies)
      .send({
        title: 'New Transaction debit',
        amount: 2000,
        type: 'debit',
      })

    const specificSummary = await request(app.server)
      .get('/transactions/summary')
      .set('Cookie', cookies)
      .expect(200)
    console.log(specificSummary.body)
    expect(specificSummary.body.summary).toEqual({ amount: 3000 })
  })
})
