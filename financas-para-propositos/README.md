# Finanças para Propósitos

Uma aplicação web para gerenciamento de propósitos financeiros, desenvolvida com Angular e Angular Material. Permite aos usuários definir metas financeiras, acompanhar o progresso e visualizar análises através de dashboards interativos.

## Funcionalidades

### 📋 Gerenciamento de Propósitos
- **Upload de Dados**: Importe seus propósitos financeiros a partir de arquivos .txt
- **Tabela Interativa**: Visualize e gerencie todos os seus propósitos em uma tabela com paginação
- **Formulário de Metas**: Crie e edite propósitos com campos como nome, descrição, valor, status e datas
- **Ações Rápidas**: Edite, exclua ou visualize detalhes de cada propósito diretamente na tabela

### 📊 Dashboards Analíticos
- **Gráficos Interativos**: Visualize seus dados através de gráficos de pizza e barras
- **Métricas em Tempo Real**: Acompanhe o progresso das suas metas financeiras
- **Análises Visuais**: Use o Google Charts para representações claras dos seus dados

### 🎨 Interface Moderna
- **Angular Material**: Design system consistente e acessível
- **Tema Personalizado**: Utiliza tokens de cor do sistema Material Design
- **Navegação Intuitiva**: Botões de voltar e navegação fluida entre páginas
- **Responsividade**: Interface adaptável para diferentes dispositivos

## Tecnologias Utilizadas

- **Framework**: Angular 21
- **Linguagem**: TypeScript
- **UI Library**: Angular Material
- **Gráficos**: Angular Google Charts
- **Persistência**: LocalStorage (dados armazenados localmente no navegador)
- **Build Tool**: Angular CLI
- **Testes**: Vitest

## Estrutura do Projeto

```
src/
├── app/
│   ├── give-welcome/          # Página de boas-vindas
│   ├── get-started/           # Upload de arquivo .txt
│   ├── manage-project/        # Gerenciamento de propósitos (tabela)
│   ├── financial-purpose/     # Formulário de criação/edição
│   ├── analytics-dashboards/  # Dashboards com gráficos
│   ├── repositories/          # Camada de dados (localStorage)
│   ├── domain/                # Modelos de dados
│   └── app.routes.ts          # Configuração de rotas
├── styles.scss                # Estilos globais
└── main.ts                    # Ponto de entrada da aplicação
```

## Como Usar

### Pré-requisitos
- Node.js (versão 18 ou superior)
- npm ou yarn

### Instalação

1. Clone o repositório:
```bash
git clone <repository-url>
cd financas-para-propositos
```

2. Instale as dependências:
```bash
npm install
```

3. Inicie o servidor de desenvolvimento:
```bash
ng serve
```

4. Abra seu navegador em `http://localhost:4200`

### Fluxo da Aplicação

1. **Boas-vindas**: Página inicial com informações sobre o app
2. **Começar**: Upload de arquivo .txt com dados dos propósitos
3. **Gerenciar Propósitos**: Tabela para visualizar e gerenciar metas
4. **Criar/Editar Meta**: Formulário para adicionar ou modificar propósitos
5. **Dashboards**: Visualização analítica dos dados

## Desenvolvimento

### Comandos Disponíveis

```bash
# Servidor de desenvolvimento
ng serve

# Build de produção
ng build

# Executar testes
ng test

# Linting
ng lint

# Gerar novo componente
ng generate component nome-do-componente
```

### Arquitetura

- **Componentes Standalone**: Cada página é um componente independente
- **Injeção de Dependências**: Uso do novo sistema de injeção do Angular
- **Reactive Forms**: Formulários reativos para melhor controle
- **Repository Pattern**: Separação da lógica de dados

### Persistência de Dados

Os dados são armazenados localmente no navegador usando `localStorage`. A aplicação inclui:
- Validação de dados na importação
- Tratamento de erros
- Persistência automática das alterações

## Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nova-funcionalidade`)
3. Commit suas mudanças (`git commit -m 'feat: adiciona nova funcionalidade'`)
4. Push para a branch (`git push origin feature/nova-funcionalidade`)
5. Abra um Pull Request

## Licença

Este projeto está sob a licença MIT. Veja o arquivo LICENSE para mais detalhes.
