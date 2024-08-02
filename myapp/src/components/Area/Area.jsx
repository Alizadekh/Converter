import React, { useRef, useState } from "react";
import QRCode from "qrcode.react";
import { useSelector } from "react-redux";
import style from "../../css/Area.module.css";
import Lottie from "react-lottie";
import animationData from "../../assets/animations/animation.json";

function Area() {
  const fileInputRef = useRef(null);
  const textInputRef = useRef(null);
  const [fileExtension, setFileExtension] = useState("");
  const [isYouTubeLink, setIsYouTubeLink] = useState(false);
  const [qrCodeValue, setQrCodeValue] = useState("");

  const theme = useSelector((state) => state.theme.theme);

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      const fileName = file.name;
      const extension = fileName.split(".").pop().toLowerCase();
      textInputRef.current.value = fileName;
      setFileExtension(extension);
      setIsYouTubeLink(false);
      setQrCodeValue("");
    }
  };

  const handleTextInputChange = (event) => {
    const inputValue = event.target.value;
    const youTubeRegex =
      /^(?:https?:\/\/)?(?:www\.)?(youtube\.com\/(?:watch\?v=|embed\/|v\/|.+\/.+\/)?|youtu\.be\/)([a-zA-Z0-9_-]{11})(?:\S+)?$/;
    if (youTubeRegex.test(inputValue)) {
      setIsYouTubeLink(true);
      setFileExtension("");
      setQrCodeValue("");
    } else if (inputValue.trim() === "") {
      setIsYouTubeLink(false);
      setFileExtension("");
      setQrCodeValue("");
    } else {
      setIsYouTubeLink(false);
      setFileExtension("");
      setQrCodeValue(inputValue);
    }
  };

  const handleClick = () => {
    fileInputRef.current.click();
  };

  const renderOperations = () => {
    const imageFormats = [
      "png",
      "jpg",
      "jpeg",
      "tiff",
      "pdf",
      "webp",
      "gif",
      "avif",
    ];
    const fileFormats = ["docx", "pptx", "xlsx", "pdf", "doc", "xls"];

    if (isYouTubeLink) {
      return (
        <div className={style.youtubeConvert}>
          <div className={style.ytaudioConvert}>
            <p>Audio</p>
            <div className={style.audioformat}>
              <p>MP3</p>
              <p className={style.audiosize}>
                <span>4.16</span>M
              </p>
              <button>Download</button>
            </div>
          </div>
          <div className={style.ytvideoConvert}>
            <p>Video</p>
            <div className={style.videoformat}>
              <p>1080 MP4</p>
              <p className={style.videosize}>
                <span>4.16</span>M
              </p>
              <button>Download</button>
            </div>
            <div className={style.videoformat}>
              <p> 720 MP4</p>
              <p className={style.videosize}>
                <span>4.16</span>M
              </p>
              <button>Download</button>
            </div>
          </div>
        </div>
      );
    } else if (imageFormats.includes(fileExtension)) {
      return (
        <div className={style.buttons}>
          <button>PNG</button>
          <button>JPG</button>
          <button>JPEG</button>
          <button>TIFF</button>
          <button>PDF</button>
          <button>WEBP</button>
          <button>GIF</button>
          <button>AVIF</button>
        </div>
      );
    } else if (fileFormats.includes(fileExtension)) {
      return (
        <div className={style.buttons}>
          <button>DOCX</button>
          <button>PPTX</button>
          <button>XLSX</button>
          <button>PDF</button>
          <button>DOC</button>
          <button>XLS</button>
        </div>
      );
    } else if (qrCodeValue) {
      return (
        <div className={style.qrCodeContainer}>
          <QRCode value={qrCodeValue} size={256} />
        </div>
      );
    }
    return (
      <div className={style.lottieContainer}>
        <Lottie
          options={{
            loop: true,
            autoplay: true,
            animationData: animationData,
            rendererSettings: {
              preserveAspectRatio: "xMidYMid slice",
            },
          }}
          height={400}
          width={300}
        />
      </div>
    );
  };

  return (
    <div
      className={`${style.area} ${
        theme === "dark" ? style.darkArea : style.lightArea
      }`}
    >
      <div className={style.inputArea}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="30"
          height="30"
          viewBox="0 0 30 30"
          fill="none"
          onClick={handleClick}
          style={{ cursor: "pointer" }}
        >
          <g clipPath="url(#clip0_117_109)">
            <path
              d="M1.07141 7.49998H28.9286M20.3571 18.2143H9.64284M15 12.8571V23.5714M26.7857 1.07141H3.21427C2.64595 1.07141 2.1009 1.29718 1.69904 1.69904C1.29718 2.1009 1.07141 2.64595 1.07141 3.21427V26.7857C1.07141 27.354 1.29718 27.8991 1.69904 28.3009C2.1009 28.7028 2.64595 28.9286 3.21427 28.9286H26.7857C27.354 28.9286 27.8991 28.7028 28.3009 28.3009C28.7028 27.8991 28.9286 27.354 28.9286 26.7857V3.21427C28.9286 2.64595 28.7028 2.1009 28.3009 1.69904C27.8991 1.29718 27.354 1.07141 26.7857 1.07141Z"
              stroke="#FF9500"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
          <defs>
            <clipPath id="clip0_117_109">
              <rect width="30" height="30" fill="white" />
            </clipPath>
          </defs>
        </svg>
        <input
          type="text"
          placeholder="Convert..."
          ref={textInputRef}
          onChange={handleTextInputChange}
        />
        <input
          type="file"
          style={{ display: "none" }}
          ref={fileInputRef}
          onChange={handleFileSelect}
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="30"
          height="30"
          viewBox="0 0 30 30"
          fill="none"
          className={style.search}
        >
          <path
            d="M23.3175 21.9938L26.9794 25.6538C27.1501 25.8306 27.2446 26.0674 27.2425 26.3132C27.2404 26.559 27.1418 26.7942 26.968 26.968C26.7941 27.1418 26.559 27.2404 26.3132 27.2425C26.0674 27.2447 25.8306 27.1502 25.6537 26.9794L21.9919 23.3175C19.5989 25.3677 16.5049 26.4114 13.359 26.2296C10.2132 26.0477 7.25999 24.6545 5.11922 22.3422C2.97844 20.0299 1.81646 16.9784 1.87711 13.8278C1.93775 10.6773 3.21631 7.67269 5.44449 5.44452C7.67266 3.21634 10.6773 1.93778 13.8278 1.87714C16.9783 1.81649 20.0299 2.97847 22.3422 5.11925C24.6545 7.26003 26.0477 10.2132 26.2295 13.3591C26.4114 16.5049 25.3677 19.599 23.3175 21.9919V21.9938ZM14.0625 24.375C16.7975 24.375 19.4206 23.2885 21.3545 21.3546C23.2885 19.4206 24.375 16.7976 24.375 14.0625C24.375 11.3275 23.2885 8.70446 21.3545 6.77049C19.4206 4.83652 16.7975 3.75003 14.0625 3.75003C11.3275 3.75003 8.70443 4.83652 6.77046 6.77049C4.83649 8.70446 3.75 11.3275 3.75 14.0625C3.75 16.7976 4.83649 19.4206 6.77046 21.3546C8.70443 23.2885 11.3275 24.375 14.0625 24.375Z"
            fill="#FF9500"
          />
        </svg>
      </div>
      {renderOperations()}
    </div>
  );
}

export default Area;
