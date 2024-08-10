import React from 'react'
import Home from '../../layouts/Stream/Home'

const StreamPage = ({ data, isLoading, isError }) => {
  return <Home data={data} isLoading={isLoading} isError={isError} />
}

export default StreamPage
