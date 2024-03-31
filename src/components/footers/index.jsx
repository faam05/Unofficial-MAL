import { Text } from '@mantine/core'

const Footers = () => {
  return (
    <Text align='center'>
      <span>
        Made with <span style={{ color: '#e25555' }}>&hearts;</span> by{' '}
        <a target='_blank' href='https://github.com/faam05' style={{ textDecoration: 'none' }}>
          faam05
        </a>
      </span>
    </Text>
  )
}

export default Footers
