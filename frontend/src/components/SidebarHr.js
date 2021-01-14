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
        title: 'update course',
        path: '/updatecourse',
        icon: <FaIcons.FaDiscourse />,
        className: 'nav-text'
    },{
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
   
   ,
   
   
   
   
   
   
   
   
   
   
   
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
        title: 'add Location',
        path: '/addlocation',
        icon: <FaIcons.FaLocationArrow/>,
        className: 'nav-text'
    },
    {  
        title: 'update Location',
        path: '/updatelocation',
        icon: <FaIcons.FaLocationArrow/>,
        className: 'nav-text'
    }, {  
        title: 'delet Location',
        path: '/deletelocation',
        icon: <FaIcons.FaLocationArrow/>,
        className: 'nav-text'
    },
    {
        title: 'add course',
        path: '/addcourse',
        icon: <FaIcons.FaDiscourse />,
        className: 'nav-text'
    },
    {
        title: 'delete course',
        path: '/deletecourse',
        icon: <FaIcons.FaDiscourse />,
        className: 'nav-text'
    },
    {
        title: 'add staff',
        path: '/addStaffHr',
        icon: <AiIcons.AiOutlineUserSwitch />,
        className: 'nav-text'
    },
    {
        title: 'update staff',
        path: '/updateStaffHr',
        icon: <AiIcons.AiOutlineUserSwitch />,
        className: 'nav-text'
    },
    {
        title: 'delete staff',
        path: '/deleteStaffHr',
        icon: <AiIcons.AiOutlineUserSwitch />,
        className: 'nav-text'
    },
    
    {
        title: 'add Department',
        path: '/adddepartment',
        icon: <FaIcons.FaRegBuilding />,
        className: 'nav-text'
    },
    {
        title: 'update Department',
        path: '/updatedepartment',
        icon: <FaIcons.FaRegBuilding />,
        className: 'nav-text'
    },{
        title: 'delete Department',
        path: '/deletedepartment',
        icon: <FaIcons.FaRegBuilding />,
        className: 'nav-text'
    },
   
    {
        title: 'add faculty',
        path: '/addfaculty',
        icon: <FaIcons.FaBuilding />,
        className: 'nav-text'
    },
    {
        title: 'update faculty',
        path: '/updatefaculty',
        icon: <FaIcons.FaBuilding />,
        className: 'nav-text'
    },{
        title: 'delete faculty',
        path: '/deletefaculty',
        icon: <FaIcons.FaBuilding />,
        className: 'nav-text'
    },
   
    
]