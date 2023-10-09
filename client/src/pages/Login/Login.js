import React, { useState } from "react";
import { Button, Form, Input, Radio,message } from "antd";
import { Link,useNavigate } from "react-router-dom";
import { LoginUser } from "../../Apicall/users";
import OTPForm from './Otpform'
import { useDispatch } from "react-redux";
import { SetLoading } from "../../Redux/loadersSlice";





function Login() {
  const [type, settype] = useState("donor");
  const [form] = Form.useForm(); 
  const Navigate= useNavigate();
  const dispatch = useDispatch();
  

  const onFinish = async (values) => {
    console.log("form datas", values);
    try {
    
      dispatch(SetLoading(true));
      const response= await LoginUser({...values, userType:type})
      dispatch(SetLoading(false));
      if(response.success){
      message.success(response.message)
      localStorage.setItem("token",response.data)
      Navigate("/")
      }
      else {
        dispatch(SetLoading(false));
          throw new Error(response.message)
      }  
  } catch (error) {
      message.error(error.message)
  }

  };
  
  const onFinishFailed = (errorInfo) => {
    // Handle form validation failures
    console.log("Failed:", errorInfo);
  };
  form.resetFields();
  return (
    <div className="bgc">
    <div  className="flex h-screen items-center justify-center">
      <Form
        autoComplete="off"
        onFinish={onFinish}
        form={form}
        onFinishFailed={onFinishFailed}
        layout="vertical"
        className="bg-white rounded shadow grid p-4 gap-3 w-1/3"
      >
        <h1 className="uppercase text-xl text-red-600">
        <span className="text-l ms-2 me-3 text-white  bg-red-500">RED CROSS </span>   {type.toUpperCase()} - Login 
          <hr />
        </h1>
        <Radio.Group
          
          onChange={(e) => settype(e.target.value)}
          value={type}
        >
          <Radio value="donor">donor</Radio>
          <Radio value="hospital">Hospital</Radio>
          <Radio value="organization">Organization</Radio>
        </Radio.Group>
        {type !== 'donor' && ( 
            <>
           
            <Form.Item label="Email" 
            name="email"
            normalize={(value) => value.trim()}
            rules={[
              { required: true, message: "please enter your email Id" },
              { min: 8 },
              {type:'email'}
            ]}
            hasFeedback>
              <Input />
            </Form.Item>
       
            <Form.Item label="Password" 
            name="password"
            normalize={(value) => value.trim()}
             rules={[
               { required: true, message: "please enter your password" },
               { min: 8 },
               {max:15},
               
             ]}
             hasFeedback>
              <Input type="password" />
            </Form.Item>
          </>
        )}

{type === 'donor' && ( 
            <>
           
            {/* <Form.Item label="Adhaar card number" 
            name="aadharcard number"
            normalize={(value) => value.trim()}
            rules={[
              { required: true, message: "please enter your Adhar number" },
              { min: 8 },
            
            ]}
            hasFeedback>
              <Input />
            </Form.Item> */}
       
            {/* <Form.Item label="One Time Password (OTP)" 
            name="OTP"
            normalize={(value) => value.trim()}
            rules={[
              {
                required: true,
                message: 'Please input your OTP',
              },
            ]}
             hasFeedback
            >
              <Input type="password" />
            </Form.Item> */}
            <OTPForm/>
          </>
        )}
        
        
     
        <Button htmlType="submit" type="primary" block >
        Login
        </Button>
        <Link
          to="/register"
          className=" text-center text-gray-700 underline"
        >
         Don't have an account  <span style={{color:'red'}}>Register</span>
        </Link>
      </Form>
    </div></div>
  );
}

export default Login;
