import React from 'react'
import {Form,Input} from 'antd'
import TextArea from 'antd/es/input/TextArea'

function Hospital({type}) {
  const [form] = Form.useForm(); // check this line
  return (
    <>
       <Form.Item
       label={type=== 'hospital' ? 'Hospital Name':'Organization Name'}
       name={type=== 'hospital' ? "hospitalName":'organizationName'}
       normalize={(value) => value.trim()}
       rules={[
         { required: true, message:`please enter your ${type} name` },
         { min: 3 },
       ]}
       hasFeedback
       >
        <Input/>
       </Form.Item>
       <Form.Item label='owner' name='owner'
        normalize={(value) => value.trim()}
        rules={[
          { required: true, message: "please enter your owner name" },
          { min: 3 },
        ]}
        hasFeedback
        >
        <Input/>
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
       <Form.Item label='phone' name='phone' 
            normalize={(value) => value.trim()}
             rules={[
               { required: true, message: "please enter your contact number" },
               { min: 10 },
               
             ]}
             hasFeedback
             >
        <Input/>
       </Form.Item>
       <Form.Item label='website' name='website'
          normalize={(value) => value.trim()}
          rules={[
            { required: true, message: "please enter your website" },
            { min: 8 },
            {type:"email"}
            
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
        <Input/>
       </Form.Item>
       <Form.Item label='address' name='address' className='col-span-2'
      
       rules={[
         { required: true, message: "please enter your address" },
         { min: 20 },
         {max:50},
         {whitespace:true}
         
       ]}
       hasFeedback
       >
        <TextArea/>
       </Form.Item>
       
    </>
  )
}

export default Hospital
