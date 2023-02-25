import React from 'react'
import { Link } from 'react-router-dom'

export default function About() {
  return (
    <>
      <div>About</div>
      <Link to={'/'}>Home</Link>
      <Link to={'/search'}>Search</Link>
    </>
  )
}
