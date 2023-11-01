import React,{useState,useEffect} from 'react'
import { SetLoading } from '../../../Redux/loadersSlice';
import { GetInventory } from '../../../Apicall/inventory';
import { useDispatch } from 'react-redux';
import { Table, message } from "antd";
import {GetAllHospitalsOfAnOrganization } from '../../../Apicall/users';
import {getDateFormat} from '../../../utils/helper'
function Hospital() {
    const dispatch = useDispatch()
    const [data,setData]= useState();

    const getData = async () => {
        try {
          dispatch(SetLoading(true));
          const response = await GetAllHospitalsOfAnOrganization();
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
          title: "Hospital Name",
          dataIndex: "hospitalName",
          render: (text) => text.toUpperCase(),
        },
        {
          title: "Email",
          dataIndex: "email",
          render: (text) => text.toUpperCase(),
        },
        {
          title: "Phone",
          dataIndex: "phone",
          render: (text) => text.toUpperCase(),
        },
        {
            title: "Address",
            dataIndex: "address",
            render: (text) => text.toUpperCase(),
          },
        {
            title: "Owner Name",
            dataIndex: "owner",
            render: (text) => text.toUpperCase(),
          },
        {
          title: "Created At",
          dataIndex: "createdAt",
          render: (text) => (getDateFormat(text).toUpperCase()),
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

export default Hospital
