# CJOBS Examples

Este repositório contém exemplos de projetos CJOBS em diferentes linguagens de programação. Cada projeto demonstra como receber parâmetros, processar dados e retornar resultados no formato JSON.

## Projetos

### 1. Python Example 1

Esse exemplo é de um main Python que não recebe parâmetros de entrada, executa uma chamada a um endpoint externo e retorna seu resultado.

- **Entrada:** Nenhuma
- **Saída:** JSON -> STRING

[Leia mais](./python_example1/README.md)

### 2. Python Example 2

Esse exemplo é de um main Python que recebe parâmetros JSON, faz uma operação de multiplicação por 2 do valor recebido e retorna um JSON com o resultado.

- **Entrada:** STRING -> JSON
- **Saída:** JSON -> STRING

[Leia mais](./python_example2/README.md)

### 3. Node.js TypeScript Example 1

Esse exemplo é de um main Node.js TypeScript que não recebe parâmetros de entrada, executa uma chamada a um endpoint externo e retorna seu resultado.

- **Entrada:** Nenhuma
- **Saída:** JSON -> STRING

[Leia mais](./node_ts_example1/README.md)

### 4. Node.js TypeScript Example 2

Esse exemplo é de um main Node.js TypeScript que recebe parâmetros JSON, faz uma operação de multiplicação por 2 do valor recebido e retorna um JSON com o resultado.

- **Entrada:** STRING -> JSON
- **Saída:** JSON -> STRING

[Leia mais](./node_ts_example2/README.md)

### 5. Caso 1 - Monitoramento de Tratativas

Este exemplo demonstra um sistema de monitoramento de tratativas que verifica e atualiza o status das tratativas atrasadas.

#### Modificações Recentes:
- Consolidação das variáveis de ambiente: usando `DATABASE_ID_TRATATIVA` unificado para todas as operações
- Criação de interfaces separadas: `TratativaNovos` e `TratativaAndamentos` para melhor tipagem
- Implementação de fallback para tratativas sem data de última mensagem, utilizando `dt_criacao` como referência

- **Entrada:** Configuração via arquivo .env
- **Saída:** Atualização de status de tratativas no banco de dados

[Leia mais](./_other_examples/case1/README.md)

# cjobs_examples
