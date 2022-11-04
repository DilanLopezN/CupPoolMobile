import { Heading, VStack, Text, useToast } from 'native-base'
import { useState } from 'react'
import { Header } from '../components/Header'
import Logo from '../assets/logo.svg'
import { Input } from '../components/Input'
import { Button } from '../components/Button'
import { api } from '../services/api'

export function New() {
  const [title, setTitle] = useState('')
  const [isLoading, setIsLoanding] = useState(false)

  const toast = useToast()
  async function handlePoolCreate() {
    if (!title.trim()) {
      return toast.show({
        title: 'Informe nome para seu bolão',
        placement: 'top',
        bgColor: 'red.500'
      })
    }
    try {
      setIsLoanding(true)
      await api.post('/pools', { title })
      toast.show({
        title: 'Bolão criado com sucesso',
        placement: 'top',
        bgColor: 'green.500'
      })

      setTitle('')
    } catch (erro) {
      console.log(console.error())
      toast.show({
        title: 'Não foi possivel criar bolão',
        placement: 'top',
        bgColor: 'red.500'
      })
    } finally {
      setIsLoanding(false)
    }
  }

  return (
    <VStack flex={1} bgColor="gray.900">
      <Header title="Criar novo bolão" />
      <VStack mt={8} mx={5} alignItems="center">
        <Logo />
        <Heading
          fontFamily="heading"
          color="white"
          fontSize="xl"
          my={8}
          textAlign="center"
        >
          Crise seu próprio bolão da copa e compartilhe entre amigos!
        </Heading>

        <Input
          mb={2}
          placeholder="Qual nome do seu bolão"
          onChangeText={setTitle}
          value={title}
        />
        <Button
          title="CRIAR MEU BOLÃO"
          onPress={handlePoolCreate}
          isLoading={isLoading}
        />
        <Text color="gray.200" fontSize="sm" textAlign="center" px={10} mt={4}>
          Após criar seu bolão, você receberá um código único que poderá usar
          para convidar outras pessoas.
        </Text>
      </VStack>
    </VStack>
  )
}
