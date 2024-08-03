import React, { useRef, useState } from "react";
import QRCode from "qrcode.react";
import { useSelector } from "react-redux";
import style from "../../css/Area.module.css";
import Lottie from "react-lottie";
import animationData from "../../assets/animations/animation.json";
import { AiOutlineClose } from "react-icons/ai";

function Area() {
  const fileInputRef = useRef(null);
  const textInputRef = useRef(null);
  const qrCodeRef = useRef(null);
  const [fileExtension, setFileExtension] = useState("");
  const [isYouTubeLink, setIsYouTubeLink] = useState(false);
  const [qrCodeValue, setQrCodeValue] = useState("");
  const [downloaded, setDownloaded] = useState(false);

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
      setDownloaded(false);
    }
  };
  const handleClearInput = () => {
    textInputRef.current.value = "";
    setFileExtension("");
    setIsYouTubeLink(false);
    setQrCodeValue("");
    setDownloaded(false);
  };

  const handleTextInputChange = (event) => {
    const inputValue = event.target.value;
    const youTubeRegex =
      /^(?:https?:\/\/)?(?:www\.)?(youtube\.com\/(?:watch\?v=|embed\/|v\/|.+\/.+\/)?|youtu\.be\/)([a-zA-Z0-9_-]{11})(?:\S+)?$/;
    if (youTubeRegex.test(inputValue)) {
      setIsYouTubeLink(true);
      setFileExtension("");
      setQrCodeValue("");
      setDownloaded(false);
    } else if (inputValue.trim() === "") {
      setIsYouTubeLink(false);
      setFileExtension("");
      setQrCodeValue("");
      setDownloaded(false);
    } else {
      setIsYouTubeLink(false);
      setFileExtension("");
      setQrCodeValue(inputValue);
      setDownloaded(false);
    }
  };

  const handleClick = () => {
    fileInputRef.current.click();
  };

  const handleDownload = () => {
    const canvas = qrCodeRef.current.querySelector("canvas");
    const pngUrl = canvas
      .toDataURL("image/png")
      .replace("image/png", "image/octet-stream");
    const downloadLink = document.createElement("a");
    downloadLink.href = pngUrl;
    downloadLink.download = "qrcode.png";
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
    setDownloaded(true);
  };

  const handleGenerateAgain = () => {
    setQrCodeValue("");
    textInputRef.current.value = ""; // Clear the input
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
        <div className={style.qrzone}>
          {downloaded ? (
            <div className={style.Qrmessage}>
              <p className={style.QrSuccesMessage}>
                QR Code downloaded successfully
              </p>
              <button
                className={style.qrdownload}
                onClick={handleGenerateAgain}
              >
                Generate Again
              </button>
            </div>
          ) : (
            <div className={style.qrCodeContainer} ref={qrCodeRef}>
              <QRCode value={qrCodeValue} size={200} />
              <div className={style.downloadBtn}>
                <button className={style.qrdownload} onClick={handleDownload}>
                  Download
                </button>
              </div>
            </div>
          )}
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
        <AiOutlineClose className={style.closeBtn} onClick={handleClearInput} />
      </div>
      {renderOperations()}
    </div>
  );
}

export default Area;
