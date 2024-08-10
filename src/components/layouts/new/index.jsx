import { AppShell, Burger, Button, Container, Flex, Group, Menu, Modal, rem, Text } from '@mantine/core'
import { IconHome, IconMessageCircle, IconSearch, IconVideo } from '@tabler/icons-react'
import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { useMobileDevice } from '../../../hooks/useMobileDevice'
import Footer from '../../footer'
import ScrollButton from '../../ScrollButton'
import CSearch from '../../Search'

export function Layout({ type, children }) {
  const [opened, setOpened] = useState(false)
  const mobile = useMobileDevice()
  const [openedModal, setOpenedModal] = useState(false)

  return (
    <AppShell header={{ height: 50 }} footer={{ height: 35 }} padding='xs' className='min-h-screen w-full overflow-x-hidden'>
      <AppShell.Header>
        <Container h={'100%'} size={!mobile && 1060}>
          <Group h='100%'>
            <Group justify='space-between' className='flex-1'>
              <NavLink to={type === 'stream' ? '/stream' : '/'} style={{ textDecoration: 'none' }} className='font-nunito text-xl font-bold'>
                {type == 'stream' ? (
                  <Flex align='center' gap={2}>
                    <IconVideo style={{ width: rem(25), height: rem(25) }} className='rotate-180 text-red-500' />
                    <p>Streaming</p>
                  </Flex>
                ) : (
                  <p>MyAnimeList</p>
                )}
              </NavLink>
              <Group ml='xl' gap={0}>
                {mobile && (
                  <>
                    <Button onClick={() => setOpenedModal(true)} ml={'auto'} className={''}>
                      <IconSearch />
                    </Button>
                    <Modal withCloseButton={false} opened={openedModal} onClose={() => setOpenedModal(!openedModal)} size='100%'>
                      <CSearch
                        type={type}
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
                <Menu shadow='md' width={200} mr={!mobile && 4} onChange={setOpened}>
                  <Menu.Target>
                    {mobile ? <Burger opened={opened} onClick={() => setOpened(!opened)} hiddenFrom='sm' size='sm' /> : <Button>Menu</Button>}
                  </Menu.Target>

                  <Menu.Dropdown>
                    <Menu.Label>Main Menu</Menu.Label>
                    <Link to={type === 'mal' ? '/' : '/stream'}>
                      <Menu.Item leftSection={<IconHome style={{ width: rem(14), height: rem(14) }} />}>Home</Menu.Item>
                    </Link>
                    {type === 'mal' && (
                      <Link to='/coming-soon' className='w-full'>
                        <Menu.Item leftSection={<IconMessageCircle style={{ width: rem(14), height: rem(14) }} />}>Coming Soon</Menu.Item>
                      </Link>
                    )}
                    <Menu.Divider />

                    <Menu.Label>{type === 'stream' ? 'Want to see anime details?' : 'Want to streaming video?'}</Menu.Label>
                    <Link to={type === 'stream' ? '/' : '/stream'}>
                      <Menu.Item leftSection={<IconVideo style={{ width: rem(14), height: rem(14) }} />}>
                        Go to {type === 'stream' ? 'Anime' : 'Stream'} Page
                      </Menu.Item>
                    </Link>
                  </Menu.Dropdown>
                </Menu>
                <Group visibleFrom='sm'>
                  <CSearch type={type} />
                </Group>
              </Group>
            </Group>
          </Group>
        </Container>
      </AppShell.Header>

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
