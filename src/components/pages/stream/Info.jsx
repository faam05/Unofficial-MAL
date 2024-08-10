import React from 'react'
import Info from '../../layouts/Stream/Info'

const InfoPage = ({ data, isLoading, isError }) => {
  return <Info data={data} isLoading={isLoading} isError={isError} />
}

export default InfoPage
