import React from "react";
import { useSelector } from "react-redux";
import FirstAdsPanel from "../FirstAdsPanel/FirstAdsPanel";
import Area from "../Area/Area";
import SecondAdsPanel from "../SecondAdsPanel/SecondAdsPanel";
import style from "../../css/Main.module.css";

function Main() {
  const theme = useSelector((state) => state.theme.theme);

  return (
    <div
      className={`${style.main} ${
        theme === "dark" ? style.darkMain : style.lightMain
      }`}
    >
      <div className={style.container}>
        <FirstAdsPanel />
        <Area />
        <SecondAdsPanel />
      </div>
    </div>
  );
}

export default Main;
