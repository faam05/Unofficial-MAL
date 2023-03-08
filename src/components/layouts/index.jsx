import { AppShell, useMantineTheme, Container, createStyles } from '@mantine/core'

import { useDisclosure, useMediaQuery } from '@mantine/hooks'
import { useNavigate } from 'react-router-dom'
import CustomHeader from '../headers/header'
import Footers from '../footers'
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

  const matches = useMediaQuery('(min-width: 800px)')

  return (
    <AppShell
      styles={{
        main: {
          background: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
        },
        width: '100%',
      }}
      footer={<Footers />}
      header={<CustomHeader />}>
      {matches ? <Container size={1060}>{children}</Container> : children}
    </AppShell>
  )
}
