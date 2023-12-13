import { Autocomplete, Burger, Button, Group, Image, Modal, Paper, Text, Transition, createStyles, useMantineTheme } from '@mantine/core'
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
          <Image width={60} src={image} imageProps={{ loading: 'lazy' }} />
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
        try {
          const response = await axios(`https://api.jikan.moe/v4/anime?q=${searchTerm}`)
          var date = new Date(response.data.data[0].aired.from)
          setResults(
            response.data.data.map((item) => ({
              group: item.genres.length > 0 ? item.genres[0].type : 'Unknown',
              value: item.title,
              description: item.year
                ? item.type !== null
                  ? `(${item.type}, ${item.year})`
                  : `(${item.year})`
                : item.type !== null
                ? `(${item.type}, ${date.getFullYear()})`
                : `${date.getFullYear()}`,
              id: item.mal_id,
              image: item.images.jpg.image_url,
            }))
          )
          setLoading(false)
        } catch (error) {
          console.error('Error during search:', error)
          setLoading(false)
        }
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
      <Modal withCloseButton={false} opened={openedModal} onClose={() => setOpenedModal(!openedModal)} size='100%'>
        <Autocomplete
          className={classes.search}
          dropdownComponent={({ children, ...others }) => <div style={{ width: '100%', maxHeight: 300, overflow: 'auto' }}>{children}</div>}
          nothingFound={debouncedSearchTerm ? (loading ? 'Loading...' : 'No results found') : 'Type to search'}
          value={searchTerm}
          limit={30}
          itemComponent={AutoCompleteItem}
          placeholder={'Search'}
          onChange={(e) => {
            if (e != '') {
              setSearchTerm(e)
            } else {
              setResults([])
              setSearchTerm(e)
            }
          }}
          icon={<IconSearch size={16} stroke={1.5} />}
          data={results}
          onItemSubmit={(item) => {
            setSearchTerm('')
            setResults([])
            navigate(`/detail/${item.id}`)
            setOpenedModal(!openedModal)
          }}
        />
      </Modal>
      <Burger opened={opened} onClick={toggle} size='sm' color={theme.colors.gray[6]} />
      <Transition transition='pop-top-right' duration={200} mounted={opened}>
        {(styles) => (
          <Paper className={classes.dropdown} withBorder style={{ ...styles, display: 'block' }}>
            {items}
          </Paper>
        )}
      </Transition>
    </>
  )
}

export default MobileSearch
