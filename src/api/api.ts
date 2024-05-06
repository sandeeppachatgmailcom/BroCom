import { TrainerApi_route, adminApi_route, trainerApi_route, utilsApis_route } from "../entity/router/router";






export const userApi: userApi_route = {
    signUp: '/auth/create',
    login: '/auth/login',
    getlogin: '/auth/getlogin',
    validateOtp: '/auth/validateOtp',
    resetPasswordwithOtp: '/auth/resetPassword',
    saveBasicProfile: '/auth/saveBasicInfo',
    forgotPassword: '/auth/forgotPassword'
};

export const publicApi: Record<string, string> = {
    getPincode: 'https://api.postalpincode.in/pincode/'
};

export const adminApis: adminApi_route = {
    listAllstaffpendingApprovals: '/admin/listpendingStaff',
    approveStaff: '/admin/approveStaff',
    createBatch:'/admin/createBatch',
    createEvent:'/admin/createEvents',
    deleteEvent:'/admin/deleteEvent'
};

export const utilityApis: utilsApis_route = {
    listAllBatches: '/utils/listBatches',
    listAllVenues: '/utils/getActiveVenues',
    listActiveTrainers:'/utils/getActiveTrainers',
    listActiveStudemts:'/utils/getActiveTrainers',
    listActiveEvents:'/utils/listActiveEvents'
};

export const trainerApi: TrainerApi_route ={
    getPending:'/trainer/postTrainerPendingEvents'
}
