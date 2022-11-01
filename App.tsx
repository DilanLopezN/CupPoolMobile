import { StatusBar } from 'expo-status-bar'

import { NativeBaseProvider, Text, Center } from 'native-base'

export default function App() {
  return (
    <NativeBaseProvider>
      <Center flex={1} bgColor="fuchsia.400">
        <Text color="black" fontSize={24}>
          Nlw Cup Poll
        </Text>
        <StatusBar style="auto" />
      </Center>
    </NativeBaseProvider>
  )
}
