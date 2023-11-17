# API Rest de Transações Financeiras

## Descrição
Esta é uma API Rest desenvolvida em Node.js, projetada para gerenciar transações financeiras de débito e crédito. Ela possui funcionalidades para criar transações, listar todas as transações de um usuário específico, visualizar uma transação individual e fornecer um resumo das transações.

## Tecnologias Utilizadas
- Linguagem: Node.js

## Dependências
- @fastify/cookie: ^9.2.0
- dotenv: ^16.3.1
- fastify: ^4.24.3
- knex: ^3.0.1
- sqlite3: ^5.1.6
- zod: ^3.22.4

## Funcionalidades

### Criar Transação
- **Rota:** POST /transactions
- **Descrição:** Cria uma transação de débito ou crédito. Um cookie é atribuído ao usuário se ele não tiver outras transações.

### Listar Todas as Transações
- **Rota:** GET /transactions
- **Descrição:** Lista todas as transações criadas, baseando-se no cookie do usuário.

### Listar Transação Específica
- **Rota:** GET /transactions/:id
- **Descrição:** Lista uma transação específica pelo ID, verificando também o cookie do usuário.

### Resumo das Transações
- **Rota:** GET /transactions/summary
- **Descrição:** Retorna um resumo das transações do usuário.
