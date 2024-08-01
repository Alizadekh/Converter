import React from "react";
import ads from "../../assets/img/ads.jpeg";
import style from "../../css/Ads.module.css";

function FirstAdsPanel() {
  return (
    <div className={style.adsArea}>
      <img className={style.adsImage} src={ads} alt="" />
    </div>
  );
}

export default FirstAdsPanel;
