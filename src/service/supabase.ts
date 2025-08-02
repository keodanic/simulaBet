import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from '@supabase/supabase-js'
import { AppState } from "react-native";

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_PROJECT_URL;
const supabaseKey = process.env.EXPO_PUBLIC_SUPABASE_KEY;
export const supabase = createClient(supabaseUrl, supabaseKey,{
    auth:{
        storage:AsyncStorage,
        autoRefreshToken:true,
        persistSession:true,
        detectSessionInUrl:false

    }
})

AppState.addEventListener("change",(state)=>{
    if(state=="active"){
        supabase.auth.startAutoRefresh
    }else{
        supabase.auth.stopAutoRefresh
    }
})