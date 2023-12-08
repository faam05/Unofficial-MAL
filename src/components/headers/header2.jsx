import { Container, Header } from '@mantine/core'
import React from 'react'
import DesktopSearch from './Desktop/DesktopSearch'
import MobileSearch from './Mobile/MobileSearch'
import useMobileDevice from '../../hooks/useMobile'

export default function CustomHeader2() {
  const mobile = useMobileDevice()

  return (
    <Header height={{ base: 70, md: 70 }} p='md'>
      <Container
        size={1060}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        {mobile ? <MobileSearch /> : <DesktopSearch />}
      </Container>
    </Header>
  )
}
