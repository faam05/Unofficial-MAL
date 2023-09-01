import { useState } from 'react'
import { AppShell, Navbar, Header, Footer, Aside, Text, MediaQuery, Burger, useMantineTheme, Container } from '@mantine/core'
import { useMediaQuery } from '@mantine/hooks'

export default function Layout3({ children }) {
  const theme = useMantineTheme()
  const [opened, setOpened] = useState(false)

  const matches = useMediaQuery('(min-width: 768px)')
  return (
    <AppShell
      styles={{
        main: {
          background: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
        },
      }}
      footer={
        <Footer height={60} p='md'>
          Application footers
        </Footer>
      }
      header={
        <Header height={{ base: 50, md: 70 }} p='md'>
          <div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
            <MediaQuery largerThan='sm' styles={{ display: 'none' }}>
              <Burger opened={opened} onClick={() => setOpened((o) => !o)} size='sm' color={theme.colors.gray[6]} mr='xl' />
            </MediaQuery>

            <Text>Application header</Text>
          </div>
        </Header>
      }>
      {/* <Text>Resize app to see responsive navbar in action</Text> */}
      {matches ? <Container size={'lg'}>{children}</Container> : children}
      {/* {children} */}
    </AppShell>
  )
}
