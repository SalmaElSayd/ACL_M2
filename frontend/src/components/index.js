// export everything in the directory from here


//all staff
import Login from './login'
import Sign from './signinout'
import Public from './public'
import MyProfile from './myProfile'
import Schedule from './schedule'
import PublicNavbar from './PublicNavbar'//to remove later
import ResetPassword from './resetPassword';
import MyAttendance from './myAttendance'
import UpdateProfile from './updateProfile'


//instructor
import NavbarInstructor from './NavbarInstructor';
import AssignCoordinator from './AssignCoordinator';
import ViewCourseCoverageInstructor from './viewCourseCoverageInstructor';
import ViewSlots from './viewSlots';
import ViewStaffDepartment from './viewStaffDepartment';
import ViewStaffCourse from './viewStaffCourse';
import AssignToSlot from './assignToSlot';
import UpdateCourseMem from './updateCourseMem';
import DeleteCourseMem from './deleteCourseMem';
import RemoveCourseMem from './removeCourseMem';

//head of department
import NavbarHOD from './NavbarHOD';
import Navbar from './Navbar';
import HomePage from './HomePage';
import ViewStaff from './ViewStaff';
import AssignCourseInstructor from './AssignCourseInstructor';
import UpdateCourseInstructor from './UpdateCourseInstructor';
import DeleteCourseInstructor from './DeleteCourseInstructor';
import ViewDayOff from './ViewDayOff';
import ViewRequests from './ViewRequests';
import RejectRequests from './RejectRequests';
import ViewCourseCoverage from './ViewCourseCoverage';
import ViewTeachingAssignments from './ViewTeachingAssignments';
import AssignCourseTA from './AssignCourseTA';
import AcceptRequests from './AcceptRequests';


//academic member
import NavbarAcademicMember from './NavbarAcademicMember';
import AMHome from '../components/AM_Home';
import changeDayOff from '../components/AM_changeDayOff';
import sendLeaveRequest from '../components/AM_sendLeaveRequest';
import slotLinkingRequest from '../components/AM_slotLinkingRequest';
import viewAllAcceptedRequests from '../components/AM_viewAllAcceptedRequests';
import viewAllRejectedRequests from '../components/AM_viewAllRejectedRequests';
import viewAllPendingRequests from '../components/AM_viewAllPendingRequests';
import viewAllRequests from '../components/AM_viewAllRequests';
import viewReceivedReplacementRequest from '../components/AM_viewReceivedReplacementRequest';
import viewSendReplacementRequest from '../components/AM_viewSendReplacementRequest';
import viewschedule from '../components/AM_viewschedule';
import Notifications from '../components/AM_Notifications';
import cancelRequest from '../components/AM_cancelRequest';


//coordinator
import NavbarCoordinator from './NavbarCoordinator';
import DeleteSlot from './deleteSlotCoordinator'
import UpdateSlot from './updateSlotCoordinator'
import AddSlot from './addSlotCoordinator'
import AcceptSlotLinkingRequest from './AcceptSlotLinkingRequest';
import RejectSlotLinkingRequest from './RejectSlotLinkingRequest';
import ViewSlotLinkingRequests from './ViewSlotLinkingRequests';



//hr
import HrNavbar from './HrNavbar'
import Hrc from './Hrc'
import Locationc from './LocationC'
import addlocation from './addlocation'
import updatelocation from './updatelocation'
import  deletelocation from  './deletelocation'
import addStaffHr from './addStaffHr'
import updatestaff from './updateStaffHr'
import deleteStaffHr from './deleteStaffHr'
import addfacultyHr from './addfaculty'
import updatefacultyHr from './updatefacultyHr'
import deletefacultyHR from './deletefacultyHR'
import adddepartmentHr from './adddepartmentHr'
import updatedepartmentHr from './updatedepartmentHr'
import deletedepartmentHr from './deletedepartmentHr'
import addcourseHr from './addcourseHr'
import updatecourseHr from './updatecourseHr'
import deletecourseHr from './deletecourseHr'
import viewattendanceRecHR from './viewattendanceRecHR'
import addmissingSignInHr from './addmissingSignInHr'
import addmissingSignOutHr from './addmissingSignOutHr'
import updateSalaryHr from './updateSalaryHr'
import viewStaffmemberMissinghoursHr from './viewStaffmemberMissinghoursHr'
import viewStaffmemberMissingdaysHr from './viewStaffmemberMissingdaysHr'




export {Login, Sign, Public, MyProfile, Schedule, PublicNavbar, MyAttendance, ResetPassword,UpdateProfile,

    //instructor
    NavbarInstructor, AssignCoordinator,ViewCourseCoverageInstructor, ViewSlots, ViewStaffDepartment, ViewStaffCourse,AssignToSlot,UpdateCourseMem,DeleteCourseMem,RemoveCourseMem,
    //hod
    NavbarHOD, Navbar, ViewStaff, UpdateCourseInstructor, AssignCourseInstructor, DeleteCourseInstructor, ViewDayOff,
    HomePage, ViewRequests,RejectRequests, ViewCourseCoverage, ViewTeachingAssignments,AssignCourseTA,AcceptRequests,

    //academic member
    NavbarAcademicMember, AMHome,changeDayOff,sendLeaveRequest,slotLinkingRequest,
    viewAllAcceptedRequests,viewAllRejectedRequests,viewAllPendingRequests,
    viewAllRequests,viewReceivedReplacementRequest,viewSendReplacementRequest,
    viewschedule,
    Notifications,
    cancelRequest,
    
    //coordintor
    NavbarCoordinator,DeleteSlot,UpdateSlot,AddSlot, AcceptSlotLinkingRequest, RejectSlotLinkingRequest, ViewSlotLinkingRequests,

    //hr
    HrNavbar,Hrc,Locationc,addlocation,
    updatelocation,deletelocation,addStaffHr,updatestaff,deleteStaffHr
    ,addfacultyHr,updatefacultyHr,deletefacultyHR,adddepartmentHr
    ,updatedepartmentHr,deletedepartmentHr,addcourseHr,updatecourseHr,deletecourseHr,
    viewattendanceRecHR,
    addmissingSignInHr,addmissingSignOutHr,
    updateSalaryHr,viewStaffmemberMissinghoursHr,viewStaffmemberMissingdaysHr
}