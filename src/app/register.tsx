import { supabase } from "@/service/supabase";
import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, Alert } from "react-native";
import { useRouter } from "expo-router";

const Register = () => {
    const router = useRouter();
    const [loading, setLoading] = useState<boolean>(false);
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");

    async function handleRegister() {
        
        if (password !== confirmPassword) {
            Alert.alert("Erro", "As senhas não coincidem");
            return;
        }

        if (password.length < 6) {
            Alert.alert("Erro", "A senha deve ter pelo menos 6 caracteres");
            return;
        }

        setLoading(true);

        
        const { data: authData, error: authError } = await supabase.auth.signUp({
            email: email,
            password: password,
        });

       
        if (authError) {
            setLoading(false);
            Alert.alert("Erro no Cadastro", authError.message);
            return;
        }

        
        if (authData.user) {
            const { error: profileError } = await supabase
              .from('profiles')
              .insert({ id: authData.user.id });

            
            if (profileError) {
                setLoading(false);
                Alert.alert("Erro Crítico", `Sua conta foi criada, mas não foi possível configurar seu perfil. Por favor, contate o suporte. Erro: ${profileError.message}`);
                return;
            }
        }

        
        setLoading(false);
        Alert.alert(
            "Sucesso", 
            "Conta criada! Verifique seu email para o link de confirmação e depois faça o login.",
            [
                { text: "OK", onPress: () => router.push("/login") }
            ]
        );
    }

    return (
        <View className="flex-1 justify-center p-8 bg-slate-100">
            {/* Logo/Cabeçalho */}
            <View className="items-center mb-10">
                <Text className="text-3xl font-bold text-indigo-600 mb-2">BetSimulator</Text>
                <Text className="text-slate-500">Crie sua conta e comece a apostar</Text>
            </View>
            
            {/* Formulário */}
            <View className="mb-6">
                <Text className="text-2xl font-bold text-slate-800 mb-6 text-center">Criar nova conta</Text>
                
                <TextInput
                    className="h-14 border border-slate-300 rounded-lg px-4 mb-4 bg-white text-slate-800"
                    placeholder="Email"
                    placeholderTextColor="#94a3b8"
                    value={email}
                    onChangeText={setEmail}
                    autoCapitalize="none"
                    keyboardType="email-address"
                />
                
                <TextInput
                    className="h-14 border border-slate-300 rounded-lg px-4 mb-4 bg-white text-slate-800"
                    placeholder="Senha (mínimo 6 caracteres)"
                    placeholderTextColor="#94a3b8"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                />

                <TextInput
                    className="h-14 border border-slate-300 rounded-lg px-4 mb-6 bg-white text-slate-800"
                    placeholder="Confirmar Senha"
                    placeholderTextColor="#94a3b8"
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                    secureTextEntry
                />
                
                <TouchableOpacity 
                    className="h-14 bg-emerald-500 rounded-lg justify-center items-center mb-4 flex-row"
                    onPress={handleRegister}
                    disabled={loading}
                >
                    {loading ? (
                        <ActivityIndicator color="#ffffff" />
                    ) : (
                        <Text className="text-white text-lg font-semibold">Cadastrar</Text>
                    )}
                </TouchableOpacity>
                
                <TouchableOpacity 
                    className="h-14 border border-indigo-600 rounded-lg justify-center items-center"
                    onPress={() => router.push("/login")}
                >
                    <Text className="text-indigo-600 text-lg font-semibold">Já tenho uma conta</Text>
                </TouchableOpacity>
            </View>
            
            {/* Termos e condições */}
            <View className="mt-6 px-4">
                <Text className="text-xs text-center text-slate-500">
                    Ao cadastrar, você concorda com nossos Termos de Serviço e Política de Privacidade
                </Text>
            </View>
        </View>
    );
};

export default Register;