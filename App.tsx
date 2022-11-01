import { StatusBar } from 'expo-status-bar'
import { NativeBaseProvider, Text, Center } from 'native-base'
import { THEME } from './src/styles/theme'
import {
  useFonts,
  Roboto_400Regular,
  Roboto_500Medium,
  Roboto_700Bold
} from '@expo-google-fonts/roboto'

export default function App() {
  return (
    <NativeBaseProvider theme={THEME}>
      <Center flex={1} bgColor="gray.900">
        <Text color="black" fontSize={24}>
          Nlw Cup Poll
        </Text>
        <StatusBar style="auto" />
      </Center>
    </NativeBaseProvider>
  )
}
