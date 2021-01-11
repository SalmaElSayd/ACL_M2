import React from 'react'
import * as BiIcons from 'react-icons/bi'; 
import * as AiIcons from 'react-icons/ai'; 
import * as IoIcons from 'react-icons/io'; 
import * as MdIcons from 'react-icons/md'; 
import * as FaIcons from 'react-icons/fa'; 
import * as GoIcons from 'react-icons/go'; 
import * as GiIcons from 'react-icons/gi'; 



export const SidebarHrc = [
    {
        title: 'Home',
        path: '/home',
        icon: <AiIcons.AiFillHome />,
        className: 'nav-text'
    },
     
    {  
        title: 'Location',
        path: '/location',
        icon: <FaIcons.FaLocationArrow/>,
        className: 'nav-text'
    },
    {
        title: 'edit staff',
        path: '/editStaffHr',
        icon: <AiIcons.AiOutlineUserSwitch />,
        className: 'nav-text'
    },
    {
        title: 'faculty',
        path: '/faculty',
        icon: <FaIcons.FaBuilding />,
        className: 'nav-text'
    },
    {
        title: 'edit Department',
        path: '/department',
        icon: <FaIcons.FaRegBuilding />,
        className: 'nav-text'
    },
    {
        title: 'edit course',
        path: '/course',
        icon: <FaIcons.FaDiscourse />,
        className: 'nav-text'
    },
    {
        title: 'addmissing SignIn',
        path: '/addmissingSignIn',
        icon: <GoIcons.GoSignIn />,
        className: 'nav-text'
    },
    {
        title: 'addmissing SignOut',
        path: 'addmissingSignOut',
        icon: <GoIcons.GoSignOut />,
        className: 'nav-text'
    },
    {
        title: 'viewa ttendance Rec.',
        path: '/viewattendanceRec',
        icon: <BiIcons.BiSpreadsheet/>,
        className: 'nav-text'
    },
    {
        title: 'updateSalary',
        path: '/updateSalary',
        icon: <GiIcons.GiReceiveMoney />,
        className: 'nav-text'
    },
    {
        title: 'missing hours',
        path: '/viewStaffmemberMissinghours',
        icon: <GiIcons.GiEmptyHourglass/>,
        className: 'nav-text'
    },
    {
        title: 'missing days',
        path: '/viewStaffmemberMissingdays',
        icon: <FaIcons.FaCalendarDay/>,
        className: 'nav-text'
    }
]