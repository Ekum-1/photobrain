import React from "react";
import "./ImageLinkForm.css"

const ImageLinkForm = ({ inputChange, pictureSubmit }) => {
  return (
		<div>
			<p className="f3">
				{'This Magic Brain will detect faces in your pictures. Give it a try!'}
			</p>
			<div className="pa3 br3 shadow-5 center form">
				<input type="text" className="f4 pa2 w-70" onChange={inputChange}/>
				<button 
					className="w-30 grow f4 ph2 pv2 bg-animate hover-bg-light-pink"
					onClick={pictureSubmit}
				>Detect</button>
			</div>
		</div>
  )
}

export default ImageLinkForm;