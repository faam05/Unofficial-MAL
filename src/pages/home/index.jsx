import React from 'react'
import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <>
      <Link to={'/about'} style={{ marginBottom: '10px', padding: '10px' }}>
        About
      </Link>
      <Link to={'/search'}>Search</Link>
      <div>Home</div>
    </>
  )
}
