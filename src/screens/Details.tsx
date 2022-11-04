import { HStack, Text, Toast, useToast, VStack } from 'native-base'
import { useState, useEffect } from 'react'
import { Header } from '../components/Header'
import { useRoute } from '@react-navigation/native'
import { Loading } from '../components/Loading'
import { api } from '../services/api'
import { PoolPros } from '../components/PoolCard'
import { PoolHeader } from '../components/PoolHeader'
import { EmptyMyPoolList } from '../components/EmptyMyPoolList'
import { Option } from '../components/Option'
import { Share } from 'react-native'

interface RouteParams {
  id: string
}
export function Details() {
  const [optionSelected, setOption] = useState<
    'Seus Palpites' | 'Ranking do grupo'
  >('Seus Palpites')
  const [poolDetails, setPoolDetails] = useState<PoolPros>({} as PoolPros)
  const [isLoading, setIsLoanding] = useState(false)
  const route = useRoute()
  const { id } = route.params as RouteParams
  const toast = useToast()

  async function fetchPoolDetals() {
    try {
      setIsLoanding(true)

      const response = await api.get(`/pools/${id}`)
      setPoolDetails(response.data.pool)
    } catch (error) {
      console.log(error)
      toast.show({
        title: 'Não foi possivel carregar os detalhes do bolão',
        placement: 'top',
        bgColor: 'red.500'
      })
    } finally {
      setIsLoanding(false)
    }
  }

  async function handleCodeShare() {
    await Share.share({
      message: poolDetails.code
    })
  }

  useEffect(() => {
    fetchPoolDetals()
  }, [id])

  if (isLoading) {
    return <Loading />
  }

  return (
    <VStack flex={1} bgColor="gray.900">
      <Header
        title={poolDetails.title}
        showBackButton
        showShareButton
        onShare={handleCodeShare}
      />
      {poolDetails._count?.participants > 0 ? (
        <VStack px={5} flex={1}>
          <PoolHeader data={poolDetails} />
          <HStack bgColor="gray.800" p={1} rounded="sm" mb={5}>
            <Option
              title="Seus palpites"
              onPress={() => setOption('Seus Palpites')}
              isSelected={optionSelected === 'Seus Palpites'}
            />
            <Option
              title="Ranking do grupo"
              onPress={() => setOption('Ranking do grupo')}
              isSelected={optionSelected === 'Ranking do grupo'}
            />
          </HStack>
        </VStack>
      ) : (
        <EmptyMyPoolList code={poolDetails.code} />
      )}
    </VStack>
  )
}
