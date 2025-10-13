import axios from "axios";

// const API_URL = "/api/users/";
const API_URL = "http://localhost:5000/api/users/";

interface UserData {
  name: string;
  email: string;
  phoneNumber: string;
  password: string;
  confirmPassword: string;
}

// Register user
const register = async (userData: UserData) => {
  const response = await axios.post(API_URL, userData);

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }

  console.log("Backend response:", response.data);

  return response.data;
};

const authService = {
  register,
};

export default authService;
