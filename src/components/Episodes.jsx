import { Button, Card, ScrollArea, SimpleGrid, Text } from '@mantine/core'
import { useQuery } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import Skeleton from 'react-loading-skeleton'
import { useMobileDevice } from '../hooks/useMobileDevice'
import ErrorMessage from './ErrorMessage'
import 'react-loading-skeleton/dist/skeleton.css'
import 'react-lazy-load-image-component/src/effects/blur.css'

const Episodes = ({ id }) => {
  if (id) {
    const mobile = useMobileDevice()
    const navigate = useNavigate()
    const url = `${import.meta.env.DEV ? import.meta.env.VITE_LOCAL_URL : import.meta.env.VITE_PUBLIC_URL}/anime/gogoanime/info`
    const { data, isLoading, isError } = useQuery({
      queryKey: ['episodes', id[0]?.toLowerCase()],
      queryFn: async () =>
        await fetch(`${url}/${id[0]?.toLowerCase()}`).then(async (res) => {
          if (!res.ok)
            return await fetch(`${url}/${id[1]?.toLowerCase()}`).then(async (res) => {
              if (!res.ok) return await fetch(`${url}/${id[2]?.toLowerCase()}`).then(async (res) => res.json())
              else return res.json()
            })
          else return res.json()
        }),
    })

    if (isError) return <ErrorMessage message='Error when get Data. Please try again later' />

    return (
      <>
        {isLoading ? (
          <SimpleGrid cols={2}>
            <Skeleton count={3} height={100} />
            <Skeleton count={3} height={100} />
          </SimpleGrid>
        ) : (
          <>
            {data?.episodes?.length > 0 ? (
              <ScrollArea h={mobile ? 450 : 900}>
                <SimpleGrid cols={2} className=' '>
                  {data?.episodes?.map((item) => (
                    <div key={item.id} className='my-2'>
                      <Card>
                        <Card.Section>
                          <LazyLoadImage width='100%' className='h-[150px] object-cover' src={data.image} alt={id[0] + '_' + item.number} />
                        </Card.Section>
                        <Text size='sm' c='dimmed' my={4}>
                          Episode {item.number}
                        </Text>
                        <Button
                          onClick={() => {
                            navigate(`/watch/${item.id}`)
                          }}>
                          Watch {!mobile && 'Episode'}
                        </Button>
                      </Card>
                    </div>
                  ))}
                </SimpleGrid>
              </ScrollArea>
            ) : (
              <ErrorMessage message='Episodes Not Found' />
            )}
          </>
        )}
      </>
    )
  }
}

export default Episodes
