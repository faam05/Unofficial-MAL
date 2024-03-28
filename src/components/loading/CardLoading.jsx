import { Badge, Card, Center, Flex, Rating, SimpleGrid, Text } from '@mantine/core'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { useMobileDevice } from '../../hooks/useMobileDevice'

const CardLoading = () => {
  const matches = useMobileDevice()
  return (
    <SimpleGrid cols={matches ? (window.innerWidth < 768 ? 1 : 2) : 2} style={{ marginTop: '10px' }}>
      {Array(10)
        .fill()
        .map((_, index) => {
          return (
            <Card key={index} shadow='sm' radius='md'>
              <SimpleGrid cols={2}>
                <div style={{ width: '100%' }}>
                  <Center>
                    <Flex direction={'column'}>
                      <Skeleton
                        height={!matches ? 250 : 150}
                        style={{
                          marginRight: 10,
                        }}
                      />
                      <Text ta={'center'} fz={'xs'}>
                        <Skeleton />
                      </Text>
                      <Flex justify={'space-evenly'}>
                        <Rating size={!matches ? 'md' : 'xs'} value={0} readOnly />
                        <Badge size={!matches ? 'md' : 'xs'}>
                          <Skeleton />
                        </Badge>
                      </Flex>
                      <Text ta={'center'}>
                        <Badge m='10px 1px' color={'gray'} size={!matches ? 'md' : 'xs'}>
                          <Skeleton width={50} />
                        </Badge>
                      </Text>
                    </Flex>
                  </Center>
                </div>
                <div>
                  <Text mt={!matches ? 10 : 0} fz={!matches ? 'md' : 'sm'}>
                    <Skeleton />
                  </Text>
                  <Skeleton />
                  <SimpleGrid cols={2} mt={10}>
                    {Array(4)
                      .fill()
                      .map((item, index) => (
                        <Badge key={index} size={!matches ? 'md' : 'xs'} color={'gray'}>
                          <Skeleton />
                        </Badge>
                      ))}
                  </SimpleGrid>
                  <Skeleton height={120} style={{ marginTop: 10 }} />
                </div>
              </SimpleGrid>
            </Card>
          )
        })}
    </SimpleGrid>
  )
}

export default CardLoading
