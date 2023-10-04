import axios from "axios";
export const axiosInstances = async (method, endpoint, payload) => {
  try {
    const response = await axios({
      method,
      url: endpoint,
      data: payload,
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
  });
    console.log("response", response);
    return response.data;
  } catch (error) {
    return error;
  }
};
