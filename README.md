# k6-Performance-Banco_API

## Introdução

Este repositório reúne os testes de performance da API de um sistema bancário, desenvolvidos com k6. O objetivo é validar o comportamento da aplicação sob carga, simulando cenários reais de uso como login de usuários e transferências entre contas, e acompanhar métricas como tempo de resposta e taxa de falhas.

## Tecnologias Utilizadas

- **JavaScript** - linguagem usada para escrever os scripts de teste
- **k6** - ferramenta de teste de performance, responsável por executar os cenários de carga e gerar as métricas
- **k6 Web Dashboard** - extensão nativa do k6 usada para acompanhar os resultados em tempo real e exportar o relatório em HTML

## Estrutura do Repositório

```
k6-Performance-Banco_API/
├── config/
│   └── config.local.json
├── fixtures/
│   └── post_login.json
├── helpers/
│   └── autenticacao.js
├── tests/
│   ├── login.test.js
│   └── transferencias.test.js
├── utils/
│   └── variaveis.js
└── .gitignore
```

## Objetivo de cada grupo de arquivos

### `config/`
Guarda as configurações do ambiente local, como a URL base usada quando os testes são executados sem passar a variável de ambiente `BASE_URL`.

### `fixtures/`
Contém os dados estáticos usados nos testes, como o payload de login (usuário e senha). Manter esses dados separados dos scripts facilita a manutenção e a reutilização em diferentes cenários.

### `helpers/`
Reúne funções auxiliares que dão suporte aos testes, como a função `obterToken`, responsável por autenticar o usuário e retornar o token usado nas requisições que exigem autorização.

### `tests/`
É o coração do repositório. Cada arquivo representa um cenário de teste de performance:
- **`login.test.js`**: simula múltiplos usuários realizando login simultaneamente, com um ramp-up e ramp-down de carga, validando o status da resposta e o formato do token retornado.
- **`transferencias.test.js`**: simula uma transferência entre contas, utilizando o token obtido via `helpers/autenticacao.js` para autorizar a requisição.

### `utils/`
Contém funções utilitárias compartilhadas entre os testes, como `pegarBaseURL`, que centraliza a lógica de leitura da variável de ambiente `BASE_URL`.

## Modo de Instalação

1. Instale o k6 seguindo a [documentação oficial](https://k6.io/docs/get-started/installation/), de acordo com o seu sistema operacional.
2. Clone este repositório:
   ```bash
   git clone https://github.com/IngridVanzeli/k6-Performance-Banco_API.git
   ```
3. Acesse a pasta do projeto:
   ```bash
   cd k6-Performance-Banco_API
   ```

Não há dependências de Node.js para instalar, já que o k6 executa os scripts JavaScript de forma nativa.

## Modo de Execução do Projeto

Os testes precisam que a variável de ambiente `BASE_URL` seja informada na execução, apontando para o endereço da API que será testada. Caso ela não seja passada, o script utiliza `http://localhost:3000` como valor padrão.

Para executar um teste específico:

```bash
k6 run tests/login.test.js -e BASE_URL=http://localhost:3000
```

```bash
k6 run tests/transferencias.test.js -e BASE_URL=http://localhost:3000
```

Basta substituir o valor de `BASE_URL` pelo endereço correto do ambiente que você quer testar.

### Acompanhamento em tempo real e exportação do relatório

O k6 conta com um dashboard web nativo que permite acompanhar a execução do teste em tempo real pelo navegador, além de exportar o relatório final em HTML. Para isso, basta habilitar as variáveis `K6_WEB_DASHBOARD` e `K6_WEB_DASHBOARD_EXPORT` antes do comando de execução:

```bash
K6_WEB_DASHBOARD=true K6_WEB_DASHBOARD_EXPORT=html-report.html k6 run tests/transferencias.test.js -e BASE_URL=http://localhost:3000
```

Durante a execução, o dashboard fica disponível em `http://127.0.0.1:5665` e, ao final do teste, o relatório completo é salvo no arquivo `html-report.html`, que pode ser aberto diretamente no navegador.
