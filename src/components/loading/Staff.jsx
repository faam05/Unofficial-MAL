import { Flex, SimpleGrid, Text } from '@mantine/core'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const StaffLoading = ({ bg }) => {
  return (
    <SimpleGrid cols={1} p={'5px 0'} bg={bg}>
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
}

export default StaffLoading
