import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Framing = () => {
  const { state: token } = useLocation();
  // const [selectedURL,setSelectedURL]= useState("");
  const navigate = useNavigate();

  const typeArray = ["iSpring", "articulate", "articulate"];
  const urlArray = [
    "http://tushar1.com/Content/Scorm_Course/PLAC_SCORM_2004/res/index.html",
    "http://tushar1.com/Content/Scorm_Course/Oil_Assessment/index_lms.html",
    "http://tushar1.com/Content/Scorm_Course/Airport_Process/index_lms.html",
  ];

  const handleClick = (idx) => {
    const selectedURL = urlArray[idx];
    const courseId = `courseId${idx}`;
    const type = typeArray[idx];
    console.log("type->", type);
    navigate("/iframe", {
      state: { token: token, url: selectedURL, courseId: courseId, type: type },
    });
  };

  return (
    <div>
      {urlArray.map((val, idx) => {
        return (
          <p onClick={() => handleClick(idx)} style={{ cursor: "pointer" }}>
            Course : {val}
          </p>
        );
      })}
    </div>
  );
};

export default Framing;
