import { useEffect, useState } from 'react'

import { useFetcher } from '@shared'

const { VITE_MAIN_SERVICE } = import.meta.env

export const useDetail = (id) => {
  // Desktop
  const [activeTab, setActiveTab] = useState('details')

  // mobile
  const [nowId, setNowId] = useState(id)
  const [accordionValue, setAccordionValue] = useState('characters')

  useEffect(() => {
    window.scrollTo(0, 0)
    if (nowId !== id) {
      window.scrollTo(0, 0)
      setNowId(id)
      setActiveTab('details')
      setAccordionValue('characters')
    }
  }, [id])

  // get details anime
  const { data, isLoading, isError } = useFetcher(`${VITE_MAIN_SERVICE}/anime/${id}/full`, ['details', id])
  useFetcher(`${VITE_MAIN_SERVICE}/anime/${id}/recommendations`, ['recommendations', id])

  return { data, isLoading, isError, activeTab, setActiveTab, accordionValue, setAccordionValue }
}
