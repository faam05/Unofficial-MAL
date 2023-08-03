import { Autocomplete, Burger, Button, Flex, Group, Image, Modal, Paper, Text, Transition, createStyles, useMantineTheme } from '@mantine/core'
import { IconSearch } from '@tabler/icons'
import React, { forwardRef, useEffect, useState } from 'react'
import useDebounce from '../../../hooks/useDebounce'
import axios from 'axios'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import { useDisclosure } from '@mantine/hooks'

const HEADER_HEIGHT = 56
// const [page, setPage] = useState(window.location.pathname)

const links = [
  { link: '/', label: 'Home' },
  { link: '/about', label: 'About' },
]

const useStyles = createStyles((theme) => ({
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

  link: {
    display: 'block',
    lineHeight: 1,
    padding: '8px 30px',
    borderRadius: theme.radius.xs,
    textDecoration: 'none',
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7],
    fontSize: theme.fontSizes.sm,
    fontWeight: 700,

    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
    },
  },
}))

function MobileSearch() {
  const theme = useMantineTheme()
  const { classes, cx } = useStyles()
  const location = useLocation()

  const items = links.map((link) => (
    <NavLink
      key={link.label}
      className={cx(classes.link)}
      style={{ textDecoration: 'none', backgroundColor: location.pathname == link.link ? theme.colors.gray[2] : 'transparent' }}
      onClick={(event) => {
        event.preventDefault()
        navigate(`${link.link}`)
        close()
      }}>
      {link.label}
    </NavLink>
  ))

  const AutoCompleteItem = forwardRef(({ description, value, image, ...others }, ref) => (
    <>
      <div ref={ref} {...others}>
        <Group noWrap>
          <Image width={60} height={70} src={image} />
          <div>
            <Text size={'xs'}>{value}</Text>
            <Text size='xs' c='dimmed'>
              {description}
            </Text>
          </div>
        </Group>
      </div>
    </>
  ))

  const navigate = useNavigate()

  const [searchTerm, setSearchTerm] = useState('')
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)

  const debouncedSearchTerm = useDebounce(searchTerm, 500)

  //   Modal
  const [opened, { toggle, close }] = useDisclosure(false)
  const [openedModal, setOpenedModal] = useState(false)

  useEffect(() => {
    setLoading(true)
    if (debouncedSearchTerm) {
      const fetchResults = async () => {
        await axios(`https://api.jikan.moe/v4/anime?q=${debouncedSearchTerm}`).then((res) => {
          setResults(
            res.data.data.map((item) => ({
              value: item.title,
              description: `(${item.type}, ${item.year})`,
              id: item.mal_id,
              image: item.images.jpg.small_image_url,
            }))
          )
        })
        setLoading(false)
      }
      fetchResults()
    }
    setLoading(false)
  }, [debouncedSearchTerm])

  return (
    <>
      <NavLink
        style={{ textDecoration: 'none' }}
        onClick={(event) => {
          event.preventDefault()
          navigate(`/`)
        }}>
        MAL
      </NavLink>
      <Button onClick={() => setOpenedModal(true)} ml={'auto'} className={''}>
        <IconSearch />
      </Button>
      <Modal withCloseButton={false} opened={openedModal} onClose={() => setOpenedModal(false)} size='100%'>
        <Autocomplete
          className={classes.search}
          dropdownComponent={({ children, ...others }) => <div style={{ width: '100%', maxHeight: 300, overflow: 'auto' }}>{children}</div>}
          nothingFound={debouncedSearchTerm ? (loading ? 'Loading...' : 'No results found') : 'Type to search'}
          value={searchTerm}
          limit={30}
          itemComponent={AutoCompleteItem}
          placeholder={'Search'}
          onChange={(e) => setSearchTerm(e)}
          icon={<IconSearch size={16} stroke={1.5} />}
          data={results}
          onItemSubmit={(item) => {
            setSearchTerm('')
            navigate(`/detail/${item.id}`)
          }}
        />
      </Modal>
      <Burger opened={opened} onClick={toggle} size='sm' color={theme.colors.gray[6]} />
      <Transition transition='pop-top-right' duration={200} mounted={opened}>
        {(styles) => (
          <Paper className={classes.dropdown} withBorder style={styles}>
            {items}
          </Paper>
        )}
      </Transition>
    </>
  )
}

export default MobileSearch
