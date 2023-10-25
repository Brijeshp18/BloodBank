import { message } from "antd";
import React, { useEffect, useState } from "react";
import { GetCurrentUser } from "../Apicall/users";
import { useNavigate } from "react-router-dom";
import { getLoggedInUserName } from "../utils/helper";
import { useDispatch, useSelector } from "react-redux";
import { SetCurrentUser } from "../Redux/usersSlice";


function ProtectedPage({ children }) {
  const { currentUser } = useSelector((state) => state.users);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const getCurrentUser = async () => {
    try {
     
      const response = await GetCurrentUser();
     
      if (response.success) {
        message.success(response.message);
        dispatch(SetCurrentUser(response.data));
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
     
      message.error(error.message);
    }
  };


  useEffect(() => {
    if (localStorage.getItem("token")) {
      getCurrentUser();
    } else {
      navigate("/login");
    }
  }, []);
  return(
      currentUser && (
        <div>
          {/* header */}
          <div className="flex justify-between items-center bg-red-600 text-white px-5 py-3 rounded-b">
            <div onClick={() => navigate("/")} className="cursor-pointer">
              <h1 className="text-2xl">REDCROSS BLOODBANK</h1>
              <span className="text-xs">
                {currentUser.userType.toUpperCase()}
              </span>
             
            </div><div className="flex items-center gap-1">
              <i class="ri-account-circle-line"></i>
              <div className="flex flex-col">
                <span
                  className="mr-5 text-md  cursor-pointer"
                  onClick={() => navigate("/profile")}
                >
                  {getLoggedInUserName(currentUser).toUpperCase()}
                </span>
               
              </div>
              <div>
              <i
              className="ri-logout-circle-r-line ml-5 "
            ></i>
            <span className="cursor-pointer"   onClick={() => {
                localStorage.removeItem("token");
                navigate("/login");
              }} > LOGOUT</span>
              
              </div>
            </div>
   
           
              </div>
              <div className="px-5 py-5">{children}</div>
              </div>
             

 
 ) )}


export default ProtectedPage;

