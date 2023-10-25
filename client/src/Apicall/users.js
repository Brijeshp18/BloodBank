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
