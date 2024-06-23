
import  {AdminApi_route} from '../router/adminApi_route'
import  {UtilsApis_route} from '../router/utilsApis_route'
import { UserApi_route } from '../router/userApi_route';
import { TrainerApi_route } from '../router/TrainerApi_route';
 
export const userApi: UserApi_route = {
    signUp: '/auth/create',
    login: '/auth/login',
    getlogin: '/auth/getmylogin',
    validateOtp: '/auth/validateOtp',
    resetPasswordwithOtp: '/auth/resetPassword',
    saveBasicProfile: '/auth/saveBasicInfo',
    forgotPassword: '/auth/forgotPassword',
    getSubmissionDetails:'/auth/getSubmissionDetails',
    getBatchWiseStudentsList: '/auth/getBatchWiseStudentsList',
    getDesignationWiseStaffList:'/auth/getDesignationWiseStaffList',
    applyPromocode:'/auth/applyPromoCode', 
    
};

export const publicApi: Record<string, string> = {
    getPincode: 'https://api.postalpincode.in/pincode/'
};

export const adminApis: AdminApi_route = {
    listAllstaffpendingApprovals: '/admin/listpendingStaff',
    approveStaff: '/admin/approveStaff',
    createBatch:'/admin/createBatch',
    createEvent:'/admin/createEvents',
    deleteEvent:'/admin/deleteEvent',
    createTask:'/admin/createTask'
    
};

export const utilityApis: UtilsApis_route = {
    listAllBatches: '/utils/listBatches',
    listAllVenues: '/utils/getActiveVenues',
    listActiveTrainers:'/utils/getActiveTrainers',
    listActiveStudemts:'/utils/getActiveTrainers',
    listActiveEvents:'/utils/listActiveEvents',
    listAllTasks:'/utils/listAllTask',
    listAllDesignation:'/utils/getAllDesignation',
    listGetActiveUsers:'utils/getActiveUsers',
    studentsTaskProgressRatio:'/utils/studentsTaskProgressRatio',
    getuserDetailsByEmail : '/utils/getuserDetailsByEmail'
    
};

export const trainerApi: TrainerApi_route ={
    getPending:'/trainer/postTrainerPendingEvents',
    saveScheduledTask:'/trainer/postScheduleTask',
    updateMarkToCollection:'/trainer/updateMarkToCollection',
    getTrainerBasedBatchSummary:'/trainer/getTrainerBasedBatchSummary',
    getWeeklyStudentssummary:'trainer/getWeeklyStudentssummary',
    designationWiseEventProgress:'trainer/designationWiseEventProgress'
}

export const studentApi ={
    getStudentsTask :"/student/postStudentsTask",
    sumbitTask:"/student/submitTask"

}
export const chatApi  ={
    intiateConversation : '/chat/intiateConversation ',
    sendMessage:'/chat/sendMessage ',
}