import { axiosInstances } from ".";
// const addInventory =  async ()=>{
//     const response = /api/
// }
// export const AddInventory =async (payload)=>{
//     const response= await axiosInstances("post","/api/inventory/add",payload);
//     return response
// }



// export const AddInventory = (data) => {
//     return axiosInstances("post", "/api/inventory/add", data);
//   };


// import { axiosInstances } from ".";

export const AddInventory = (data) => {
  return axiosInstances("post", "/api/inventory/add", data);
};