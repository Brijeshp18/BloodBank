import React, { useState, useEffect } from "react";
import { Form, Input, Button } from "antd";

const OTPForm = () => {
  const [countdown, setCountdown] = useState(60); // Initial countdown time in seconds
  const [isResendDisabled, setIsResendDisabled] = useState(false);

  useEffect(() => {
    // Start the countdown timer when the component mounts
    let timer;
    if (countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prevCountdown) => prevCountdown - 1);
      }, 1000);
    } else {
      setIsResendDisabled(false); // Enable the resend button when the countdown reaches 0
    }

    // Clean up the timer when the component unmounts or when the countdown reaches 0
    return () => {
      clearInterval(timer);
    };
  }, [countdown]);

  // const onFinish = (values) => {
  //   // Handle OTP submission here, e.g., send data to the server
  // };

  const handleResendOTP = () => {
    // Handle OTP resend logic here
    // Disable the resend button and reset the countdown timer
    setIsResendDisabled(true);
    setCountdown(60); // Reset the countdown to 60 seconds
  };

  return (
    <
    >
      <Form.Item
        label="Phone number"
        name="phone"
        normalize={(value) => value.trim()}
        rules={[
          { required: true, message: "please enter your phone number" },
          { min: 10 },{max:10}
        ]}
        hasFeedback
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="otp"
        label="OTP"
        rules={[
          {
            required: true,
            message: "Please input your OTP",
          },
        ]}
      >
        <Input />
      </Form.Item>
    
          {/* <Button type="primary" htmlType="submit">
            Verify OTP
          </Button> */}
      
          <Button onClick={handleResendOTP} disabled={isResendDisabled}  className="p-1"  classNames="bg-warning">
            {isResendDisabled
              ? `Resend OTP in ${countdown} seconds`
              : "Resend OTP"}
          </Button>
    
    </>
  );
};

export default OTPForm;
