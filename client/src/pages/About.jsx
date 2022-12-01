import React, { useEffect, useRef, useState } from "react";
import "./about.scss";
const About = () => {
  const text = useRef();
  const [chu, setChu] = useState("");
  const t1 =
    "==== ⭐️ VĂN PHÒNG CÔNG CHỨNG NGUYỄN ĐỨC ĐIỀN ⭐️ ==== Văn Thư Nguyễn Văn Công ";
  useEffect(() => {
    // console.log(text.current.innerText);
    setChu(text.current.innerText.split(""));
  }, []);

  return (
    <>
      <div className="about">
        <div className="circle">
          <p ref={text}> Nguyen Duc Dien</p>
          {t1.split("").map((item, i) => (
            <span key={i} style={{ transform: `rotate(${i * 4.6}deg)` }}>
              {item}
            </span>
          ))}
        </div>
      </div>
    </>
  );
};

export default About;
