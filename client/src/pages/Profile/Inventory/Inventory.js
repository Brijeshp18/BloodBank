import { Button,message,Table } from 'antd'
import React, { useState } from 'react'
import InventoryForm from './InventoryForm';
import { useDispatch } from 'react-redux';
import { SetLoading } from '../../../Redux/loadersSlice';
import { GetInventory } from '../../../Apicall/inventory';
import { useEffect } from 'react';
import { get } from 'mongoose';
import { getDateFormat } from '../../../utils/helper';
function Inventory() {
    const [data,setData]= useState([]);
    const [open,setOpen]=useState(false);
    const dispatch = useDispatch();
    const columns = [
      {
        title:"Inventory Type",
        // title:"INVENTORY TYPE",
        dataIndex:"inventoryType",
        render : (text) => text.toUpperCase(),
      },
      {
        title:"Blood Group",
        dataIndex: "bloodGroup",
        render: (text) => text.toUpperCase(),
      },
      {
        title:"Quantity",
        dataIndex:"quantity",
        render : (text) => text+ "ML"
        
      },
      {
        title:"Reference",
        dataIndex:"reference",
        render: (text ,record) =>{
          if(record.inventoryType === 'in'){
            return record.donor.name.toUpperCase();
          } else{
            return record.hospital.hospitalName.toUpperCase();
          }
        }
      },
      {
        title:"Date",
        dataIndex:"date",
        render :(text) => getDateFormat(text),
      }
    ]
    const getData = async () => {
      try {
        dispatch(SetLoading(true));
        const response = await GetInventory();
        dispatch(SetLoading(false))
        if(response.success){
          console.log("getdata inventory", response)
          setData(response.data);}
          else{
            throw new Error(response.message);
          
        }

        
      } catch (error) {
        message.error(error.message)
        dispatch(SetLoading(false));
      }
    }
    useEffect(()=>{
      getData();
    },[])
  return (
    <div>
        <div className='flex justify-end mb-5'>
        <Button type='primary'onClick={()=>setOpen(true)}>Add Inventory</Button>    
            
         </div>
         <Table columns ={columns} dataSource={data}/>
         {open && <InventoryForm open={open} setOpen={setOpen} reloadData={getData}
    n />}
         
    </div>
  )
}

export default Inventory
