import { Flex, Image, SimpleGrid, Text } from '@mantine/core'
import Skeleton from 'react-loading-skeleton'
import { NavLink, useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { fetcher } from '../utils'

const Staff = () => {
  const { id } = useParams()

  const { data, isLoading, isError } = useQuery({
    queryKey: ['staff', id],
    queryFn: () => fetcher(`https://api.jikan.moe/v4/anime/${id}/staff`),
    // retry: 10,
  })

  return (
    <>
      {!isLoading && !isError ? (
        <>
          {data.map((item, index) => {
            return (
              <div key={index} style={{ backgroundColor: index % 2 == 0 ? 'white' : '#f8f8f8' }}>
                <Flex p='5px 0' maw='max-content'>
                  <NavLink to={item.person.url} style={{ textDecoration: 'none' }}>
                    <Image imageProps={{ loading: 'lazy' }} width={42} height={62} src={item.person.images.jpg.image_url} />
                  </NavLink>
                  <div style={{ padding: '0 4px' }}>
                    <NavLink to={item.person.url} style={{ textDecoration: 'none' }}>
                      <Text fz={12}>{item.person.name}</Text>
                    </NavLink>
                    <div style={{ padding: '3px 0' }}>
                      {item.positions.map((items, index) => (
                        <small key={index} style={{ fontSize: 'x-small' }}>
                          {items}
                          {item.positions.length != index + 1 ? ', ' : ''}
                        </small>
                      ))}
                    </div>
                  </div>
                </Flex>
              </div>
            )
          })}
        </>
      ) : (
        Array(10)
          .fill()
          .map((item, index) => {
            return (
              <SimpleGrid cols={1} key={index} p={'5px 0'} bg={index % 2 == 0 ? 'white' : '#f8f8f8'}>
                <div>
                  <Flex>
                    <Skeleton height={62} width={42} />
                    <div style={{ padding: '0 4px' }}>
                      <Text fz={12}>
                        <Skeleton width={100} />
                      </Text>
                      <div style={{ padding: '3px 0' }}>
                        <small style={{ fontSize: 'x-small' }}>
                          <Skeleton width={60} />
                        </small>
                      </div>
                    </div>
                  </Flex>
                </div>
              </SimpleGrid>
            )
          })
      )}
    </>
  )
}

export default Staff
