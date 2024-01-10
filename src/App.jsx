import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Login from "./Login";
import { Route, Router, Routes } from "react-router-dom";
import Framing from "./Framing";
import Iframe from "./iframe";

function App() {
  const [scormContent, setScormContent] = useState("");
  const [token, setToken] = useState("");

  // useEffect(() => {
  //   const fetchScormContent = async () => {
  //     try {
  //       const response = await fetch(
  //         "http://tushar1.com/Content/PLAC_SCORM_2004/res/index.html"
  //       );
  //       if (!response.ok) {
  //         throw new Error(`HTTP error! Status: ${response.status}`);
  //       }
  //       const content = await response.text();
  //       setScormContent(content);
  //     } catch (error) {
  //       console.error("Error fetching SCORM content:", error);
  //     }
  //   };

  //   fetchScormContent();
  // }, []);

  // const url = `http://tushar1.com/Content/Scorm_Course/PLAC_SCORM_2004/res/index.html`;
  // const url = `http://tushar1.com/Content/Scorm_Course/Oil_Assessment/index_lms.html`;

  const urlArray = [
    "http://tushar1.com/Content/Scorm_Course/PLAC_SCORM_2004/res/index.html",
    "http://tushar1.com/Content/Scorm_Course/Oil_Assessment/index_lms.html",
    "http://tushar1.com/Content/Scorm_Course/Airport_Process/index_lms.html",
  ];

  const url = `http://tushar1.com/Content/Scorm_Course/Airport_Process/index_lms.html`;
  const courseId = "01234";
  return (
    <>
      {/* {token === "" && <Login token={token} setToken={setToken} />}

      {token !== "" && (
        <>
          {urlArray?.map((val, idx) => {
            return (
              <p onClick={() => {}} style={{ cursor: "pointer" }}>
                Course : {val}
              </p>
            );
          })}
        </> */}

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/framing" element={<Framing />} />
        <Route path="/iframe" element={<Iframe />} />
      </Routes>
    </>
    // <iframe
    //   // src="http://tushar1.com/Content/PLAC_SCORM_2004/res/index.html"
    //   src={`http://tushar1.com/index.html?courseUrl=${url}&courseId=${courseId}&type=articulate&token=123456`}
    //   // src="https://tushar1.com/index.html?courseUrl=${url}&courseId=1234&type=iSpring`}"
    //   width={1080}
    //   height={600}
    // />
  );
}

export default App;
