import React from 'react'
import * as TiIcons from 'react-icons/ti'; 
import * as AiIcons from 'react-icons/ai'; 
import * as IoIcons from 'react-icons/io'; 
import * as MdIcons from 'react-icons/md'; 

export const InstructorSidebarData = [
    {
        title: 'Home',
        path: '/home',
        icon: <AiIcons.AiOutlineUser />,
        className: 'nav-text'
    },
    {
        title: 'Sign in or out',
        path: '/signinout',
        icon: <AiIcons.AiOutlineFieldTime/>,
        className: 'nav-text'
    },
    {
        title: 'View My Attendance',
        path: '/viewAttendance',
        icon: <AiIcons.AiFillDatabase/>,
        className: 'nav-text'
    },
    {
        title: 'Reset Password',
        path: '/resetPassword',
        icon: <AiIcons.AiOutlineKey/>,
        className: 'nav-text'
    },
    {
        title: 'Update Profile',
        path: '/updateProfile',
        icon: <AiIcons.AiOutlineUserAdd/>,
        className: 'nav-text'
    },
    {
        title:'Assign Coordinator',
        path:'/assignCoordinator',
        icon: <AiIcons.AiOutlineUserAdd/>,
        className: 'nav-text'
    },
    {
        title:'Assign Coordinator',
        path:'/assignCoordinator',
        icon: <AiIcons.AiOutlineUserAdd/>,
        className: 'nav-text'
    },
    {
        title:'Course Coverage',
        path:'/viewCoverageInstructor',
        icon: <AiIcons.AiOutlinePercentage/>,
        className: 'nav-text'
    },
    {
        title:'View Slots',
        path:'/viewSlots',
        icon: <AiIcons.AiFillSchedule />,
        className: 'nav-text'
    },
    {
        title: 'Staff In Department',
        path: '/viewStaffDepartment',
        icon: <IoIcons.IoMdPeople />,
        className: 'nav-text'
    },
    {
        title: 'Staff In Course',
        path: '/viewStaffCourse',
        icon: <IoIcons.IoMdPeople />,
        className: 'nav-text'
    },
    {
        title: 'Assign To Slot',
        path: '/assignToSlot',
        icon: <AiIcons.AiFillSchedule />,
        className: 'nav-text'
    },
    {
        title: 'Update Members Course',
        path: '/updateCourseMem',
        icon: <MdIcons.MdSupervisorAccount />,
        className: 'nav-text'
    },
    {
        title: 'Delete Members Course',
        path: '/deleteCourseMem',
        icon: <MdIcons.MdSupervisorAccount />,
        className: 'nav-text'
    },
    {
        title: 'Remove Members Course',
        path: '/removeCourseMem',
        icon: <MdIcons.MdSupervisorAccount />,
        className: 'nav-text'
    }
]