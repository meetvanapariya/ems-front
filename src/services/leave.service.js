import apiService from "./api";

export const leaveApi = () =>{
    const getMyLeaves = async(id) =>{
        try {
            const apiResponse = await apiService.get(`/leave/get/${id}`);
            return apiResponse.data;
        } catch (error) {
            return error.response.data;
        }
    }
    const addLeave = async(user_id , username, email , leave_type , from_date , to_date , number_of_days , remaining_leave ,leave_reason , approved_by_id , leave_day_type , status) =>{
        try {
            const apiResponse = await apiService.get(`/leave/add`, {
                user_id,username, email , leave_type , from_date , to_date , number_of_days , remaining_leave ,leave_reason , approved_by_id , leave_day_type , status
            });
            return apiResponse.data;
        } catch (error) {
            return error.response.data;
        }
    }
    const filterLeave = async() =>{
        try {
            const apiResponse = await apiService.get('/leave/filter');
            return apiResponse.data;
        } catch (error) {
            return error.response.data;
        }
    }
    return{
        getMyLeaves,
        addLeave,
        filterLeave,
    }
}
