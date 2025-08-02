SimulaBET - App ⚽️
<p align="center">
  <img src="https://seeklogo.com/images/S/supabase-logo-DCC6749964-seeklogo.com.png" width="120" alt="Supabase Logo" />
</p>

<p align="center">Uma plataforma recreativa de apostas virtuais com jogos e odds reais, mas sem dinheiro de verdade.</p>

Descrição do Projeto
O SimulaBET é um aplicativo móvel desenvolvido como projeto acadêmico com o objetivo de criar uma plataforma de apostas recreativas. A plataforma permite que os usuários apostem em jogos de futebol reais, utilizando um saldo de créditos fictícios, enquanto interagem com odds de mercado verdadeiras. O projeto demonstra a integração completa de um frontend mobile com um Backend-as-a-Service (BaaS), incluindo autenticação, banco de dados, automações serverless (Edge Functions) e o consumo de APIs de terceiros em tempo real.

Funcionalidades Principais
O aplicativo SimulaBET suporta as seguintes funcionalidades essenciais:

Autenticação de Usuários: Sistema completo de cadastro e login utilizando o Supabase Auth.

Criação de Perfis: Geração automática de perfis de usuário no banco de dados no momento do cadastro.

Gestão de Saldo Fictício: Os usuários começam com um saldo de 1000 créditos virtuais, que pode ser resetado manualmente.

Listagem de Jogos: A tela inicial exibe jogos de futebol de ligas populares (como Brasileirão e Premier League) com odds reais, buscados automaticamente através de uma Edge Function.

Sistema de Apostas: Permite que os usuários selecionem um resultado (vitória, empate ou derrota), insiram um valor e confirmem a aposta, que é registrada no banco de dados.

Histórico de Apostas: Uma tela dedicada onde o usuário pode ver todas as apostas que fez, incluindo os detalhes da partida e o status da aposta.

Configurações de Conta: Uma tela para o usuário ver seu e-mail, resetar seu saldo e fazer logout de forma segura.

Tecnologias Utilizadas
Framework Mobile: React Native

Plataforma de Build: Expo

Backend-as-a-Service: Supabase

Banco de Dados: PostgreSQL

Autenticação: Supabase Auth

Funções Serverless: Supabase Edge Functions

API de Dados Esportivos: The Odds API

Estilização: NativeWind (Tailwind CSS para React Native)

Linguagem: TypeScript

Configuração do Ambiente
Pré-requisitos:

Node.js (versão 18 ou superior recomendada)

npm ou Yarn

Git

Uma conta gratuita no Supabase

Uma chave de API gratuita da The Odds API

Clone o repositório:

Bash

git clone [URL_DO_SEU_REPOSITORIO_AQUI]
cd nome-da-pasta-do-projeto
Instale as dependências:

Bash

npm install
Configuração do Backend (Supabase):

Crie um novo projeto no painel do Supabase.

Vá em Project Settings > API e anote sua Project URL e sua chave anon public.

Crie um arquivo .env na raiz do projeto e adicione suas chaves:

EXPO_PUBLIC_SUPABASE_URL="SUA_URL_DO_PROJETO_SUPABASE"
EXPO_PUBLIC_SUPABASE_ANON_KEY="SUA_CHAVE_ANON_DO_SUPABASE"
Estrutura do Banco de Dados:

No painel do seu projeto Supabase, vá para o SQL Editor.

Copie todo o conteúdo do arquivo schema.sql (disponível neste repositório) e cole no SQL Editor.

Clique em "RUN". Isso criará todas as tabelas (profiles, game, Aposta) e as Políticas de Segurança (RLS) necessárias.

Automação e Funções:

Para criar o perfil do usuário automaticamente no cadastro, execute o seguinte script no SQL Editor:

SQL

-- Cria a função
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id)
  VALUES (new.id);
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Cria o gatilho que executa a função
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- Garante as permissões necessárias
GRANT USAGE ON SCHEMA public TO postgres;
GRANT INSERT ON TABLE public.profiles TO postgres;
Para buscar os jogos automaticamente, configure a Edge Function via CLI:

Bash

# Instale a CLI do Supabase (se ainda não tiver)
npm install supabase --save-dev

# Faça o login na sua conta
npx supabase login

# Conecte a pasta local ao seu projeto Supabase
npx supabase link --project-ref SEU_PROJECT_ID

# Adicione sua chave da The Odds API como um segredo
npx supabase secrets set THE_ODDS_API_KEY=SUA_CHAVE_DA_THE_ODDS_API

# Envie a função que está na pasta /supabase do projeto
npx supabase functions deploy fetch-games
Execução do Projeto
Com o backend configurado, inicie o aplicativo:

Bash

npx expo start
Escaneie o QR code com o aplicativo Expo Go no seu celular ou abra em um emulador Android/iOS.

Autor
Victor Daniel Santos Cardoso - Desenvolvedor principal do projeto.

LinkedIn

Licença
Este projeto está licenciado sob a Licença MIT.
