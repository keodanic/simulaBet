import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

interface GameFromAPI {
  id: string;
  sport_key: string;
  commence_time: string;
  home_team: string;
  away_team: string;
  bookmakers: Array<{
    key: string;
    markets: Array<{
      key: 'h2h';
      outcomes: Array<{
        name: string;
        price: number;
      }>;
    }>;
  }>;
}

Deno.serve(async (_req: Request) => {
  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    const apiKey = Deno.env.get('THE_ODDS_API_KEY');

    const sport = 'soccer_brazil_campeonato';
    
    const apiUrl = `https://api.the-odds-api.com/v4/sports/${sport}/odds/?regions=eu&markets=h2h&oddsFormat=decimal&apiKey=${apiKey}`;

    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error(`Falha ao chamar a The Odds API: ${await response.text()}`);
    }

    const gamesFromAPI: GameFromAPI[] = await response.json();

    if (gamesFromAPI.length === 0) {
      return new Response(JSON.stringify({ message: "Nenhum jogo com odds encontrado na The Odds API para a liga selecionada." }), { status: 200 });
    }

    const gamesToSave = gamesFromAPI.map(game => {
      const market = game.bookmakers?.[0]?.markets?.find(m => m.key === 'h2h');
      const homeOdds = market?.outcomes.find(o => o.name === game.home_team)?.price ?? 0;
      const awayOdds = market?.outcomes.find(o => o.name === game.away_team)?.price ?? 0;
      const drawOdds = market?.outcomes.find(o => o.name === 'Draw')?.price ?? 0;

      return {
        fixture_id: game.id,
        team_house: game.home_team,
        team_away: game.away_team,
        date_time: game.commence_time,
        odds_home: homeOdds,
        odds_draw: drawOdds,
        odds_away: awayOdds,
        result: null
      };
    }).filter(game => game.odds_home > 0);

    if (gamesToSave.length === 0) {
        return new Response(JSON.stringify({ message: "Jogos encontrados, mas nenhum com odds para o mercado 'Vencedor da Partida'." }), { status: 200 });
    }

    const { error } = await supabaseClient.from('game').upsert(gamesToSave);
    if (error) { throw error; }

    return new Response(JSON.stringify({ message: `${gamesToSave.length} jogos salvos/atualizados com sucesso da The Odds API!` }), {
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { 'Content-Type': 'application/json' },
      status: 500,
    });
  }
});