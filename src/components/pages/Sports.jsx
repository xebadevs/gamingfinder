import React from 'react'
import Navbar from '../Navbar/Navbar'
import ShowGames from '../handlers/ShowGames'

export default function Sports() {
  return (
    <div>
        <Navbar />
        <ShowGames endpoint='filter' tag='sports' title='SPORTS' />
    </div>
  )
}