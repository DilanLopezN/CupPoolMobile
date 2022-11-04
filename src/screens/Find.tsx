import { Heading, Toast, useToast, VStack } from 'native-base'
import { Header } from '../components/Header'
import { useState } from 'react'
import { api } from '../services/api'
import { Input } from '../components/Input'
import { Button } from '../components/Button'
import { useNavigation } from '@react-navigation/native'

export function Find() {
  const [isLoading, setIsLoanding] = useState(false)
  const [code, setCode] = useState('')
  const { navigate } = useNavigation()

  const toast = useToast()
  async function handleJoinPool() {
    try {
      setIsLoanding(true)
      if (!code.trim()) {
        toast.show({
          title: 'Informe o código',
          placement: 'top',
          bgColor: 'red.500'
        })
      }
      await api.post('/pools/join', { code })
      navigate('pools')
      toast.show({
        title: 'Bolão encontrado!',
        placement: 'top',
        bgColor: 'green.500'
      })
    } catch (error) {
      console.log(error)
      setIsLoanding(false)
      if (error.response?.data?.mesage === 'Pool not found.') {
        toast.show({
          title: 'Bolão não encontrado',
          placement: 'top',
          bgColor: 'red.500'
        })
      }
      if (error.response?.data?.mesage === 'You already joined this pool.') {
        toast.show({
          title: 'Você já está nesse bolão',
          placement: 'top',
          bgColor: 'red.500'
        })
      }

      toast.show({
        title: 'Não foi possivel encontrar o bolão',
        placement: 'top',
        bgColor: 'red.500'
      })
    }
  }

  return (
    <VStack flex={1} bgColor="gray.900">
      <Header title="Buscar por código" showBackButton />
      <VStack mt={8} mx={5} alignItems="center">
        <Heading
          fontFamily="heading"
          color="white"
          fontSize="xl"
          mb={8}
          textAlign="center"
        >
          Encontre um bolão atráves de seu código único.
        </Heading>

        <Input
          mb={2}
          placeholder="Qual código do bolão"
          onChangeText={setCode}
          autoCapitalize="characters"
        />
        <Button
          title="BUSCAR BOLÃO"
          isLoading={isLoading}
          onPress={handleJoinPool}
        />
      </VStack>
    </VStack>
  )
}
