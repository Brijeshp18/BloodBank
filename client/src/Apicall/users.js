import { axiosInstances } from ".";

export const LoginUser =async (payload)=>{
    const response= await axiosInstances("post","/api/users/login",payload);
    return response
}
export const RegisterUser =async (payload)=>{
    const response= await axiosInstances("post","/api/users/register",payload);
    return response
}


export const GetCurrentUser = async () => {
    const response = await axiosInstances("get","/api/users/current-user");
    return response;
  };

  

export const Forgotpassword = async (payload) => {
    const response = await axiosInstances("post","/api/users/forgot-password",payload);
    return response;
  };

  export const GetAllDonarsOfAnOrganization = () => {
    return axiosInstances("get","/api/users/all-donors");
  };
  
  export const GetAllHospitalsOfAnOrganization = () => {
    return axiosInstances("get", `/api/users/all-hospitals`);
  };
  
  export const GetAllOrganizationsOfADonar = () => {
    return axiosInstances("get", `/api/users/all-organizations-of-a-donor`);
  }
  
  export const GetAllOrganizationsOfAHospital = () => {
    return axiosInstances("get", `/api/users/all-organizations-of-a-hospital`);
  }
