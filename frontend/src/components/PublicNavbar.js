import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { SidebarDataPublic } from './SidebarDataPublic';
import '../style/Navbar.css';
import { IconContext } from 'react-icons';

function PublicNavbar() {
    const [sidebar, setSidebar] = useState(false)

    const showSidebar = () => { setSidebar(!sidebar) }
    return (
        <>
            <IconContext.Provider value={{ color: '#fff' }}>
                <div className='navbar'>
                    <Link to='#' className='menu-bars'>
                        <FaIcons.FaBars onClick={showSidebar} />
                    </Link>
                </div>
                <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>

                    <ul className='nav-menu-items' onClick={showSidebar}>
                        <div className="list-group list-group-flush overflow-auto vh-100">
                            <li className='navbar-toggle'>
                                <Link to='#' className='menu-bars'>
                                    <AiIcons.AiOutlineClose />
                                </Link>
                            </li>
                            {SidebarDataPublic.map((item, index) => {
                                return (
                                    <li key={index} className={item.className}>
                                        <Link to={item.path}>
                                            {item.icon}
                                            <span>{item.title}</span>
                                        </Link>
                                    </li>
                                );
                            })}
                        </div>
                    </ul>

                </nav>

            </IconContext.Provider>
        </>
    )
}

export default PublicNavbar;