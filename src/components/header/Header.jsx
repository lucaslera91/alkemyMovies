import React from 'react'
import { Link, NavLink} from 'react-router-dom'
import Buscador from '../buscador/Buscador'
import '../header/header.css'

function Header({favoritos}) {
  return (
    <header>
        <nav className='firsNav p-2'>
            <ul className="nav col-12 ">
                <li className="nav-link col-2 my-auto col-sm-2">
                  Alkemy
                </li>
                <li className="nav-link col-3 my-auto col-sm-2">
                    <NavLink className='text-decoration-none' to='/'>
                        Home
                    </NavLink>
                </li>
                <li className="nav-link col-3 my-auto col-sm-2">
                    <Link className='text-decoration-none' to='/listado'>
                        Listado
                    </Link>
                </li>
                <li className="nav-link col-4 col-sm-3">
                    <Link className='text-decoration-none ' to='/favoritos'>
                        <p className='col-12 my-auto'>Favoritos ({favoritos.length})</p>
                    </Link>
                </li>
                <li className="col-12 col-sm-3 px-4">
                    <Buscador></Buscador>
                </li>
               
            </ul>
            
            </nav>
            
        
    </header>
    )
}

export default Header