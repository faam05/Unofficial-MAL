import {
  AppShell,
  Navbar,
  Header,
  Footer,
  Aside,
  Text,
  MediaQuery,
  Burger,
  useMantineTheme,
  Flex,
  SimpleGrid,
  Grid,
  Input,
  Button,
  Container,
  Autocomplete,
  Group,
  createStyles,
  Center,
} from '@mantine/core'

import { useDisclosure, useMediaQuery } from '@mantine/hooks'
import { IconSearch } from '@tabler/icons'
import { useNavigate } from 'react-router-dom'
import CustomHeader from '../headers/header'

const useStyles = createStyles((theme) => ({
  header: {
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
    [theme.breakpoints.md]: {
      paddingLeft: theme.spacing.xl,
      paddingRight: theme.spacing.xl,
    },
  },

  inner: {
    height: 56,
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
  },

  links: {
    [theme.fn.smallerThan('md')]: {
      display: 'none',
    },
  },

  search: {
    [theme.fn.smallerThan('xs')]: {
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
  },
}))

export default function Layout({ children }) {
  const theme = useMantineTheme()
  const [opened, { toggle }] = useDisclosure(false)
  const { classes } = useStyles()

  const navigate = useNavigate()

  const onSearch = (e) => {
    e.preventDefault()
    navigate(`/search/${e.target[0].value}`)
  }

  const matches = useMediaQuery('(min-width: 800px)')

  return (
    <AppShell
      styles={{
        main: {
          background: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
        },
        width: '100%',
      }}
      footer={
        <Footer height={60} p='md'>
          <Text align='center'>
            Made with <span style={{ color: '#e25555' }}>&hearts;</span> by{' '}
            <a target='_blank' href='https://github.com/faam05'>
              rilSit
            </a>
          </Text>
        </Footer>
      }
      header={
        // <Header height={56} className={classes.header} mb={120}>
        //   <Container size='md' style={{ display: 'flex', alignItems: 'center', height: 56, justifyContent: 'space-between' }}>
        //     <Group spacing='xl' grow>
        //       <Text>MAL</Text>
        //     </Group>
        //     <Group spacing='xl'>
        //       <form onSubmit={onSearch}>
        //         <Autocomplete className={classes.search} placeholder='Search' icon={<IconSearch size={16} stroke={1.5} />} data={[]} />
        //       </form>
        //     </Group>
        //   </Container>
        // </Header>
        <CustomHeader />
      }>
      {matches ? <Container size={1060}>{children}</Container> : children}
    </AppShell>
  )
}
