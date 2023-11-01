import { axiosInstances } from ".";
// Add addInventory
export const AddInventory = async (payload) => {
  const response = await axiosInstances("post", "/api/inventory/add", payload);
  return response;
};

// get inventory
export const GetInventory = async () => {
  const response = await axiosInstances("get", "/api/inventory/get");
  return response;
};

export const GetInventoryWithFilters = (data) => {
  const response = axiosInstances("post", "/api/inventory/filter", {
    filters: data,
  });
  return response;
};

// export const AddInventory = (data) => {
//     return axiosInstances("post", "/api/inventory/add", data);
//   };

// import { axiosInstances } from ".";

// export const AddInventory = (data) => {
//   return axiosInstances("post", "/api/inventory/add", data);
// };
