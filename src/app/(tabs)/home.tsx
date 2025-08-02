import React, { useState, useEffect, useCallback } from 'react';
import { supabase } from "@/service/supabase";
import { SafeAreaView, View, Text, FlatList, ActivityIndicator, Alert, RefreshControl } from 'react-native';
import SaldoComponent from '@/components/SaldoComponent';
import MatchItem from '@/components/MatchItem';

const HomeScreen = () => {
  const [saldoFicticio, setSaldoFicticio] = useState(1000.00); 
  const [partidas, setPartidas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  
  const loadData = useCallback(async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('game')
        .select('*')
        .order('date_time', { ascending: true });

      if (error) throw error;
      setPartidas(data);
    } catch (error) {
      Alert.alert("Erro ao buscar jogos", error.message);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    loadData();
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleApostar = async (fixtureId, palpite, valor, odd) => {
    if (valor > saldoFicticio) {
        Alert.alert("Saldo Insuficiente", "Você não tem créditos suficientes para esta aposta.");
        return;
    }

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Usuário não autenticado");

      const { error } = await supabase
        .from('Aposta')
        .insert({
          fixture_id: fixtureId,
          palpite: palpite,
          valor_apostado: valor,
          odds: odd,
          user_id: user.id
        });

      if (error) throw error;
      
      setSaldoFicticio(saldoAtual => saldoAtual - valor);
      Alert.alert("Aposta registrada!", `Você apostou ${valor.toFixed(2)} créditos em ${palpite}. Boa sorte!`);

    } catch (error) {
      Alert.alert("Erro na Aposta", error.message);
    }
  };

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
      <View className="flex-row justify-between items-center p-4 bg-white shadow-sm">
        <View>
          <Text className="text-xl font-bold text-slate-800">Jogos Disponíveis</Text>
          <Text className="text-xs text-slate-500">Aposte com créditos virtuais</Text>
        </View>
        <SaldoComponent saldo={saldoFicticio} />
      </View>
      
      {/* Lista de Partidas */}
      <FlatList
        data={partidas}
        keyExtractor={(item) => item.fixture_id.toString()}
        renderItem={({ item }) => (
          <MatchItem 
            partida={item} 
            onApostar={handleApostar} 
          />
        )}
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
            <Text className="text-slate-500 text-lg">Nenhum jogo disponível</Text>
            <Text className="text-slate-400 mt-2">Tente atualizar mais tarde</Text>
          </View>
        }
        contentContainerStyle={partidas.length === 0 ? { flex: 1 } : { paddingBottom: 20 }}
        ItemSeparatorComponent={() => <View className="h-3" />}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

export default HomeScreen;