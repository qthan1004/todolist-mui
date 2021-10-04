import axios from "axios";

//SET HEADER TOKEN DEFAULT
const setAuthToken = (token) => {
  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common["Authorization"]; //CÁC LẦN SAU SẼ K DC PHÉP CÓ TOKEN
  }
};

export default setAuthToken;
