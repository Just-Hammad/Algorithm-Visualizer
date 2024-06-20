import { useState } from 'react'
import Menu from './components/menu/menu'
import LetterGrid from './components/lettergrid/LetterGrid'
import './App.css'

function App() {

  return (
    <>
      <LetterGrid rows={4} cols={ 15} interval={200} />
      <div className='heading'>
        Algorithm Visualizer
      </div>
      <div className='footer'>
        Just_Hammad &copy; 2024
      </div>
      <Menu />
    </>
  )
}

export default App
