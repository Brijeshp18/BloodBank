import React from "react";
import { Form, Input, Button, message } from "antd";
import { Forgotpassword } from "../../Apicall/users";
function resetPassword() {
  const onFinish = async(values) => {
    console.log("Received values:", values);
    try {
      const response = await Forgotpassword ({email: values.email})
      if (response.success) {
       message.success(response.message)
        console.log("Password reset email sent.");
      }
    } catch (error) {
      message.error(error.message);
      console.error("Error sending reset email:", error);
    }
  };
  return (
    <div> 
      <div className="bgc">
        <div className="flex h-screen items-center justify-center ">
          <Form name="forgot-password" onFinish={onFinish}  className="bg-white rounded shadow grid p-8 gap-5 w-1/2">
          <h2 className="col-span-2 uppercase text-xl p-3 text-red-600">
        <span className="text-l ms-2 me-3  text-white  bg-red-500">RED CROSS </span> - Reset Password
          <hr />
        </h2>
            <Form.Item
              name="email"
              label="Email"
              rules={[
                {
                  required: true,
                  message: "Please enter your email!",
                },
                {
                  type: "email",
                  message: "Please enter a valid email address!",
                },
               
              ]}
              hasFeedback
            >
              <Input />
            </Form.Item>

            <Form.Item>
              <div className="flex items-center justify-center">
              <Button className="text-center" type="primary" htmlType="submit">
                Reset Password
              </Button></div>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default resetPassword;
