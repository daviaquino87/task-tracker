# Task Tracker

CLI interativa em Node.js para criar, listar, atualizar e acompanhar tarefas com status (`todo`, `in_progress`, `done`). Os dados são persistidos em arquivo JSON.

## Funcionalidades

- Criar tarefas com descrição e status inicial `todo`
- Listar todas as tarefas ou filtrar por status
- Atualizar a descrição de uma tarefa
- Marcar tarefa como em progresso ou concluída
- Excluir tarefas
- Persistência em `temp/tasks.json`

## Requisitos

- [Node.js](https://nodejs.org/) (versão com suporte a `async`/`await`)

## Instalação

```bash
git clone <url-do-repositorio>
cd task-tracker
```

Não há dependências externas — apenas o Node.js é necessário.

## Uso

Inicie a CLI:

```bash
node index.js
```

O prompt `task-cli >` ficará disponível para digitar comandos.

### Comandos

| Comando | Descrição |
|---------|-----------|
| `add "<descrição>"` | Cria uma nova tarefa |
| `list` | Lista todas as tarefas |
| `list <status>` | Lista tarefas filtradas por status |
| `update <id> "<nova descrição>"` | Atualiza a descrição de uma tarefa |
| `delete <id>` | Remove uma tarefa |
| `mark-in-progress <id>` | Define o status como `in_progress` |
| `mark-done <id>` | Define o status como `done` |

### Status válidos

- `todo`
- `in_progress`
- `done`

### Exemplos

```text
task-cli > add "Estudar Node.js"
Task added successfully (ID: 1)

task-cli > list
1 -
        ID: 1
        Descrição: Estudar Node.js
        Status: todo
        ...

task-cli > mark-in-progress 1
Task updated successfully (ID: 1)

task-cli > list in_progress

task-cli > mark-done 1

task-cli > update 1 "Revisar módulos do Node.js"
Task updated successfully (ID: 1)

task-cli > delete 1
Task deleted successfully (ID: 1)
```

### Regras de validação

- A descrição deve estar entre **aspas duplas** (`"`).
- A descrição deve ter **no mínimo 5 caracteres** (incluindo espaços entre palavras).

## Estrutura do projeto

```
task-tracker/
├── index.js                          # Entrada da CLI (loop interativo)
├── commands/
│   └── tasks.js                      # Comandos e regras de negócio
├── repository/
│   ├── json-tasks.repository.js      # Persistência em JSON (padrão)
│   └── in-memory-tasks.repository.js # Repositório em memória (alternativo)
├── constants/
│   └── status.js                     # Constantes de status
├── utils/
│   └── validation.js                 # Validações de entrada
├── config/
│   ├── index.js                      # Utilitário readline
│   └── internalError.js              # Erros de domínio
└── temp/
    └── tasks.json                    # Arquivo de dados (gerado em runtime)
```

## Persistência

Por padrão, as tarefas são salvas em `temp/tasks.json`. A pasta `temp/` é criada automaticamente na primeira gravação e está listada no `.gitignore`.

Para usar armazenamento apenas em memória (sem arquivo), altere o repositório em `commands/tasks.js`:

```js
const { inMemoryTasksRepository } = require("../repository/in-memory-tasks.repository");
const REPOSITORY = inMemoryTasksRepository;
```

## Licença

ISC
