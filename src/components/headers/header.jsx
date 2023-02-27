import { useEffect, useRef, useState } from 'react'
import { createStyles, Header, Container, Group, Burger, Paper, Transition, Text, Autocomplete, Button } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { IconSearch } from '@tabler/icons'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

const HEADER_HEIGHT = 56

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

export default function CustomHeader() {
  const [opened, { toggle, close }] = useDisclosure(false)
  const links = [
    { link: '/', label: 'Home' },
    { link: '/about', label: 'About' },
  ]
  const [active, setActive] = useState(links[0].link)
  const { classes, cx } = useStyles()

  const [value, setValue] = useState('')
  const [search, setSearch] = useState([])
  const navigate = useNavigate()

  const onSearch = (e) => {
    e.preventDefault()
    navigate(`/search/${e.target[0].value}`)
    setActive('')
    setValue(`${e.target[0].value}`)
  }

  const [query, setQuery] = useState('')
  const [displayMessage, setDisplayMessage] = useState('')

  useEffect(() => {
    const timeOutId = setTimeout(() => setDisplayMessage(query), 500)
    // const getData = async () => {
    //   const { data } = await axios(`https://api.jikan.moe/v4/anime?q=${displayMessage}`)
    //   // console.log(data)
    //   // setSearch(data.data)
    // }
    // getData()
    // return () => clearTimeout(timeOutId)
  }, [query])

  const items = links.map((link) => (
    <a
      key={link.label}
      className={cx(classes.link, { [classes.linkActive]: active === link.link })}
      onClick={(event) => {
        event.preventDefault()
        setActive(link.link)
        navigate(`${link.link}`)
        close()
      }}>
      {link.label}
    </a>
  ))

  return (
    <Header height={HEADER_HEIGHT}>
      <Container size={1060} className={classes.header}>
        {/* <MantineLogo size={28} /> */}
        <Text>MAL</Text>
        <Group spacing={5} className={classes.links}>
          {items}
          <form onSubmit={onSearch}>
            <Autocomplete
              className={classes.search}
              placeholder='Search'
              onChange={(event) => setQuery(event)}
              icon={<IconSearch size={16} stroke={1.5} />}
              value={query}
              data={search}
            />
          </form>
        </Group>

        <Burger opened={opened} onClick={toggle} className={classes.burger} size='sm' />

        <Transition transition='pop-top-right' duration={200} mounted={opened}>
          {(styles) => (
            <Paper className={classes.dropdown} withBorder style={styles}>
              {items}
              <form style={{ marginTop: '1px' }} onSubmit={onSearch}>
                <Autocomplete className={classes.search} placeholder='Search' icon={<IconSearch size={16} stroke={1.5} />} data={[]} />
              </form>
            </Paper>
          )}
        </Transition>
      </Container>
    </Header>
  )
}
