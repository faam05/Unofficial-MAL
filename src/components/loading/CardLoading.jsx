import { Badge, Card, Center, Flex, Rating, SimpleGrid, Text } from '@mantine/core'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { useMobileDevice } from '../../hooks/useMobileDevice'

const CardLoading = () => {
  const mobile = useMobileDevice()
  return (
    <>
      <SimpleGrid cols={mobile ? (window.innerWidth > 579 ? 2 : 1) : 2} className='mt-[10px]'>
        {Array(10)
          .fill()
          .map((_, index) => {
            return (
              <Card key={index} shadow='sm' radius='md'>
                <SimpleGrid cols={2}>
                  <div className='w-full'>
                    <Center>
                      <Flex direction={'column'}>
                        <Skeleton
                          height={!mobile ? 250 : 150}
                          style={{
                            marginRight: 10,
                          }}
                        />
                        <Text ta={'center'} fz={'xs'}>
                          <Skeleton />
                        </Text>
                        <Flex justify={'space-evenly'}>
                          <Rating size={!mobile ? 'md' : 'xs'} value={0} readOnly />
                          <Badge size={!mobile ? 'md' : 'xs'}>
                            <Skeleton />
                          </Badge>
                        </Flex>
                        <Center>
                          <Badge m='10px 1px' variant='light' color='gray' size={!mobile ? 'md' : 'xs'}>
                            <Skeleton width={50} />
                          </Badge>
                        </Center>
                      </Flex>
                    </Center>
                  </div>
                  <div>
                    <Text mt={!mobile ? 10 : 0} fz={!mobile ? 'md' : 'sm'}>
                      <Skeleton />
                    </Text>
                    <Skeleton />
                    <SimpleGrid cols={2} mt={10}>
                      {Array(4)
                        .fill()
                        .map((_, index) => (
                          <Badge key={index} size={!mobile ? 'md' : 'sm'} variant='light' color='gray'>
                            <Skeleton width={60} />
                          </Badge>
                        ))}
                    </SimpleGrid>
                    <Skeleton height={120} className='mt-[10px]' />
                  </div>
                </SimpleGrid>
              </Card>
            )
          })}
      </SimpleGrid>
    </>
  )
}

export default CardLoading
