import React, { useEffect, useState } from "react";
import { GetInventoryWithFilters } from "../Apicall/inventory";
import { useDispatch } from "react-redux";
import { getDateFormat } from "../utils/helper";
import { SetLoading } from "../Redux/loadersSlice";
import { message, Table } from "antd";

function InventoryTable({ filters,userType }) {
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const columns = [
    {
      title: "Inventory Type",
      dataIndex: "inventoryType",
      render: (text) => text.toUpperCase(),
    },
    {
      title: "Blood Group",
      dataIndex: "bloodGroup",
      render: (text) => text.toUpperCase(),
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      render: (text) => text + "ML",
    },
    {
      title: "Reference",
      dataIndex: "reference",
      render: (text, record) => record.organization.organizationName,
    },
    {
        title: "Date",
        dataIndex: "createdAt",
        render: (text) => getDateFormat(text),
      },
  ];
//   const getData = async () => {
//     try {
//       dispatch(SetLoading(true));
//       const response = await GetInventoryWithFilters(filters);
//       dispatch(SetLoading(false));
//       if (response.success) {
//         console.log("getdata inventory", response);
//         setData(response.data);
//       } else {
//         throw new Error(response.message);
//       }
//     } catch (error) {
//       message.error(error.message);
//       dispatch(SetLoading(false));
//     }
//   };


const getData = async () => {
    try {
      dispatch(SetLoading(true));
      const response = await GetInventoryWithFilters(filters);
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

useEffect(() => {
    getData();
  }, []);
  return (
    <div>
      <Table columns={columns} dataSource={data} />
    </div>
  );
}

export default InventoryTable;
