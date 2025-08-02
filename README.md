SimulaBET ⚽️💰
<p align="center">
<img src="https://www.google.com/search?q=https://img.shields.io/badge/React_Native-20232A%3Fstyle%3Dfor-the-badge%26logo%3Dreact%26logoColor%3D61DAFB" alt="React Native">
<img src="https://www.google.com/search?q=https://img.shields.io/badge/Expo-20232A%3Fstyle%3Dfor-the-badge%26logo%3Dexpo%26logoColor%3Dwhite" alt="Expo">
<img src="https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white" alt="Supabase">
<img src="https://www.google.com/search?q=https://img.shields.io/badge/NativeWind-20232A%3Fstyle%3Dfor-the-badge%26logo%3Dtailwindcss%26logoColor%3Dwhite" alt="NativeWind">

</p>

📖 Sobre o Projeto
SimulaBET é uma plataforma recreativa de apostas virtuais baseada em jogos de futebol reais. O objetivo é permitir que usuários testem suas habilidades de aposta em um ambiente seguro e divertido, utilizando um saldo de créditos fictícios que se renova diariamente, mas com odds reais de mercado.

Este projeto foi desenvolvido como um trabalho acadêmico, demonstrando a integração de um frontend mobile com um backend robusto (BaaS), automações e consumo de APIs de terceiros.

✨ Funcionalidades
👤 Autenticação de Usuários: Cadastro e Login seguros usando Supabase Auth.

💰 Saldo Virtual: Cada usuário recebe um saldo inicial de 1000 créditos, que é resetado automaticamente caso chegue a zero no dia seguinte.

📊 Odds Reais: Listagem de jogos de futebol reais (Brasileirão, Premier League, etc.) com odds de mercado consumidas da API "The Odds API".

🎟️ Sistema de Apostas: Interface para selecionar um resultado (vitória, empate ou derrota), definir um valor e registrar a aposta.

📜 Histórico de Apostas: Uma tela dedicada para o usuário visualizar todas as apostas que já fez, junto com seu status (pendente, vencida, perdida).

⚙️ Configurações: Tela para visualizar dados da conta, resetar o saldo manualmente e fazer logout.

🛠️ Tecnologias Utilizadas
Tecnologia	Descrição
React Native	Framework para desenvolvimento de aplicativos móveis.
Expo (Router)	Plataforma e ferramentas para facilitar o desenvolvimento e build com React Native.
Supabase	Backend-as-a-Service (BaaS) utilizado para:
- Authentication: Gerenciamento de usuários.
- Database: Banco de dados PostgreSQL para armazenar perfis, jogos e apostas.
- Edge Functions: Funções serverless para buscar dados da API externa de forma automática.
The Odds API	API de terceiros para o fornecimento de dados de jogos e odds.
NativeWind	Implementação do Tailwind CSS para estilização no React Native.

Exportar para as Planilhas
🚀 Como Rodar o Projeto
Para configurar e rodar este projeto localmente, siga os passos abaixo.

Pré-requisitos
Node.js (versão LTS recomendada)

Git

Uma conta no Supabase

Uma chave de API da The Odds API (o plano gratuito é suficiente)

1. Configuração do Frontend (Aplicativo)
Bash

# Clone o repositório
git clone https://github.com/SEU_USUARIO/simulabet.git

# Entre na pasta do projeto
cd simulabet

# Instale as dependências
npm install
2. Configuração das Variáveis de Ambiente
Crie um arquivo chamado .env na raiz do projeto, copiando o exemplo .env.example.

Bash

cp .env.example .env
Agora, edite o arquivo .env com suas chaves do Supabase:

EXPO_PUBLIC_SUPABASE_URL="SUA_URL_DO_PROJETO_SUPABASE"
EXPO_PUBLIC_SUPABASE_ANON_KEY="SUA_CHAVE_ANON_DO_SUPABASE"
Você encontra essas chaves no painel do seu projeto Supabase em Project Settings > API.

3. Configuração do Backend (Supabase)
Esta é a parte mais importante. Precisamos criar as tabelas e as regras de negócio no seu projeto Supabase.

3a. Criação das Tabelas e Permissões
A maneira mais fácil é executar um único script SQL que cria tudo de uma vez.

Vá para o painel do seu projeto Supabase.

No menu lateral, clique em SQL Editor.

Clique em "New query".

Copie e cole todo o conteúdo do arquivo schema.sql (disponível neste repositório) na caixa de texto.

Clique em "RUN".

Este script irá criar as tabelas profiles, game e Aposta, e já vai configurar as permissões (Policies) de RLS necessárias para o aplicativo funcionar.

3b. Automação de Perfis de Usuário
Para garantir que cada novo usuário cadastrado tenha um perfil criado automaticamente, precisamos de uma Função e um Gatilho (Trigger).

Ainda no SQL Editor, copie e cole o script abaixo e clique em "RUN".

SQL

-- 1. Cria a função que será executada
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id)
  VALUES (new.id);
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 2. Cria o gatilho que executa a função sempre que um novo usuário é criado
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- 3. Garante as permissões para o gatilho funcionar
GRANT USAGE ON SCHEMA public TO postgres;
GRANT INSERT ON TABLE public.profiles TO postgres;
3c. Configuração da Edge Function
A Edge Function é responsável por buscar os jogos da "The Odds API" e popular sua tabela game.

Bash

# Instale a CLI do Supabase
npm install supabase --save-dev

# Faça o login
npx supabase login

# Conecte ao seu projeto (o PROJECT_ID está na URL do seu painel)
npx supabase link --project-ref SEU_PROJECT_ID

# Adicione sua chave da The Odds API como um segredo
npx supabase secrets set THE_ODDS_API_KEY=SUA_CHAVE_DA_THE_ODDS_API_AQUI

# Envie a função para o Supabase (os arquivos já estão na pasta /supabase)
npx supabase functions deploy fetch-games

# Agende a função para rodar automaticamente
# Vá ao painel do Supabase > Edge Functions > fetch-games e configure um agendamento CRON.
# Exemplo para rodar a cada 2 horas: 0 */2 * * *
4. Rodando o Aplicativo
Com o backend configurado, você pode iniciar o aplicativo.

Bash

npx expo start
Escaneie o QR code com o aplicativo Expo Go no seu celular, ou rode em um emulador.

👨‍💻 Autor
Feito com ❤️ por [SEU NOME AQUI]

📄 Licença
Este projeto está sob a licença MIT. Veja o arquivo LICENSE para mais detalhes.