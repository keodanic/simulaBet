import React from 'react';
import { View, Text } from 'react-native';

const SaldoComponent = ({ saldo }) => {
  return (
    <View className="p-4 bg-indigo-600 rounded-xl shadow-lg">
      <View className="flex-row justify-between items-center">
        <View>
          <Text className="text-indigo-100 text-sm font-medium">Saldo Disponível</Text>
          <Text className="text-white text-2xl font-bold mt-1">
            {saldo?.toFixed(2) || '0.00'} 
            <Text className="text-indigo-200 text-lg"> créditos</Text>
          </Text>
        </View>
        
        {/* Ícone/emoji opcional - pode remover se não quiser */}
        <View className="bg-indigo-500 rounded-full w-10 h-10 items-center justify-center">
          <Text className="text-white text-lg">💰</Text>
        </View>
      </View>
      
    </View>
  );
};

export default SaldoComponent;