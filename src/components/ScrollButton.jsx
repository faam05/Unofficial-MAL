import { useState } from 'react'
import { ActionIcon } from '@mantine/core'
import { IconArrowUp } from '@tabler/icons-react'

const ScrollButton = () => {
  const [visible, setVisible] = useState(false)

  const toggleVisible = () => {
    const scrolled = document.documentElement.scrollTop
    if (scrolled > 100) {
      setVisible(true)
    } else if (scrolled <= 100) {
      setVisible(false)
    }
  }

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
      /* you can also use 'auto' behaviour 
		in place of 'smooth' */
    })
  }

  window.addEventListener('scroll', toggleVisible)

  return (
    <ActionIcon
      variant='transparent'
      aria-label='Button_Up'
      pos='fixed'
      right={0}
      bottom='40px'
      c='red'
      style={{
        display: visible ? 'inline' : 'none',
        zIndex: 1,
      }}
      onClick={scrollToTop}>
      <IconArrowUp className='animate-bounce' />
    </ActionIcon>
  )
}

export default ScrollButton
