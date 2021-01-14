import React from 'react'
import * as TiIcons from 'react-icons/ti'; 
import * as AiIcons from 'react-icons/ai'; 
import * as IoIcons from 'react-icons/io'; 
import * as MdIcons from 'react-icons/md'; 
import * as GiIcons from 'react-icons/gi'; 

export const CoordinatorSidebarData = [
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
        title: 'Send a Leave Request',
        path: '/academicMember/sendLeaveRequest',
        icon: <AiIcons.AiOutlineSend/>,
        className: 'nav-text'
    },
    {
        title: 'Slot Linking Request',
        path: '/academicMember/slotLinkingRequest',
        icon: <AiIcons.AiFillEdit />,
        className: 'nav-text'
    },
    {
        title: 'View All Accepted Requests',
        path: '/academicMember/viewAcceptedRequests',
        icon: <MdIcons.MdViewHeadline />,
        className: 'nav-text'
    },
    
    {
        title: 'View All Rejected Requests',
        path: '/academicMember/viewRejectedRequest',
        icon: <MdIcons.MdViewHeadline />,
        className: 'nav-text'
    },
    {
        title: 'View All Pending Requests',
        path: '/academicMember/viewPendingRequest',
        icon: <MdIcons.MdViewHeadline />,
        className: 'nav-text'
    },
    {
        title: 'View All Requests',
        path: '/academicMember/viewAllRequests',
        icon: <MdIcons.MdViewHeadline />,
        className: 'nav-text'
    },
    {
        title: 'View Received Replacement Request',
        path: '/academicMember/viewReceivedReplacementRequest',
        icon: <IoIcons.IoMdPeople />,
        className: 'nav-text'
    },
    {
        title: 'View Send Replacement Request',
        path: '/academicMember/viewSendReplacementRequest',
        icon: <MdIcons.MdViewHeadline />,
        className: 'nav-text'
    },
    {
        title: 'View Your Schedule',
        path: '/academicMember/viewSchedule',
        icon: <MdIcons.MdPageview />,
        className: 'nav-text'
    } ,
    {
        title: 'Notifications',
        path: '/academicMember/notifications',
        icon: <IoIcons.IoMdNotifications />,
        className: 'nav-text'
    },
    {
        title: 'Change Day Off',
        path: '/academicMember/changeDayOff',
        icon: <AiIcons.AiFillEdit/>,
        className: 'nav-text'
    },
    {
        title: 'Cancel Request',
        path: '/academicMember/cancelRequest',
        icon: <GiIcons.GiCancel />,
        className: 'nav-text'
    },
    {
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
    },
    {
        title: 'Slot-Linking Requests',
        path: '/coordinator/viewSlotLinkingRequests',
        icon: <IoIcons.IoMdChatboxes />,
        className: 'nav-text'
    },
    {
        title: 'Accept Request',
        path: '/coordinator/acceptSlotLinkingRequests',
        icon: <TiIcons.TiTickOutline />,
        className: 'nav-text'
    },
    {
        title: 'Reject Request',
        path: '/coordinator/rejectSlotLinkingRequest',
        icon: <AiIcons.AiFillCloseSquare />,
        className: 'nav-text'
    }
]