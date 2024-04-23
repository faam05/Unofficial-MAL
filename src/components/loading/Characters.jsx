import { Flex, SimpleGrid } from '@mantine/core'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const CharactersLoading = ({ bg }) => {
  return (
    <SimpleGrid cols={2} p={'5px 0'} bg={bg}>
      <Flex>
        <Skeleton height={200} width={120} />
        <div className='ml-[10px]'>
          <Skeleton count={2} width={50} />
          <Skeleton width={100} />
        </div>
      </Flex>
      <div className='ml-auto'>
        <Flex ta='right' ml={'auto'} justify={'right'}>
          <div style={{ padding: '0 4px' }}>
            <Skeleton count={2} width={100} />
          </div>
          <Skeleton height={62} width={42} />
        </Flex>
      </div>
    </SimpleGrid>
  )
}

export default CharactersLoading
