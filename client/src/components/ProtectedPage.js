import { message } from "antd";
import React, { useEffect, useState } from "react";
import { GetCurrentUser } from "../Apicall/users";
import { useNavigate } from "react-router-dom";

function ProtectedPage({ children }) {
  const [currentUser,setcurrentUser]= useState(null);
  const navigate = useNavigate();
  const getCurrentUser = async () => {
    try {
      const response = await GetCurrentUser();
      if (response.success) {
        message.success(response.message);
        // console.log("setdata",response.data)
        setcurrentUser(response.data);
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
    
     <h1>Welcome {currentUser?.name}
      </h1>
    {children}</div>)
  );
}

export default ProtectedPage;
