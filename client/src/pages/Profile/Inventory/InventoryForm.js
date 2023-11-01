import { Form, Radio, Input, message,Modal  } from "antd";
// import from "antd/es/modal/Modal";
import React, { useState } from "react";
import { getAntdInputValidation } from "../../../utils/helper";
import { useDispatch } from "react-redux";
import {SetLoading} from '../../../Redux/loadersSlice'
import { AddInventory } from "../../../Apicall/inventory";
import { useSelector } from 'react-redux'


function InventoryForm({ open, setOpen, reloadData }) {
  const { currentUser } = useSelector((state) => state.users);
  const [form] = Form.useForm();
  const [inventoryType, setInventoryType] = useState("in");
  const dispatch = useDispatch();

  const onFinish = async (values)=>{
    console.log(values);
    try {
      dispatch(SetLoading(true))
      const response = await AddInventory({...values,inventoryType,organization: currentUser._id})
      dispatch(SetLoading(false))
      if(response.success){
        reloadData();
        message.success("Inventory added succesfully")
        setOpen(false)
      }
      else{
        throw new Error(response.message);

      }


      
    } catch (error) {
      message.error(error.message)
      dispatch(SetLoading(false))
    }
  }

  // const onFinish = async (values) => {
  //   try {
  //     dispatch(SetLoading(true));
  //     const response = await AddInventory({
  //       ...values,
  //       inventoryType,
       
  //     });
  //     dispatch(SetLoading(false));
  //     if (response.success) {
  //       message.success("Inventory Added Successfully");
  //       setOpen(false);
  //     } else {
  //       throw new Error(response.message);
  //     }
  //   } catch (error) {
  //     message.error(error.message);
  //     dispatch(SetLoading(false));
  //   }
  // };

  return (
    <div>
      <Modal
        title="ADD INVENTORY"
        open={open}
        onCancel={() => setOpen(false)}
        centered
        onOk={()=>{form.submit()}}
      >
        <Form layout="vertical" className="flex flex-col gap-3" form={form} onFinish={onFinish}>
          <Form.Item label="Inventory Type">
            <Radio.Group
              value={inventoryType}
              onChange={(e) => setInventoryType(e.target.value)}
            >
              <Radio value="in">In</Radio>
              <Radio value="out">Out</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item
            label="Blood Group"
            name="bloodGroup"
            rules={getAntdInputValidation()}
          >
            <select name="" id="">
            <option value="">Select the Blood Group</option>
              <option value="a+">A+</option>
              <option value="a-">A-</option>
              <option value="b+">B+</option>
              <option value="b-">B-</option>
              <option value="ab+">AB+</option>
              <option value="ab-">AB-</option>
              <option value="o+">0+</option>
              <option value="o-">0-</option>
            </select>
          </Form.Item>
          <Form.Item
              label={inventoryType === "out" ? "Hospital Email" : "Donar Email"}
            name="email"
            rules={getAntdInputValidation()}
          >
            <Input type="email" />
          </Form.Item>
          <Form.Item
            label="Quantity (ML)"
            name="quantity"
            rules={getAntdInputValidation()}
          >
            <Input type="number" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default InventoryForm;
