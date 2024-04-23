import { Button, Card, Image, SimpleGrid, Text } from '@mantine/core'
import { useNavigate } from 'react-router-dom'
import useFetcher from '../hooks/useFetcher'
import ErrorMessage from './ErrorMessage'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const Episodes = ({ id }) => {
  const navigate = useNavigate()
  const url = `${import.meta.env.DEV ? import.meta.env.VITE_LOCAL_URL : import.meta.env.VITE_PUBLIC_URL}/anime/gogoanime/info/${id}`
  const { data, isLoading, isError } = useFetcher(url, ['episodes', id], true)

  return (
    <>
      {isLoading ? (
        <SimpleGrid cols={2}>
          <Skeleton count={5} height={100} />
          <Skeleton count={5} height={100} />
        </SimpleGrid>
      ) : isError ? (
        <ErrorMessage message='Error when get Data. Please try again later' />
      ) : (
        <>
          {data?.episodes.length > 0 ? (
            <SimpleGrid cols={2}>
              {data?.episodes?.map((item) => (
                <div key={item.id} className='my-2'>
                  <Card>
                    <Card.Section>
                      <Image src={data.image} h={150} alt={id + '_' + data.number} />
                    </Card.Section>
                    <Text size='sm' c='dimmed' my={4}>
                      Episode {item.number}
                    </Text>
                    <Button
                      onClick={() => {
                        navigate(`/watch/${item.id}`)
                      }}>
                      Watch Episodes
                    </Button>
                  </Card>
                </div>
              ))}
            </SimpleGrid>
          ) : (
            <ErrorMessage message='Episodes Not Found' />
          )}
        </>
      )}
    </>
  )
}

export default Episodes
