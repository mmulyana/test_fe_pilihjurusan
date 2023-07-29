import { useEffect, useState } from 'react'
import './App.css'
import Form from './component/Form'

import im_line from '/public/icon/line.svg'
import im_hero1 from '/public/icon/hero-1.svg'
import im_hero2 from '/public/icon/hero-2.svg'
import im_logo from '/public/icon/logo.svg'
import Dashboard from './component/Dashboard'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [token, setToken] = useState('')
  useEffect(() => {
    const local = localStorage.getItem('TOKEN')
    if (local) {
      setToken(local)
      setIsAuthenticated(true)
    }
  }, [])
  return (
    <>
      <img src={im_logo} className='absolute top-[54px] left-[100px]' />
      <img
        src={im_hero1}
        className='absolute right-0 bottom-[10px] translate-y-0'
      />
      <img
        src={im_hero2}
        className='absolute left-0 bottom-[10px] translate-y-0'
      />
      <img
        src={im_line}
        className='absolute left-1/2 -translate-x-1/2 bottom-6 w-full translate-y-0 -z-10'
      />
      <div className='max-w-[508px] absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2'>
        {isAuthenticated ? (
          <Dashboard token={token} />
        ) : (
          <Form setToken={setToken} setIsAuthenticated={setIsAuthenticated} />
        )}
      </div>
    </>
  )
}

export default App
