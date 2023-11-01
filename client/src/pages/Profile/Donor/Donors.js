import React,{useState,useEffect} from 'react'
import { SetLoading } from '../../../Redux/loadersSlice';
import { GetInventory } from '../../../Apicall/inventory';
import { useDispatch } from 'react-redux';
import { Table, message } from "antd";
import { GetAllDonarsOfAnOrganization } from '../../../Apicall/users';
import {getDateFormat} from '../../../utils/helper'
function Donors() {
    const dispatch = useDispatch()
    const [data,setData]= useState();

    const getData = async () => {
        try {
          dispatch(SetLoading(true));
          const response = await GetAllDonarsOfAnOrganization();
          dispatch(SetLoading(false));
          if (response.success) {
            setData(response.data);
          } else {
            throw new Error(response.message);
          }
        } catch (error) {
          message.error(error.message);
          dispatch(SetLoading(false));
        }
      };
      const columns = [
        {
          title: "Name",
          dataIndex: "name",
        },
        {
          title: "Email",
          dataIndex: "email",
        },
        {
          title: "Phone",
          dataIndex: "phone",
        },
        {
          title: "Created At",
          dataIndex: "createdAt",
          render: (text) => getDateFormat(text),
        },
      ];
    useEffect(() => {
        getData();
      }, []);
  return (
    <div>
    <Table columns={columns} dataSource={data} />
  </div>
  )
}

export default Donors
