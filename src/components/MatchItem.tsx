import React, { useState } from 'react';
import { View, Text, Pressable, TextInput, Modal, Alert } from 'react-native';

const MatchItem = ({ partida, onApostar }) => {
  const [selecionado, setSelecionado] = useState(null);
  const [valorAposta, setValorAposta] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  const handleSelectOdd = (palpite, odd) => {
    setSelecionado({ palpite, odd });
    setModalVisible(true);
  };

  const handleConfirmarAposta = () => {
    const valor = parseFloat(valorAposta);
    if (isNaN(valor) || valor <= 0) {
      Alert.alert("Erro", "Por favor, insira um valor de aposta válido.");
      return;
    }
    onApostar(partida.fixture_id, selecionado.palpite, valor, selecionado.odd);
    setModalVisible(false);
    setValorAposta('');
    setSelecionado(null);
  };

  const dataDoJogo = new Date(partida.date_time);
  const dataFormatada = dataDoJogo.toLocaleDateString('pt-BR');
  const horaFormatada = dataDoJogo.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });

  const OddButton = ({ palpite, time, odd }) => (
    <Pressable 
      onPress={() => handleSelectOdd(palpite, odd)}
      className={`flex-1 p-3 mx-1 rounded-lg items-center ${selecionado?.palpite === palpite ? 'bg-indigo-100 border-2 border-indigo-500' : 'bg-slate-50 border border-slate-200'}`}
    >
      <Text className="text-xs text-slate-600 font-medium">{time}</Text>
      <Text className="font-bold text-indigo-600 text-lg mt-1">{odd.toFixed(2)}</Text>
    </Pressable>
  );

  return (
    <View className="bg-white rounded-xl p-4 my-2 mx-4 shadow-sm border border-slate-100">
      {/* Cabeçalho da partida */}
      <View className="mb-3">
        <Text className="text-center font-bold text-lg text-slate-800">{partida.team_house}</Text>
        <Text className="text-center text-slate-400 text-sm my-1">vs</Text>
        <Text className="text-center font-bold text-lg text-slate-800">{partida.team_away}</Text>
        <Text className="text-center text-xs text-slate-500 mt-2">
          {dataFormatada} • {horaFormatada}
        </Text>
      </View>
      
      {/* Odds */}
      <View className="flex-row justify-between mt-3">
        <OddButton palpite="home" time="Casa" odd={partida.odds_home} />
        <OddButton palpite="draw" time="Empate" odd={partida.odds_draw} />
        <OddButton palpite="away" time="Fora" odd={partida.odds_away} />
      </View>

      {/* Modal de Aposta */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View className="flex-1 justify-center items-center bg-black/70 p-4">
          <View className="w-full bg-white rounded-xl p-6 max-w-md">
            <Text className="text-xl font-bold text-center text-slate-800 mb-1">Confirmar Aposta</Text>
            <Text className="text-center text-slate-500 mb-5">
              {partida.team_house} vs {partida.team_away}
            </Text>
            
            <View className="bg-indigo-50 rounded-lg p-4 mb-5">
              <Text className="text-center font-semibold text-indigo-700">
                {selecionado?.palpite === 'home' ? partida.team_house : 
                 selecionado?.palpite === 'away' ? partida.team_away : 'Empate'}
              </Text>
              <Text className="text-center text-slate-600 text-sm">Odd: {selecionado?.odd.toFixed(2)}</Text>
            </View>
            
            <TextInput
              className="w-full border border-slate-300 rounded-lg p-4 text-center text-lg mb-5 font-medium"
              placeholder="R$ 0,00"
              placeholderTextColor="#94a3b8"
              keyboardType="numeric"
              value={valorAposta}
              onChangeText={setValorAposta}
            />
            
            <View className="flex-row space-x-3">
              <Pressable 
                onPress={() => setModalVisible(false)}
                className="flex-1 border border-slate-300 rounded-lg p-3 items-center"
              >
                <Text className="text-slate-700 font-medium">Cancelar</Text>
              </Pressable>
              <Pressable 
                onPress={handleConfirmarAposta}
                className="flex-1 bg-emerald-500 rounded-lg p-3 items-center"
              >
                <Text className="text-white font-medium">Apostar</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default MatchItem;