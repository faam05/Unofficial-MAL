import { useState } from 'react'
import { AppShell, Burger, Button, Container, Group, Modal, Text, UnstyledButton } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { NavLink, useNavigate } from 'react-router-dom'
import { IconHome, IconNews, IconSearch } from '@tabler/icons-react'
import ScrollButton from '../../ScrollButton'
import { useMobileDevice } from '../../../hooks/useMobileDevice'
import Footer from '../../footer'
import CSearch from '../../Search'
import classes from './MobileNavbar.module.css'

export function Layout({ children }) {
  const [opened, { toggle }] = useDisclosure()
  const navigate = useNavigate()
  const mobile = useMobileDevice()
  const [openedModal, setOpenedModal] = useState(false)

  const navbarMobile = [
    { link: '/', label: 'Home', icon: <IconHome /> },
    { link: '/coming-soon', label: 'Coming Soon', icon: <IconNews stroke={2} /> },
  ]

  return (
    <AppShell
      header={{ height: 50 }}
      footer={{ height: 35 }}
      navbar={{ width: 300, breakpoint: 'sm', collapsed: { desktop: true, mobile: !opened } }}
      padding='xs'
      className='min-h-screen w-full overflow-x-hidden'>
      <AppShell.Header>
        <Container h={'100%'} size={!mobile && 1060}>
          <Group h='100%'>
            <Group justify='space-between' className='flex-1'>
              <NavLink to='/' style={{ textDecoration: 'none' }} className='font-bold'>
                MyAnimeList
              </NavLink>
              <Group ml='xl' gap={0} visibleFrom='sm'>
                <Button
                  variant={location.pathname !== '/' ? 'subtle' : 'filled'}
                  className='mr-[10px]'
                  style={{
                    background: location.pathname === '/' ? '#0000FF' : 'transparent',
                  }}
                  onClick={() => navigate('/')}>
                  <Text>Home</Text>
                </Button>
                <CSearch />
              </Group>
            </Group>
            {mobile && (
              <>
                <Button onClick={() => setOpenedModal(true)} ml={'auto'} className={''}>
                  <IconSearch />
                </Button>
                <Modal withCloseButton={false} opened={openedModal} onClose={() => setOpenedModal(!openedModal)} size='100%'>
                  <CSearch
                    buttonStyle={{ padding: 5 }}
                    setOpenedModal={setOpenedModal}
                    openedModal={openedModal}
                    dropdownStyle={{
                      display: 'flex',
                      flexDirection: 'column',
                      overflowY: 'auto',
                      overflowX: 'hidden',
                      width: '100%',
                      maxHeight: 350,
                    }}
                  />
                </Modal>
              </>
            )}
            <Burger opened={opened} onClick={toggle} hiddenFrom='sm' size='sm' />
          </Group>
        </Container>
      </AppShell.Header>

      <AppShell.Navbar py='md' px={4} style={{}}>
        {navbarMobile.map((link) => (
          <UnstyledButton
            key={link.label}
            className={classes.control}
            onClick={() => {
              navigate(link.link)
              toggle()
            }}>
            <div className='flex items-center justify-end'>
              {link.icon} {link.label}
            </div>
          </UnstyledButton>
        ))}
      </AppShell.Navbar>

      <AppShell.Main>
        <Container h={'100%'} size={!mobile && 1060}>
          {children}
          <ScrollButton />
        </Container>
      </AppShell.Main>

      <AppShell.Footer p='xs' className='flex items-center justify-center'>
        <Footer />
      </AppShell.Footer>
    </AppShell>
  )
}
