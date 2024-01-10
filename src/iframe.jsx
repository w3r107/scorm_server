import React from "react";
import { useLocation } from "react-router-dom";

const Iframe = () => {
  const { state } = useLocation();
  const { url, courseId, type, token } = state;
  console.log(url, courseId, type, token);
  return (
    <div>
      <iframe
        // src="http://tushar1.com/Content/PLAC_SCORM_2004/res/index.html"
        src={`http://tushar1.com/index.html?courseUrl=${url}&courseId=${courseId}&type=${type}&token=${token}`}
        // src="https://tushar1.com/index.html?courseUrl=${url}&courseId=1234&type=iSpring`}"
        width={1080}
        height={600}
      />
    </div>
  );
};

export default Iframe;
