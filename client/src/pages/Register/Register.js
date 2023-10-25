import React, { useState,useEffect } from "react";
import { Button, Form, Input, Radio, message } from "antd";
import { Link } from "react-router-dom";
import Hospital from "./Hospital";
import { RegisterUser } from "../../Apicall/users";
import { SetLoading } from "../../Redux/loadersSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

function Register() {
  const [type, settype] = useState("donor");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  form.setFieldsValue({});
  const onFinish = async(values) => {
    console.log("form datas", values);
    try {
        dispatch(SetLoading(true));
        const response= await RegisterUser({...values, userType:type})
        dispatch(SetLoading(false));
        if(response.success){
        message.success(response.message)
         navigate("/login");
        }
        else {
            throw new Error(response.message)
        }  
    } catch (error) {
        message.error(error.message)
    }
  };
  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/");
    }
  }, []);
  form.resetFields();
  const onFinishFailed = (errorInfo) => {
    // Handle form validation failures
    console.log("Failed:", errorInfo);
  };
  const validateIt = (_, value) => {
    // You can customize this validation logic based on your requirements
    // For example, you can use regular expressions or other rules
    if (!/^\d{10}$/.test(value)) {
      return Promise.reject('Please enter a valid 10-digit phone number');
    }
    return Promise.resolve();
  };

  
 
  return (
    <div className="bgc">
    <div className="flex h-screen items-center justify-center ">
      <Form
        autoComplete="off"
        onFinish={onFinish}
        form={form}
        onFinishFailed={onFinishFailed}
        layout="vertical"
        className="bg-white rounded shadow grid grid-col-2 p-2 gap-3 w-1/2"
      >
        <h2 className="col-span-2 uppercase text-xl text-red-600">
        <span className="text-l ms-2 me-3 text-white  bg-red-500">RED CROSS </span> {type.toUpperCase()} - Register
          <hr />
        </h2>
        <Radio.Group
          className="col-span-2"
          onChange={(e) => settype(e.target.value)}
          value={type}
        >
          <Radio value="donor">donor</Radio>
          <Radio value="hospital">Hospital</Radio>
          <Radio value="organization">Organization</Radio>
        </Radio.Group>
        {type === "donor" && (
          <>
            <Form.Item
              label="Name"
              name="name"
             normalize={(value) => value.trim()}
              rules={[
                { required: true, message: "please enter your name" },
                { min: 3 },
              ]}
              hasFeedback
            >
              <Input />
            </Form.Item>
            <Form.Item label="Phone number" 
            name="phone"
            normalize={(value) => value.trim()}
            rules={[
              { required: true, message: "please enter your phone number" },
              { min: 10 },
              { validator: validateIt},
            ]}
            hasFeedback
            >
              <Input />
            </Form.Item>
            <Form.Item label='email' name='email' normalize={(value) => value.trim()}
            rules={[
              { required: true, message: "please enter your email Id" },
              { min: 8 },
              {type:'email'}
            ]}
            hasFeedback
            >
        <Input/>
       </Form.Item>
       <Form.Item label='password' name='password'
       normalize={(value) => value.trim()}
       rules={[
         { required: true, message: "please enter your password" },
         { min: 8 },
         {max:15},
         
         
       ]}
       hasFeedback
       >
        <Input type="password"/>
       </Form.Item>
          </>
        )}
        {type !== "donor" && (
          <>
            <Hospital type={type} />
          </>
        )}
        <Button htmlType="submit" type="primary" block className="col-span-2">
          Register
        </Button>
        <Link
          to="/login"
          className="col-span-2 text-center text-gray-700 underline"
        >
          Already have an account ? <span style={{color:'red'}}>Login</span>
        </Link>
      </Form>
    </div></div>
  );
}

export default Register;
