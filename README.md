# SimulaBET - App ⚽️

<p align="center">
  <img src="https://seeklogo.com/images/S/supabase-logo-DCC6749964-seeklogo.com.png" width="120" alt="Supabase Logo" />
</p>

<p align="center">Uma plataforma recreativa de apostas virtuais com jogos e odds reais, mas sem dinheiro de verdade.</p>

## Descrição do Projeto

O **SimulaBET** é um aplicativo móvel desenvolvido como projeto acadêmico com o objetivo de criar uma plataforma de apostas recreativas. A plataforma permite que os usuários apostem em jogos de futebol reais, utilizando um saldo de créditos fictícios, enquanto interagem com odds de mercado verdadeiras. O projeto demonstra a integração completa de um frontend mobile com um Backend-as-a-Service (BaaS), incluindo autenticação, banco de dados, automações serverless (Edge Functions) e o consumo de APIs de terceiros em tempo real.

## Funcionalidades Principais

* **Autenticação de Usuários**: Sistema completo de cadastro e login utilizando o Supabase Auth.
* **Criação de Perfis**: Geração de perfis de usuário no banco de dados no momento do cadastro, controlada pelo lado do cliente.
* **Gestão de Saldo Fictício**: Os usuários começam com um saldo de 1000 créditos virtuais, que pode ser resetado manualmente.
* **Listagem de Jogos**: A tela inicial exibe jogos de futebol de ligas populares (como Brasileirão e Premier League) com odds reais, buscados automaticamente através de uma Edge Function.
* **Sistema de Apostas**: Permite que os usuários selecionem um resultado (vitória, empate ou derrota), insiram um valor e confirmem a aposta, que é registrada no banco de dados.
* **Histórico de Apostas**: Uma tela dedicada onde o usuário pode ver todas as apostas que fez, incluindo os detalhes da partida e o status da aposta.
* **Configurações de Conta**: Uma tela para o usuário ver seu e-mail, resetar seu saldo e fazer logout de forma segura.

## Tecnologias Utilizadas

* **Framework Mobile**: [React Native](https://reactnative.dev/)
* **Plataforma de Build**: [Expo](https://expo.dev/)
* **Backend-as-a-Service**: [Supabase](https://supabase.com/)
    * **Banco de Dados**: PostgreSQL
    * **Autenticação**: Supabase Auth
    * **Funções Serverless**: Supabase Edge Functions
* **API de Dados Esportivos**: [The Odds API](https://the-odds-api.com/)
* **Estilização**: [NativeWind](https://www.nativewind.dev/) (Tailwind CSS para React Native)
* **Linguagem**: [TypeScript](https://www.typescriptlang.org/)

## Configuração do Ambiente

1.  **Pré-requisitos**:
    * [Node.js](https://nodejs.org/) (versão 18 ou superior recomendada)
    * [npm](https://www.npmjs.com/) ou [Yarn](https://yarnpkg.com/)
    * [Git](https://git-scm.com/)
    * Uma conta gratuita no [Supabase](https://supabase.com/)

2.  **Clone o repositório**:
    ```bash
    git clone [https://github.com/keodanic/simulaBet.git](https://github.com/keodanic/simulaBet.git)
    cd simulaBet
    ```

3.  **Instale as dependências**:
    ```bash
    npm install
    ```

4.  **Obtenha a Chave da The Odds API**:
    Este projeto depende da The Odds API para obter os dados de jogos e odds. O plano gratuito é suficiente.
    * Acesse o site oficial: [https://the-odds-api.com/](https://the-odds-api.com/)
    * No menu, procure por **"Pricing"** (Preços) e selecione o plano **"Free"** (Gratuito).
    * Crie sua conta. Você precisará de um e-mail e senha.
    * Após o cadastro e login, sua chave de API estará visível no seu painel (**Dashboard**) ou será enviada para o seu e-mail.
    * Copie essa chave, pois você a usará no passo de configuração do backend.

5.  **Configuração do Backend (Supabase)**:
    * Crie um novo projeto no painel do Supabase.
    * Vá em **Project Settings > API** e anote sua **Project URL** e sua chave **`anon` public**.
    * Crie um arquivo `.env` na raiz do projeto e adicione suas chaves:
        ```
        EXPO_PUBLIC_SUPABASE_URL="SUA_URL_DO_PROJETO_SUPABASE"
        EXPO_PUBLIC_SUPABASE_ANON_KEY="SUA_CHAVE_ANON_DO_SUPABASE"
        ```

6.  **Estrutura do Banco de Dados**:
    * No painel do seu projeto Supabase, vá para o **SQL Editor**.
    * Copie todo o conteúdo do arquivo `schema.sql` (disponível neste repositório) e cole no SQL Editor.
    * Clique em **"RUN"**. Isso criará todas as tabelas (`profiles`, `game`, `Aposta`) e as Políticas de Segurança (RLS) necessárias.

7.  **Configuração da Edge Function (Busca de Jogos)**:
    * A lógica para buscar os jogos automaticamente precisa ser configurada via CLI do Supabase.
        ```bash
        # Instale a CLI do Supabase (se ainda não tiver)
        npm install supabase --save-dev

        # Faça o login na sua conta
        npx supabase login

        # Conecte a pasta local ao seu projeto Supabase (o ID está na URL do painel)
        npx supabase link --project-ref SEU_PROJECT_ID

        # Adicione sua chave da The Odds API (obtida no passo 4) como um segredo
        npx supabase secrets set THE_ODDS_API_KEY=SUA_CHAVE_DA_THE_ODDS_API

        # Envie a função que está na pasta /supabase do projeto
        npx supabase functions deploy fetch-games
        ```

## Execução do Projeto

* Com o backend configurado, inicie o aplicativo:
    ```bash
    npx expo start
    ```
* Escaneie o QR code com o aplicativo Expo Go no seu celular ou abra em um emulador Android/iOS.

## Autor

* **Victor Daniel Santos Cardoso** - Desenvolvedor principal do projeto.
    * [LinkedIn](https://www.linkedin.com/in/victor-daniel-santos-cardoso-ab0787344/)
    * [GitHub](https://github.com/keodanic)

## Licença

Este projeto está licenciado sob a Licença MIT.
