import React from "react";
import './FaceRecognition.css';

const FaceRecognition = ({ imageUrl, faceBoxes }) => {
  return (
  <div className="ma relative flex justify-center">
      <div className="absolute mt2">
        <img id="inputImage" src={imageUrl} alt='' width='500px' height='auto'/>
        {faceBoxes.map((faceBox, index) => (
          <div
            key={index}
            className="bounding-box"
            style={{
              top: faceBox.topRow,
              right: faceBox.rightCol,
              bottom: faceBox.bottomRow,
              left: faceBox.leftCol
            }}
          ></div>
        ))}
      </div>
    </div>
  )
}

export default FaceRecognition;