import { supabase } from "@/service/supabase";
import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";

const Login = () => {
    const router = useRouter();
    const [loading, setLoading] = useState<boolean>(false);
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    async function handleLogin() {
        setLoading(true);
        const { error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password,
        });
        
        if (!error) {
            setLoading(false);
            alert("Login realizado com sucesso");
            router.push("/(tabs)/home");
        }
        if (error) {
            setLoading(false);
            alert(error.message);
        }
    }

    return (
        <View className="flex-1 justify-center p-8 bg-slate-100">
            {/* Logo/Cabeçalho */}
            <View className="items-center mb-12">
                <Text className="text-3xl font-bold text-indigo-600 mb-2">SimulaBet</Text>
                <Text className="text-slate-500">Aposta sem medo, diverte-te!</Text>
            </View>
            
            {/* Formulário */}
            <View className="mb-6">
                <Text className="text-2xl font-bold text-slate-800 mb-6 text-center">Acesse sua conta</Text>
                
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
                    className="h-14 border border-slate-300 rounded-lg px-4 mb-6 bg-white text-slate-800"
                    placeholder="Senha"
                    placeholderTextColor="#94a3b8"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                />
                
                <TouchableOpacity 
                    className="h-14 bg-indigo-600 rounded-lg justify-center items-center mb-4 flex-row"
                    onPress={handleLogin}
                    disabled={loading}
                >
                    {loading ? (
                        <ActivityIndicator color="#ffffff" />
                    ) : (
                        <Text className="text-white text-lg font-semibold">Entrar</Text>
                    )}
                </TouchableOpacity>
                
                <TouchableOpacity 
                    className="h-14 border border-indigo-600 rounded-lg justify-center items-center"
                    onPress={() => router.push("/register")}
                >
                    <Text className="text-indigo-600 text-lg font-semibold">Criar nova conta</Text>
                </TouchableOpacity>
            </View>
            
            {/* Link de recuperação */}
            <TouchableOpacity className="items-center mt-4">
                <Text className="text-slate-500 underline">Esqueceu sua senha?</Text>
            </TouchableOpacity>
        </View>
    );
};

export default Login;