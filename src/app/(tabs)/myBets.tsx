import React, { useState, useEffect, useCallback } from 'react';
import { supabase } from "@/service/supabase";
import { SafeAreaView, Text, FlatList, ActivityIndicator, View, RefreshControl, TouchableOpacity } from 'react-native';
import BetItem from '@/components/BetItem';

const MyBetsScreen = () => {
    const [bets, setBets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [activeFilter, setActiveFilter] = useState('all');

    const fetchBets = useCallback(async () => {
        try {
            setLoading(true);
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) throw new Error("Usuário não encontrado");

           
            let query = supabase
                .from('Aposta')
                .select(`
                    *,
                    game (
                        team_house,
                        team_away,
                        date_time
                    )
                `)
                .eq('user_id', user.id)
                .order('created_at', { ascending: false });

            const { data, error } = await query;
            
            if (error) throw error;
            
           
            const processedBets = (data || []).map(bet => ({
                ...bet,
                status: bet.status || 'pendente' 
            }));
            
            setBets(processedBets);
        } catch (error) {
            console.error("Erro ao buscar apostas:", error.message);
            Alert.alert("Erro", "Não foi possível carregar suas apostas");
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    }, []); 

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        fetchBets();
    }, [fetchBets]);

    useEffect(() => {
        fetchBets();
    }, [fetchBets]);

    const FilterButton = ({ status, label }) => (
        <TouchableOpacity
            onPress={() => setActiveFilter(status)}
            className={`px-4 py-2 rounded-full mr-2 ${
                activeFilter === status ? 'bg-indigo-600' : 'bg-slate-200'
            }`}
        >
            <Text className={`text-sm font-medium ${
                activeFilter === status ? 'text-white' : 'text-slate-700'
            }`}>
                {label}
            </Text>
        </TouchableOpacity>
    );

    
    const filteredBets = activeFilter === 'all' 
        ? bets 
        : bets.filter(bet => bet.status === activeFilter);

    if (loading && !refreshing) {
        return (
            <View className="flex-1 justify-center items-center bg-slate-100">
                <ActivityIndicator size="large" color="#4f46e5" />
            </View>
        );
    }

    return (
        <SafeAreaView className="flex-1 bg-slate-100">
            {/* Header */}
            <View className="px-6 pt-6 pb-4 bg-white shadow-sm">
                <Text className="text-2xl font-bold text-slate-800">Minhas Apostas</Text>
                <Text className="text-slate-500 text-sm mt-1">Histórico de todas as suas apostas</Text>
                
                {/* Filtros */}
                <View className="flex-row mt-4">
                    <FilterButton status="all" label="Todas" />
                    
                    <FilterButton status="vencida" label="Ganhas" />
                    <FilterButton status="perdida" label="Perdidas" />
                </View>
            </View>

            {/* Lista de Apostas */}
            <FlatList
                data={filteredBets}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => <BetItem bet={item} />}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                        colors={['#4f46e5']}
                        tintColor="#4f46e5"
                    />
                }
                ListEmptyComponent={
                    <View className="flex-1 justify-center items-center mt-20">
                        <Text className="text-slate-500 text-lg">Nenhuma aposta encontrada</Text>
                        <Text className="text-slate-400 mt-2">
                            {activeFilter === 'all' 
                                ? "Você ainda não fez nenhuma aposta"
                                : `Nenhuma aposta ${activeFilter === 'pendente' ? 'em andamento' : activeFilter === 'vencida' ? 'ganha' : 'perdida'}`}
                        </Text>
                    </View>
                }
                contentContainerStyle={filteredBets.length === 0 ? { flex: 1 } : { paddingBottom: 20 }}
                ItemSeparatorComponent={() => <View className="h-3" />}
                showsVerticalScrollIndicator={false}
                className="px-4 pt-4"
            />

           
            {filteredBets.length > 0 && (
                <View className="bg-white p-4 border-t border-slate-200">
                    <View className="flex-row justify-between">
                        <View className="items-center">
                            <Text className="text-slate-500 text-sm">Total Apostado</Text>
                            <Text className="text-slate-800 font-bold">
                                {filteredBets.reduce((sum, bet) => sum + bet.valor_apostado, 0).toFixed(2)}
                            </Text>
                        </View>
                        <View className="items-center">
                            <Text className="text-slate-500 text-sm">Ganho Potencial</Text>
                            <Text className="text-emerald-500 font-bold">
                                {filteredBets
                                    .filter(bet => bet.status === 'vencida')
                                    .reduce((sum, bet) => sum + (bet.valor_apostado * bet.odds), 0)
                                    .toFixed(2)}
                            </Text>
                        </View>
                        <View className="items-center">
                            <Text className="text-slate-500 text-sm">Taxa de Sucesso</Text>
                            <Text className="text-indigo-600 font-bold">
                                {filteredBets.filter(b => b.status === 'vencida').length}/{filteredBets.length}
                            </Text>
                        </View>
                    </View>
                </View>
            )}
        </SafeAreaView>
    );
};

export default MyBetsScreen;