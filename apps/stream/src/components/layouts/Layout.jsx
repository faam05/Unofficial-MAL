import { AppShell, Burger, Button, Container, Flex, Group, Menu, Modal, rem } from '@mantine/core'
import { IconHome, IconListDetails, IconSearch, IconVideo } from '@tabler/icons-react'
import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'

import { useMobileDevice } from '@shared'
import { WEB_TITLE } from '../../configs'

import Footer from './Footer'
import ScrollButton from './ScrollButton'
import CSearch from './Search'

const REDIRECT_URL = import.meta.env.VITE_ANIME_URL

export function Layout({ children }) {
  const mobile = useMobileDevice()

  const [opened, setOpened] = useState(false)
  const [openedModal, setOpenedModal] = useState(false)

  return (
    <AppShell header={{ height: 50 }} footer={{ height: 35 }} padding='xs' className='min-h-dvh w-full overflow-x-hidden'>
      <AppShell.Header>
        <Container h={'100%'} size={!mobile && 1060} p={mobile && 0}>
          <Group h='100%'>
            <Group justify='space-between' className={`flex-1 ${mobile && 'px-2'}`}>
              <NavLink to={'/'} style={{ textDecoration: 'none' }} className='font-nunito text-xl font-bold'>
                <Flex align='center' gap={2}>
                  <IconVideo style={{ width: rem(25), height: rem(25) }} className='rotate-180 text-red-500' />
                  <p>{WEB_TITLE}</p>
                </Flex>
              </NavLink>
              <Group ml='xl' gap={0}>
                {mobile && (
                  <>
                    <Button onClick={() => setOpenedModal(true)} ml={'auto'} color={'red'}>
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
                <Menu shadow='md' width={200} mr={!mobile && 4} onChange={setOpened}>
                  <Menu.Target>
                    {mobile ? (
                      <Burger opened={opened} onClick={() => setOpened(!opened)} hiddenFrom='sm' size='sm' />
                    ) : (
                      <Button color={'red'}>Menu</Button>
                    )}
                  </Menu.Target>

                  <Menu.Dropdown>
                    <Menu.Label>Main Menu</Menu.Label>
                    <Link to={'/'}>
                      <Menu.Item leftSection={<IconHome style={{ width: rem(14), height: rem(14) }} />}>Home</Menu.Item>
                    </Link>
                    <Menu.Divider />

                    <Menu.Label>{'Want to see anime details?'}</Menu.Label>
                    <Link to={REDIRECT_URL}>
                      <Menu.Item leftSection={<IconListDetails style={{ width: rem(14), height: rem(14) }} />}>Go to Anime Page</Menu.Item>
                    </Link>
                  </Menu.Dropdown>
                </Menu>
                <Group visibleFrom='sm'>
                  <CSearch />
                </Group>
              </Group>
            </Group>
          </Group>
        </Container>
      </AppShell.Header>

      <AppShell.Main>
        <Container h={'100%'} size={!mobile && 1060} p={mobile && 0}>
          {children}
          <ScrollButton type={'stream'} />
        </Container>
      </AppShell.Main>

      <AppShell.Footer p='xs' className='flex items-center justify-center'>
        <Footer />
      </AppShell.Footer>
    </AppShell>
  )
}
