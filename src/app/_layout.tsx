import '../../global.css';
import {Stack} from "expo-router"

export default function RootLayout(){
  return(
    <Stack>
      <Stack.Screen name="login"/>
      <Stack.Screen name="register"/>
    </Stack>
  )
}
