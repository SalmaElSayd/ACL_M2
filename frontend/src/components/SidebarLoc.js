import React from 'react'
import * as BiIcons from 'react-icons/bi'; 
import * as AiIcons from 'react-icons/ai'; 
import * as IoIcons from 'react-icons/io'; 
import * as MdIcons from 'react-icons/md'; 
import * as FaIcons from 'react-icons/fa'; 
import * as GoIcons from 'react-icons/go'; 
import * as GiIcons from 'react-icons/gi'; 


export const SidebarLoc = [
    
    {
        title: 'Add Location',
        path: '/addlocation',
        icon: <FaIcons.FaLocationArrow/>,
        className: 'nav-text'
    },
    {
        title: 'Update Location',
        path: '/updatelocation',
        icon: <MdIcons.MdUpdate />,
        className: 'nav-text'
    },
    {
        title: 'delete location',
        path: '/deletelocation',
        icon: <IoIcons.IoMdRemove />,
        className: 'nav-text'
    }]