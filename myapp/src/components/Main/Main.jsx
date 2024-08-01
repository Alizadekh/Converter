import React from "react";
import FirstAdsPanel from "../FirstAdsPanel/FirstAdsPanel";
import Area from "../Area/Area";
import SecondAdsPanel from "../SecondAdsPanel/SecondAdsPanel";
import style from "../../css/Main.module.css";

function Main() {
  return (
    <div className={style.main}>
      <div className={style.container}>
        <FirstAdsPanel />
        <Area />
        <SecondAdsPanel />
      </div>
    </div>
  );
}

export default Main;
