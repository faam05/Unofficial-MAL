import { Footer, Text } from '@mantine/core'

const Footers = () => {
  return (
    <Footer height={60} p='md'>
      <Text align='center'>
        Made with <span style={{ color: '#e25555' }}>&hearts;</span> by{' '}
        <a target='_blank' href='https://github.com/faam05' style={{ textDecoration: 'none' }}>
          faam05
        </a>
      </Text>
    </Footer>
  )
}

export default Footers
