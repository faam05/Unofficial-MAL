import React from 'react'

const ModalContext = React.createContext()

function ModalContext({ children }) {
  const [opened, setOpened] = useState(false)

  return <ModalContext.Provider value={{ opened, setOpened }}>{children}</ModalContext.Provider>
}

export default ModalContext
