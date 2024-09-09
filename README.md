# Brain Agriculture Frontend Challenge

Este é um teste técnico para o produto da Brain Agriculture. O objetivo é desenvolver uma aplicação de cadastro de produtores rurais com um dashboard para visualização de dados.

## Lógica da Aplicação e Funcionalidades
A aplicação é composta por um formulário de cadastro de produtores rurais e um dashboard para visualização de dados agregados. Abaixo estão os principais componentes e funcionalidades:

### Cadastro de Produtores Rurais
O cadastro de produtores rurais é realizado através de um formulário que permite adicionar e editar. Os dados do formulário são validados e enviados para a API utilizando os seguintes endpoints:

 Método | Endpoint                     | Descrição                    |
|--------|------------------------------|------------------------------|
| POST   | /api/farmer/create           | Cria um novo produtor        |
| PUT    | /api/farmer/update/[id]      | Atualiza um produtor existente|
| DELETE | /api/farmer/delete/[id]      | Remove um produtor           |

### Dashboard
O dashboard exibe dados agregados dos produtores rurais, como o total de fazendas, área total em hectares, distribuição de fazendas por estado e por tipo de cultura. Esses dados são obtidos através do endpoint:

| Método | Endpoint              | Descrição                            |
|--------|-----------------------|--------------------------------------|
| GET    | /api/dashboard/get    | Obtém dados agregados para o dashboard|

### Componentes Principais
- **Formulário de Produtores Rurais**: Utiliza o componente ```<FarmersForm/>``` para gerenciar o estado do formulário e enviar os dados para a API.
- **Dashboard**: Utiliza o componente ```<TotalFarmsCard>``` para exibir o total de fazendas e área total em hectares, além de gráficos para visualização de dados agregados.
- **Tabela de Produtores Rurais**: Utiliza o componente ```<FarmersTable/>``` para exibir os dados dos produtores rurais em formato de tabela, permitindo a visualização e interação com as informações.

### Fluxo de Dados
1. **Cadastro/Atualização de Produtores**:
   - O usuário preenche o formulário e envia os dados.
   - Os dados são validados e enviados para a API.
   - A API processa a requisição e retorna a resposta.
   - O frontend atualiza a interface com os novos dados.

2. **Visualização de Dados no Dashboard**:
   - O frontend faz uma requisição para o endpoint do dashboard.
   - A API retorna os dados agregados.
   - O frontend exibe os dados no dashboard utilizando componentes visuais.

## Como executar o projeto

### Pré-requisitos

Antes de começar, você vai precisar ter instalado em sua máquina as seguintes ferramentas:
[Git](https://git-scm.com), [Node.js](https://nodejs.org/en/).
Além disto é bom ter um editor para trabalhar com o código como [VSCode](https://code.visualstudio.com/)

#### 🧭 Rodando a aplicação web (Frontend)

```bash

# Clone este repositório
$ git clone git@github.com:mateusbirtann/brain-agriculture-frontend-challenge.git

# Acesse a pasta do projeto no seu terminal/cmd
$ cd brain-agriculture-frontend-challenge

# Instale as dependências
$ pnpm install

# Execute a aplicação em modo de desenvolvimento
$ pnpm run dev

# Cria o bundle para publicação
$ pnpm run build

# Execute a aplicação em modo de produção
$ pnpm run start

# Executa o conjunto de testes disponível na aplicação
$ pnpm run test


# A aplicação será aberta na porta:3000/ em desenvolvimento e produção. Acesse http://localhost:3000/
```

#### 🐳 Rodando o banco de dados postgres com Docker

```bash
# Navegue até a pasta do servidor dentro do projeto e construa a imagem Docker:
$ docker-compose build

# Inicie os containers usando o Docker Compose:
$ docker-compose up

# O servidor estará disponível na porta:5432

```

## ⚙️ Configuração de Ambiente

Para configurar as variáveis de ambiente, crie um arquivo `.env` na raiz do projeto. Aqui está um exemplo de configuração:

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/postgres?schema=public"
```

## 🛠 Tecnologias

As seguintes ferramentas foram usadas na construção do projeto, incluindo testes e setup.

#### **Website**

- **[Next.js](https://nextjs.org/)** - Framework React para renderização do lado do servidor e geração de sites estáticos.
- **[Tailwind](https://tailwindcss.com/)** - Estrutura CSS de baixo nível que permite estilo direto na marcação.
- **[Radix UI](https://www.radix-ui.com/)** - Biblioteca de componentes de código aberto otimizada para desenvolvimento rápido, fácil manutenção e acessibilidade.
- **[Eslint](https://eslint.org/)** - Ferramenta de linting que ajuda a detectar erros e problemas no código.
- **[Typescript](https://www.typescriptlang.org/)** - Superconjunto de JavaScript que adiciona tipagem estática e outros recursos.
- **[Jest](https://jestjs.io/pt-BR/)** - Framework de teste em JavaScript para testes unitários, integração e snapshot.
- **[Prettier](https://prettier.io/)** - Ferramenta de formatação de código que ajuda a manter um estilo consistente e legível.
- **[Lucide React](https://lucide.dev/)** - Conjunto de ícones leves e personalizáveis para projetos React.