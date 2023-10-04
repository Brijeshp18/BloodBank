import React, { useState } from "react";
import { Button, Form, Input, Radio, message } from "antd";
import { Link } from "react-router-dom";
import Hospital from "./Hospital";
import { RegisterUser } from "../../Apicall/users";


function Register() {
  const [type, settype] = useState("donar");
  const [form] = Form.useForm();
  form.setFieldsValue({});
  const onFinish = async(values) => {
    console.log("form datas", values);
    try {
        const response= await RegisterUser({...values, userType:type})
        if(response.success){
        message.success(response.message)
        }
        else {
            throw new Error(response.message)
        }  
    } catch (error) {
        message.error(error.message)
    }
  };
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
          <Radio value="donar">Donar</Radio>
          <Radio value="hospital">Hospital</Radio>
          <Radio value="organization">Organization</Radio>
        </Radio.Group>
        {type === "donar" && (
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
            <Form.Item label="Blood group" 
            name="bloodgroup"
            normalize={(value) => value.trim()}
             rules={[
               { required: true, message: "please enter your Blood group" },
             {min:1},
             {max:3},
             {pattern:/^(A|B|AB|O)[\+\-]?$/,message:'invalid blood group'
             },
               
             ]}
             hasFeedback
             >
              <Input/>
            </Form.Item>
            <Form.Item label="Adhaar card number"
             name="aadharcardnumber"
             normalize={(value) => value.trim()}
             rules={[
               { required: true, message: "please enter your adharcard number" },
               { min: 12 },
               {max:12},
               {pattern:/^\d{12}$/,message: "invalid aadhar number"
              },
              
               
             ]}
             hasFeedback
             >
             
              <Input />
            </Form.Item>
          </>
        )}
        {type !== "donar" && (
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
