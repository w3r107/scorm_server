import React, { useState } from "react";
import { useRef } from "react";
import { useEffect } from "react";

const Start = () => {
  const socketRef = useRef(null);
  const isMounted = useRef(true);
  const reconnectTimeout = useRef(1000);
  //   const WSURL = "wss://139.59.65.117:8080";
  const WSURL = "wss://sereindevapi.kdev.co.in";

  //
  //   const WSURL = "ws://localhost:3000";
  const [tableCalls, setTableCalls] = useState(null);

  const connectWebSocket = () => {
    try {
      //   socketRef.current = new WebSocket(`${WSURL}/handle`);
      socketRef.current = new WebSocket(`${WSURL}/v1/ws/orders`);
      //   socketRef.current = new WebSocket(`${WSURL}/v1/ws/serviceCalls`);
      console.log("Instance Created");

      socketRef.current.addEventListener("open", () => {
        if (socketRef.current.readyState !== WebSocket.OPEN) return;
        console.log("Connection Opened");
        socketRef.current.send(
          JSON.stringify({
            type: "connect",
            clientId: localStorage.getItem("restaurantId"),
          })
        );
      });

      socketRef.current.addEventListener("message", (message) => {
        if (socketRef.current.readyState !== WebSocket.OPEN) return;
        const { type, isCheck, tableNumber } = JSON.parse(message?.data);
        if (type === "newTableCall" && tableNumber) {
          const newCall = {
            tableNumber,
            isCheck,
            startTime: Date.now(),
            timeoutId: null,
          };

          newCall.timeoutId = setTimeout(() => {
            setTableCalls((prevCalls) =>
              prevCalls.filter((call) => call.tableNumber !== tableNumber)
            );
          }, 180000); // 3 minutes

          setTableCalls((prevCalls) => [...prevCalls, newCall]);
          // playAlert();
        }
      });

      socketRef.current.addEventListener("error", (e) => {
        console.log("WebSocket connection error", e);

        // if (isMounted.current) {
        //   // Only set a timeout if the component is still mounted
        //   reconnectTimeoutId = setTimeout(() => {
        //     connectWebSocket();
        //   }, reconnectTimeout.current);
        // }
      });

      let reconnectTimeoutId;
      socketRef.current.addEventListener("close", () => {
        console.log("WebSocket connection closed");
        if (isMounted.current) {
          // Only set a timeout if the component is still mounted
          reconnectTimeoutId = setTimeout(() => {
            connectWebSocket();
          }, reconnectTimeout.current);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    connectWebSocket();
    return () => {
      isMounted.current = false;
      if (socketRef.current) {
        socketRef.current.close();
      }
      clearTimeout(reconnectTimeout.current);
    };
  }, []);
  return <div>Order</div>;
};

export default Start;
