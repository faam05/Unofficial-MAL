import { Text } from '@mantine/core'

const Footer = () => {
  return (
    <Text ta='center'>
      Made with <span className='text-red-600'>&hearts;</span> by{' '}
      <a target='_blank' href='https://github.com/faam05' style={{ textDecoration: 'none' }}>
        faam05
      </a>
    </Text>
  )
}

export default Footer
