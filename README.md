# Task Tracker

**Project URL:** https://github.com/daviaquino87/task-tracker

CLI em Node.js para criar, listar, atualizar e acompanhar tarefas com status (`todo`, `in-progress`, `done`). Os dados são persistidos em `tasks.json` no diretório atual.

## Funcionalidades

- Criar tarefas com descrição e status inicial `todo`
- Listar todas as tarefas ou filtrar por status
- Atualizar a descrição de uma tarefa
- Marcar tarefa como em progresso ou concluída
- Excluir tarefas
- Persistência em `tasks.json` (criado automaticamente)

## Requisitos

- [Node.js](https://nodejs.org/) (versão com suporte a `async`/`await`)

## Instalação

```bash
git clone https://github.com/daviaquino87/task-tracker.git
cd task-tracker
npm link
```

Ou execute diretamente com `node index.js`.

Não há dependências externas — apenas o Node.js é necessário.

## Uso

```bash
# Adicionar tarefa
task-cli add "Buy groceries"

# Atualizar e excluir
task-cli update 1 "Buy groceries and cook dinner"
task-cli delete 1

# Marcar status
task-cli mark-in-progress 1
task-cli mark-done 1

# Listar
task-cli list
task-cli list done
task-cli list todo
task-cli list in-progress
```

Sem `npm link`, use:

```bash
node index.js add "Buy groceries"
```

### Comandos

| Comando | Descrição |
|---------|-----------|
| `add "<descrição>"` | Cria uma nova tarefa |
| `list` | Lista todas as tarefas |
| `list <status>` | Lista tarefas filtradas (`todo`, `in-progress`, `done`) |
| `update <id> "<nova descrição>"` | Atualiza a descrição |
| `delete <id>` | Remove uma tarefa |
| `mark-in-progress <id>` | Define status `in-progress` |
| `mark-done <id>` | Define status `done` |

### Propriedades da tarefa (JSON)

| Campo | Descrição |
|-------|-----------|
| `id` | Identificador único |
| `description` | Descrição da tarefa |
| `status` | `todo`, `in-progress` ou `done` |
| `createdAt` | Data/hora de criação (ISO 8601) |
| `updatedAt` | Data/hora da última atualização |

## Estrutura do projeto

```
task-tracker/
├── index.js                          # Entrada da CLI
├── commands/
│   └── tasks.js                      # Comandos e regras de negócio
├── repository/
│   ├── json-tasks.repository.js      # Persistência em JSON (padrão)
│   └── in-memory-tasks.repository.js # Repositório em memória (alternativo)
├── constants/
│   └── status.js                     # Constantes de status
├── utils/
│   └── validation.js                 # Validações de entrada
└── config/
    └── internalError.js              # Erros de domínio
```

## Persistência

As tarefas são salvas em `./tasks.json` no diretório de onde o comando é executado. O arquivo é criado na primeira gravação.

Para usar armazenamento em memória (sem arquivo), altere o repositório em `commands/tasks.js`:

```js
const { inMemoryTasksRepository } = require("../repository/in-memory-tasks.repository");
const REPOSITORY = inMemoryTasksRepository;
```

## Licença

ISC
