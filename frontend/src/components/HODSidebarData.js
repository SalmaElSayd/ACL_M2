import React from 'react'
import * as TiIcons from 'react-icons/ti'; 
import * as AiIcons from 'react-icons/ai'; 
import * as IoIcons from 'react-icons/io'; 
import * as MdIcons from 'react-icons/md'; 
import * as CgIcons from 'react-icons/cg'; 
import * as FaIcons from 'react-icons/fa';
import * as GrIcons from 'react-icons/gr';

export const HODSidebarData = [
    // {
    //     title: 'Welcome',
    //     path: '/HomePageHOD',
    //     icon: <CgIcons.CgHello />,
    //     className: 'nav-text'
    // },
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
        title: 'Assign Instructor',
        path: '/assignCourseInstructor',
        icon: <AiIcons.AiOutlineUserAdd/>,
        className: 'nav-text'
    },
    {
        title: 'Assign TA',
        path: '/assignCourseTA',
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