import React from 'react'
import Logo from './Logo'
import Menu from './Menu'

const NavbarConatiner = () => {
  return (
    <header className='bg-slate-700 h-[70px] w-[100%] shadow-md z-10 sticky top-0'>
      <article className='w-[95%] m-auto h-[100%] flex items-center justify-between'>
        <Logo/>
        <Menu/>
      </article>
    </header>
  )
}

export default NavbarConatiner
