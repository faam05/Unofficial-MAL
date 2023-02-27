import { Autocomplete, Burger, Container, createStyles, Group, Header, Text } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import React, { useState } from 'react'

const HEADER_HEIGHT = 60

const useStyles = createStyles((theme) => ({
  root: {
    position: 'relative',
    zIndex: 1,
  },

  dropdown: {
    position: 'absolute',
    top: HEADER_HEIGHT,
    left: 0,
    right: 0,
    zIndex: 0,
    borderTopRightRadius: 0,
    borderTopLeftRadius: 0,
    borderTopWidth: 0,
    overflow: 'hidden',

    [theme.fn.largerThan('sm')]: {
      display: 'none',
    },
  },

  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '100%',
  },

  links: {
    [theme.fn.smallerThan('sm')]: {
      display: 'none',
    },
  },

  burger: {
    [theme.fn.largerThan('sm')]: {
      display: 'none',
    },
  },

  link: {
    display: 'block',
    lineHeight: 1,
    padding: '8px 12px',
    borderRadius: theme.radius.sm,
    textDecoration: 'none',
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7],
    fontSize: theme.fontSizes.sm,
    fontWeight: 500,

    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
    },

    [theme.fn.smallerThan('sm')]: {
      borderRadius: 0,
      padding: theme.spacing.md,
    },
  },

  linkActive: {
    '&, &:hover': {
      backgroundColor: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).background,
      color: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).color,
    },
  },
}))

export default function Header1() {
  const [opened, { toggle, close }] = useDisclosure(false)
  const [active, setActive] = useState(links[0].link)
  const { classes, cx } = useStyles()

  return (
    <Header height={56} className={classes.header} mb={120}>
      <Container size='md' style={{ display: 'flex', alignItems: 'center', height: 56, justifyContent: 'space-between' }}>
        <Group spacing='xl' grow>
          <Text>MAL</Text>
        </Group>
        <Burger opened={opened} onClick={toggle} className={classes.burger} size='sm' />
        <Group spacing='xl'>
          <form onSubmit={onSearch}>
            <Autocomplete className={classes.search} placeholder='Search' icon={<IconSearch size={16} stroke={1.5} />} data={[]} />
          </form>
        </Group>
      </Container>
      {/* <div className={classes.inner}>
            <Group>
              <Burger opened={opened} onClick={toggle} size='sm' />
            </Group>
            <Group spacing='xl' grow>
              <Text>Unofficial My Anime List</Text>
            </Group>

            <Group spacing='xl'>
              <form onSubmit={onSearch}>
                <Autocomplete
                  className={classes.search}
                  placeholder='Search'
                  icon={<IconSearch size={16} stroke={1.5} />}
                  data={['React', 'Angular', 'Vue', 'Next.js', 'Riot.js', 'Svelte', 'Blitz.js']}
                />
              </form>
            </Group>
          </div> */}
    </Header>
  )
}
