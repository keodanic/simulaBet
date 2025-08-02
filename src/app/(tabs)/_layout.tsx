import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ 
        tabBarActiveTintColor: '#3B82F6', 
        tabBarInactiveTintColor: '#6B7280', 
        
        tabBarHideOnKeyboard: true,
      }}>
      <Tabs.Screen
         name="home"
        options={{
          headerShown: false,
          title: 'Início',
          tabBarIcon: ({ color }) => (
            <FontAwesome size={24} name="home" color={color} />
          ),
        }}
      />
       <Tabs.Screen
        name="myBets"
         options={{
           headerShown: false,
           title: 'Minhas Apostas',
           tabBarIcon: ({ color }) => (
             <FontAwesome size={24} name="heart" color={color} />
           ),
         }}
       />
      <Tabs.Screen
       name="settings"
        options={{
          headerShown: false,
          title: 'Perfil',
          tabBarIcon: ({ color }) => (
            <FontAwesome size={24} name="user" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}