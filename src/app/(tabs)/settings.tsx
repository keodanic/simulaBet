import { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { supabase } from '@/service/supabase';

const Settings = () => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [aboutModalVisible, setAboutModalVisible] = useState(false);

    const handleLogout = async () => {
        setLoading(true);
        try {
            const { error } = await supabase.auth.signOut();
            if (error) throw error;
            router.replace('/login');
        } catch (error) {
            Alert.alert('Erro ao sair', error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <View className="flex-1 p-6 bg-slate-100">
            <Text className="text-2xl font-bold mb-6 text-slate-800">Configurações</Text>
            
            {/* Seção de Conta */}
            <View className="mb-8 rounded-xl bg-white p-5 shadow-sm">
                <Text className="text-lg font-semibold mb-4 text-slate-800">Conta</Text>
                
                <TouchableOpacity 
                    className="py-3"
                    onPress={handleLogout}
                    disabled={loading}
                >
                    <Text className="text-red-500">Sair da Conta</Text>
                </TouchableOpacity>
            </View>
            
            {/* Seção de Sobre */}
            <View className="rounded-xl bg-white p-5 shadow-sm mb-8">
                <Text className="text-lg font-semibold mb-4 text-slate-800">Sobre</Text>
                
                <TouchableOpacity 
                    className="py-3"
                    onPress={() => setAboutModalVisible(true)}
                >
                    <Text className="text-slate-600">Sobre o Aplicativo</Text>
                </TouchableOpacity>
            </View>

            {/* Modal Sobre */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={aboutModalVisible}
                onRequestClose={() => setAboutModalVisible(false)}
            >
                <View className="flex-1 justify-center items-center bg-black/70 p-4">
                    <View className="w-full bg-white rounded-xl p-6 max-w-md">
                        <Text className="text-xl font-bold text-center text-slate-800 mb-4">Sobre o BetSimulator</Text>
                        
                        <Text className="text-slate-600 mb-4">
                            Olá! Meu nome é Victor Daniel e eu desenvolvi este aplicativo de apostas simuladas como um projeto pessoal.
                        </Text>
                        
                        <Text className="text-slate-600 mb-4">
                            O SimulaBet permite que você faça apostas esportivas virtuais sem usar dinheiro real, perfeito para diversão e aprendizado sobre o mundo das apostas.
                        </Text>
                        
                        <Text className="text-slate-600 mb-4">
                            Tecnologias utilizadas: React Native, Expo, Supabase e Tailwind CSS.
                        </Text>
                        
                        <Text className="text-slate-500 text-sm">
                            Versão 1.0.0
                        </Text>
                        
                        <TouchableOpacity 
                            className="mt-6 bg-indigo-600 rounded-lg p-3 items-center"
                            onPress={() => setAboutModalVisible(false)}
                        >
                            <Text className="text-white font-medium">Fechar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

export default Settings;