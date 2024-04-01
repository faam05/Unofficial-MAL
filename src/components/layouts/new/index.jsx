import { AppShell, Burger, Button, Container, Group, Modal, Text, UnstyledButton } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import classes from './MobileNavbar.module.css'
import { useMobileDevice } from '../../../hooks/useMobileDevice'
import Footers from '../../footers'
import CSearch from '../../Search'
import { IconSearch } from '@tabler/icons-react'
import { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'

export function Layout({ children }) {
  const [opened, { toggle }] = useDisclosure()
  const navigate = useNavigate()
  const mobile = useMobileDevice()
  const [openedModal, setOpenedModal] = useState(false)

  const navbarMobile = [
    { link: '/', label: 'Home' },
    { link: '/coming-soon', label: 'Coming Soon' },
  ]

  return (
    <AppShell
      header={{ height: 60 }}
      footer={{ height: 60 }}
      navbar={{ width: 300, breakpoint: 'sm', collapsed: { desktop: true, mobile: !opened } }}
      padding='xs'
      style={{ minHeight: '100vh', width: '100%', overflowX: 'hidden' }}>
      <AppShell.Header>
        {/* <Container
          h={'100%'}
          size={!mobile && 1060}
          px='md'
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: mobile && 0,
          }}> */}
        <Group h='100%' px='md'>
          <Group justify='space-between' style={{ flex: 1 }}>
            <NavLink to='/' style={{ textDecoration: 'none' }}>
              MAL
            </NavLink>
            <Group ml='xl' gap={0} visibleFrom='sm'>
              {/* <UnstyledButton className={classes.control}>Home</UnstyledButton>
              <UnstyledButton className={classes.control}>Blog</UnstyledButton>
              <UnstyledButton className={classes.control}>Contacts</UnstyledButton>
              <UnstyledButton className={classes.control}>Support</UnstyledButton> */}
              <Button
                variant={location.pathname !== '/' ? 'subtle' : 'filled'}
                style={{
                  marginRight: 10,
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
        {/* </Container> */}
      </AppShell.Header>

      <AppShell.Navbar py='md' px={4}>
        {navbarMobile.map((link) => (
          <UnstyledButton key={link.label} className={classes.control}>
            <NavLink to={link.link} style={{ textDecoration: 'none' }} onClick={toggle}>
              {link.label}
            </NavLink>
          </UnstyledButton>
        ))}
        {/* <UnstyledButton className={classes.control}>Home</UnstyledButton>
        <UnstyledButton className={classes.control}>Blog</UnstyledButton>
        <UnstyledButton className={classes.control}>Contacts</UnstyledButton>
        <UnstyledButton className={classes.control}>Support</UnstyledButton> */}
      </AppShell.Navbar>

      <AppShell.Main>{children}</AppShell.Main>

      <AppShell.Footer p='md'>
        <Footers />
      </AppShell.Footer>
    </AppShell>
  )
}
