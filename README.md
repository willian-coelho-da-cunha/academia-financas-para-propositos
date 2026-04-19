# Finanças para Propósitos

Um ambiente de desenvolvimento containerizado para uma aplicação Angular focada em gerenciamento de propósitos financeiros.

## Visão Geral

Este projeto fornece um setup de desenvolvimento baseado em Docker para construir e executar uma aplicação frontend usando Angular e TypeScript. O ambiente é orquestrado usando Docker Compose e executa em um container isolado e consistente.

## Sobre a Aplicação

**Finanças para Propósitos** é uma aplicação web que ajuda usuários a gerenciar suas metas financeiras de forma organizada. Inclui funcionalidades para:

- 📤 Importar dados de propósitos via arquivos .txt
- 📋 Gerenciar metas em uma tabela interativa com paginação
- ✏️ Criar e editar propósitos financeiros
- 📊 Visualizar análises através de dashboards com gráficos
- 🎨 Interface moderna usando Angular Material

## Stack Tecnológico

- **Runtime:** Node.js (v18+ no Debian Bullseye)
- **Linguagem:** TypeScript
- **Framework:** Angular 21 com CLI
- **UI Library:** Angular Material
- **Gráficos:** Google Charts
- **Gerenciamento de Pacotes:** npm
- **Containerização:** Docker & Docker Compose
- **Testes:** Vitest

## Estrutura do Projeto

```
.
├── Dockerfile                    # Definição do container de desenvolvimento
├── docker-compose.yml            # Configuração do serviço Docker Compose
├── financas-para-propositos/     # Código fonte da aplicação Angular
│   ├── src/
│   ├── package.json
│   └── README.md                 # Documentação detalhada da aplicação
└── README.md                     # Este arquivo
```

## Pré-requisitos

- Docker
- Docker Compose

## Como Começar

### Construir e Iniciar o Container de Desenvolvimento

```bash
docker-compose up -d
```

Este comando irá:
1. Construir a imagem Docker a partir do Dockerfile
2. Iniciar o serviço `front-end-app` em background
3. Montar o diretório do workspace para desenvolvimento

### Acessar o Container

```bash
docker-compose exec front-end-app /bin/bash
```

### Desenvolver a Aplicação

Dentro do container:

```bash
cd financas-para-propositos
npm install
ng serve
```

A aplicação estará disponível em `http://localhost:4200`

## Desenvolvimento

Para mais informações sobre desenvolvimento, comandos disponíveis e arquitetura da aplicação, consulte o [README da aplicação](./financas-para-propositos/README.md).

## Contribuição

Contribuições são bem-vindas! Por favor, leia as diretrizes de contribuição no README da aplicação.

### Stop the Container

```bash
docker-compose down
```

## Desenvolvimento

O container de desenvolvimento inclui:
- **Node.js** com npm pré-instalado.
- **Compilador TypeScript (tsc)** disponível globalmente.
- **Angular CLI** disponível globalmente para desenvolvimento Angular.

### Comandos Disponíveis Dentro do Container

Uma vez dentro do container, você pode executar comandos comuns do npm e Angular:

```bash
# Instalar dependências
npm install

# Iniciar servidor de desenvolvimento
ng serve

# Build para produção
ng build

# Executar testes
ng test
```

## Configuração do Container

- **Nome do Serviço:** front-end-app
- **Usuário:** node
- **Diretório de Trabalho:** /workspace
- **Limite de Memória:** 3GB (reserva: 512MB)
- **Limite de CPU:** 3 núcleos (reserva: 0,5 núcleos)
- **Volume:** Diretório atual mapeado para `/workspace` (modo cache)
- **Política de Reinício:** Em caso de falha com atraso de 5s (máx. 1 tentativa)

## Montagem de Volume

O diretório do projeto é montado como um volume em cache para `/workspace` dentro do container, permitindo edição de código ao vivo e workflows de desenvolvimento com hot-reload.

## Depuração

O container é projetado para permanecer ativo, permitindo que você:
- Execute servidores de desenvolvimento
- Execute comandos de build
- Depure aplicações em tempo real
- Instale pacotes adicionais conforme necessário

## Licença

Este projeto está sob a licença MIT. Veja o arquivo LICENSE para mais detalhes.

## Contribuição

Por favor, consulte as diretrizes do projeto para procedimentos de contribuição.
