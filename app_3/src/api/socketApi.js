import clientSocket from "socket.io-client";

export const API_URL = "http://localhost:5555";
const socket = clientSocket(`${API_URL}/consumer`);

export const subscribe = (newCallback) => {
  socket.on("consumer", (result) => {
    result = JSON.parse(result);
    newCallback(result);
  });
};
