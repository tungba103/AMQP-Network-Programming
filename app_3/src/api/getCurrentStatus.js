import axios from "axios";

export const getCurrentStatus = async () => {
  const res = await axios.get("http://localhost:5555/api/status");
  return res;
};
