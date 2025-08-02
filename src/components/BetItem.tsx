import React from 'react';
import { View, Text } from 'react-native';

const statusConfig = {
    pendente: {
        text: 'EM ANDAMENTO',
        bg: 'bg-amber-100',
        textColor: 'text-amber-800',
        border: 'border-amber-300'
    },
    vencida: {
        text: 'VENCIDA',
        bg: 'bg-emerald-100',
        textColor: 'text-emerald-800',
        border: 'border-emerald-300'
    },
    perdida: {
        text: 'PERDIDA',
        bg: 'bg-red-100',
        textColor: 'text-red-800',
        border: 'border-red-300'
    },
};

const BetItem = ({ bet }) => {
    if (!bet.game) return null;

    const status = statusConfig[bet.status] || statusConfig.pendente;
    const ganhoPotencial = (bet.valor_apostado * bet.odds).toFixed(2);
    const dataDoJogo = new Date(bet.game.date_time).toLocaleDateString('pt-BR');
    const horaDoJogo = new Date(bet.game.date_time).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });

    const getPalpiteText = () => {
        const map = {
            home: bet.game.team_house,
            away: bet.game.team_away,
            draw: 'EMPATE'
        };
        return map[bet.palpite] || bet.palpite.toUpperCase();
    };

    return (
        <View className={`bg-white rounded-xl p-4 my-2 mx-4 border-l-4 ${status.border} shadow-sm`}>
            {/* Cabeçalho */}
            <View className="flex-row justify-between items-start mb-2">
                <View className="flex-1">
                    <Text className="text-xs text-slate-500">{dataDoJogo} • {horaDoJogo}</Text>
                    <Text className="text-lg font-bold text-slate-800 mt-1">
                        {bet.game.team_house} vs {bet.game.team_away}
                    </Text>
                </View>
                <View className={`px-3 py-1 rounded-full ${status.bg}`}>
                    <Text className={`text-xs font-bold ${status.textColor}`}>{status.text}</Text>
                </View>
            </View>

            {/* Detalhes da Aposta */}
            <View className="mt-3 space-y-2">
                <View className="flex-row justify-between">
                    <Text className="text-sm text-slate-600">Palpite:</Text>
                    <Text className="text-sm font-semibold text-indigo-600">{getPalpiteText()}</Text>
                </View>
                
                <View className="flex-row justify-between">
                    <Text className="text-sm text-slate-600">Odd:</Text>
                    <Text className="text-sm font-semibold text-slate-800">@{bet.odds.toFixed(2)}</Text>
                </View>
                
                <View className="flex-row justify-between">
                    <Text className="text-sm text-slate-600">Valor apostado:</Text>
                    <Text className="text-sm font-semibold text-red-500">{bet.valor_apostado.toFixed(2)} créditos</Text>
                </View>
                
                <View className="flex-row justify-between">
                    <Text className="text-sm text-slate-600">Ganho potencial:</Text>
                    <Text className="text-sm font-semibold text-emerald-500">{ganhoPotencial} créditos</Text>
                </View>
            </View>

            {/* Resultado final (apenas para apostas resolvidas) */}
            {bet.status !== 'pendente' && (
                <View className={`mt-3 p-2 rounded-lg ${status.bg}`}>
                    <Text className={`text-xs text-center ${status.textColor}`}>
                        {bet.status === 'vencida' 
                            ? `🎉 Você ganhou ${ganhoPotencial} créditos!`
                            : `😞 Aposta não vencedora`}
                    </Text>
                </View>
            )}
        </View>
    );
};

export default BetItem;