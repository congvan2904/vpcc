import React, { useEffect, useRef, useState } from "react";
import "./about.scss";
const About = () => {
  const text = useRef();
  const [chu, setChu] = useState("");
  let _do;
  const t2 = "Văn Thư Nguyễn văn văn văn Công";
  const t1 = ` ==== ⭐️  VĂN PHÒNG CÔNG CHỨNG NGUYỄN ĐỨC ĐIỀN  ⭐️  ==== ${t2}`;

  _do = 360 / t1.length;
  return (
    <>
      <div className="about">
        <div className="circle">
          <p style={{ color: "var(--c_green)" }} ref={text}>
            {" "}
            Nguyen Duc Dien
          </p>
          <div className="bao">
            {t1.split("").map((item, i) => (
              <span key={i} style={{ transform: `rotate(${i * _do}deg)` }}>
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
