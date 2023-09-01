import { Container, Header } from '@mantine/core'
import React from 'react'
import DesktopSearch from './Desktop/DesktopSearch'
import MobileSearch from './Mobile/MobileSearch'
import { useMediaQuery } from '@mantine/hooks'

export default function CustomHeader2() {
  const matches = useMediaQuery('(min-width: 768px)')

  return (
    <Header height={{ base: 70, md: 70 }} p='md'>
      <Container
        size={1060}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        {matches ? <DesktopSearch /> : <MobileSearch />}
      </Container>
    </Header>
  )
}
