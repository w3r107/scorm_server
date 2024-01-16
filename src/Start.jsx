import React, { useState, useEffect, useRef } from "react";

// import { WSURL } from "utils/axiosConfig";

const Start = () => {
  const [tableCalls, setTableCalls] = useState([]);
  const [alertSound, setAlertSound] = useState(true);

  const socketRef = useRef(null);
  const reconnectTimeout = useRef(1000);
  const isMounted = useRef(true);
  const audioRef = useRef(null);
  const clearCallsInterval = useRef(null);
  const WSURL = "wss://testdevapi.kdev.co.in";
  useEffect(() => {
    clearCallsInterval.current = setInterval(() => {
      setTableCalls([]);
    }, 60000 * 3); // 1 minutes * 3

    return () => {
      clearInterval(clearCallsInterval.current);
    };
  }, []);

  const dismissCall = (tableNumber) => {
    setTableCalls((prevCalls) => {
      const callToDismiss = prevCalls.find(
        (call) => call.tableNumber === tableNumber
      );
      if (callToDismiss && callToDismiss.timeoutId) {
        clearTimeout(callToDismiss.timeoutId); // Clear the timeout
      }
      return prevCalls.filter((call) => call.tableNumber !== tableNumber);
    });
  };

  const playAlert = () => {
    console.log("play alert");
    // if (typeof window !== "undefined") {
    //   audioRef.current = new Audio("/service_call_alert.mp3");
    // }
    // console.log(alertSound);

    // if (alertSound == true)
    //   audioRef.current
    //     .play()
    //     .catch((error) => console.error("Error playing the audio:", error));
  };

  const connectWebSocket = () => {
    socketRef.current = new WebSocket(`${WSURL}/v1/ws/serviceCalls`);
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
      console.log(message.data);
      const { type, isCheck, tableNumber } = message.data;
      // const { type, isCheck, tableNumber } = JSON.parse(message?.data);
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
        playAlert();
      }
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

  return (
    <>
      <h1>I m in socekt </h1>
    </>
  );
};

export default Start;

// import React, { useEffect } from "react";
// import { io } from "socket.io-client";

// const Socket = () => {
//   // const url = "https://testdevapi.kdev.co.in";
//   // const url = "ws://localhost:8500";
//   const url = "wss://testdevapi.kdev.co.in";
//   useEffect(() => {
//     const socket = io(url, {
//       withCredentials: true,
//       transports: ["websocket"],
//     });

//     // socket.emit("setup", userIdSender);
//     // console.log(socket);
//     socket.on("ok", (mes) => {
//       console.log(mes);
//     });
//   }, []);

//   return <div>Socket</div>;
// };
// //testdevapi.kdev.co.in/socket.io/?EIO=4&transport=websocket

// export default Socket;

// import React, { useState } from "react";
// import { useRef } from "react";
// import { useEffect } from "react";

// const Start = () => {
//   const socketRef = useRef(null);
//   const isMounted = useRef(true);
//   const reconnectTimeout = useRef(1000);
//   //   const WSURL = "wss://139.59.65.117:8080";
//   const WSURL = "wss://sereindevapi.kdev.co.in";

//   //
//   //   const WSURL = "ws://localhost:3000";
//   const [tableCalls, setTableCalls] = useState(null);

//   const connectWebSocket = () => {
//     try {
//       //   socketRef.current = new WebSocket(`${WSURL}/handle`);
//       socketRef.current = new WebSocket(`${WSURL}/v1/ws/orders`);
//       //   socketRef.current = new WebSocket(`${WSURL}/v1/ws/serviceCalls`);
//       console.log("Instance Created");

//       socketRef.current.addEventListener("open", () => {
//         if (socketRef.current.readyState !== WebSocket.OPEN) return;
//         console.log("Connection Opened");
//         socketRef.current.send(
//           JSON.stringify({
//             type: "connect",
//             clientId: localStorage.getItem("restaurantId"),
//           })
//         );
//       });

//       socketRef.current.addEventListener("message", (message) => {
//         if (socketRef.current.readyState !== WebSocket.OPEN) return;
//         const { type, isCheck, tableNumber } = JSON.parse(message?.data);
//         if (type === "newTableCall" && tableNumber) {
//           const newCall = {
//             tableNumber,
//             isCheck,
//             startTime: Date.now(),
//             timeoutId: null,
//           };

//           newCall.timeoutId = setTimeout(() => {
//             setTableCalls((prevCalls) =>
//               prevCalls.filter((call) => call.tableNumber !== tableNumber)
//             );
//           }, 180000); // 3 minutes

//           setTableCalls((prevCalls) => [...prevCalls, newCall]);
//           // playAlert();
//         }
//       });

//       socketRef.current.addEventListener("error", (e) => {
//         console.log("WebSocket connection error", e);

//         // if (isMounted.current) {
//         //   // Only set a timeout if the component is still mounted
//         //   reconnectTimeoutId = setTimeout(() => {
//         //     connectWebSocket();
//         //   }, reconnectTimeout.current);
//         // }
//       });

//       let reconnectTimeoutId;
//       socketRef.current.addEventListener("close", () => {
//         console.log("WebSocket connection closed");
//         if (isMounted.current) {
//           // Only set a timeout if the component is still mounted
//           reconnectTimeoutId = setTimeout(() => {
//             connectWebSocket();
//           }, reconnectTimeout.current);
//         }
//       });
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     connectWebSocket();
//     return () => {
//       isMounted.current = false;
//       if (socketRef.current) {
//         socketRef.current.close();
//       }
//       clearTimeout(reconnectTimeout.current);
//     };
//   }, []);
//   return <div>Order</div>;
// };

// export default Start;
