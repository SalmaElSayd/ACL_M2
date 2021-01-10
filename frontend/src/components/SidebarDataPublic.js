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
    },
    {
        title: 'Update Instructor',
        path: '/updateCourseInstructor',
        icon: <AiIcons.AiOutlineUserSwitch />,
        className: 'nav-text'
    },
    {
        title: 'Delete Instructor',
        path: '/deleteCourseInstructor',
        icon: <AiIcons.AiOutlineUserDelete />,
        className: 'nav-text'
    },
    {
        title: 'Staff',
        path: '/viewStaff',
        icon: <IoIcons.IoMdPeople />,
        className: 'nav-text'
    },
    {
        title: 'Requests',
        path: '/viewRequests',
        icon: <IoIcons.IoMdChatboxes />,
        className: 'nav-text'
    },
    {
        title: 'Accept Request',
        path: '/acceptRequest',
        icon: <TiIcons.TiTickOutline />,
        className: 'nav-text'
    },
    {
        title: 'Reject Request',
        path: '/rejectRequest',
        icon: <AiIcons.AiFillCloseSquare />,
        className: 'nav-text'
    },
    {
        title: 'Course Coverage',
        path: '/viewCourseCoverage',
        icon: <AiIcons.AiOutlinePercentage/>,
        className: 'nav-text'
    },
    {
        title: 'Teaching Assignments',
        path: '/viewTeachingAssignments',
        icon: <AiIcons.AiFillSchedule />,
        className: 'nav-text'
    },
    {
        title: 'Days Off',
        path: '/viewDayOff',
        icon: <MdIcons.MdWeekend/>,
        className: 'nav-text'
    }
]