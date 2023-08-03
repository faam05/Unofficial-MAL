import { AppShell, useMantineTheme, Container, createStyles, Navbar, Header, MediaQuery, Burger, Text } from '@mantine/core'
import CustomHeader from '../headers/header'
import CustomHeader2 from '../headers/header2'
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
  return (
    <AppShell footer={<Footers />} header={<CustomHeader2 />}>
      <Container size={1060}>{children}</Container>
    </AppShell>
  )
}
