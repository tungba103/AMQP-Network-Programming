import clientSocket from "socket.io-client";

export const API_URL = "http://localhost:5555";

const socket = clientSocket(`${API_URL}/consumer`);
const socket_status = clientSocket(`${API_URL}/consumer_status`);

export const subscribe = (newCallback) => {
  socket.on("consumer_temparature", (result) => {
    result = JSON.parse(result);
    newCallback(result);
  });
};

export const subscribe_status_led26 = (newCallback) => {
  socket_status.on("consumer_status_led26", (result) => {
    result = JSON.parse(result);
    newCallback(result);
  });
};

export const subscribe_status_led27 = (newCallback) => {
  socket_status.on("consumer_status_led27", (result) => {
    result = JSON.parse(result);
    newCallback(result);
  });
};
