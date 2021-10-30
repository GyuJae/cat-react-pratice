import React from "react";

interface IImageViewer {
  src: string;
  setShowFile: React.Dispatch<React.SetStateAction<boolean>>;
}

const ImageViewer: React.FC<IImageViewer> = ({ src, setShowFile }) => {
  const IMG_URL =
    "https://fe-dev-matching-2021-03-serverlessdeploymentbuck-t3kpj3way537.s3.ap-northeast-2.amazonaws.com/public";

  const onClick = () => {
    setShowFile(false);
  };

  return (
    <div className="Modal ImageViewer" onClick={onClick}>
      <div className="content">
        <img src={IMG_URL + src} alt="imageViewer" />
      </div>
    </div>
  );
};

export default ImageViewer;
