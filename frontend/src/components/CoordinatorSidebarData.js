import React from 'react'
import * as TiIcons from 'react-icons/ti'; 
import * as AiIcons from 'react-icons/ai'; 
import * as IoIcons from 'react-icons/io'; 
import * as MdIcons from 'react-icons/md'; 

export const SidebarDataPublic = [
    {
        title: 'Home',
        path: '/home',
        icon: <AiIcons.AiFillHome />,
        className: 'nav-text'
    },
    {
        title: 'Sign in or out',
        path: '/signinout',
        icon: <AiIcons.AiOutlineUserAdd/>,
        className: 'nav-text'
    },
    {
        title: 'View My Attendance',
        path: '/viewAttendance',
        icon: <AiIcons.AiOutlineUserAdd/>,
        className: 'nav-text'
    },
    {
        title: 'Reset Password',
        path: '/resetPassword',
        icon: <AiIcons.AiOutlineUserAdd/>,
        className: 'nav-text'
    },
    {
        title: 'Update Profile',
        path: '/updateProfile',
        icon: <AiIcons.AiOutlineUserAdd/>,
        className: 'nav-text'
    },{
        title: 'Delete Course Slot',
        path: '/deleteSlot',
        icon: <MdIcons.MdSupervisorAccount />,
        className: 'nav-text'
    },
    {
        title: 'Upadte Course Slot',
        path: '/updateSlot',
        icon: <MdIcons.MdSupervisorAccount />,
        className: 'nav-text'
    },
    {
        title: 'Add Course Slot',
        path: '/addSlot',
        icon: <MdIcons.MdSupervisorAccount />,
        className: 'nav-text'
    }
]