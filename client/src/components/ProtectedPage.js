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
  // useEffect=(()=>{
  //     getCurrentUser();
  // },[]);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      getCurrentUser();
    } else {
      navigate("/login");
    }
  }, []);
  return(
    currentUser &&(
  <div>
    
     <h1>Welcome {getLoggedInUserName(currentUser)}
      </h1>
    {children}</div>)
  );
}

export default ProtectedPage;
