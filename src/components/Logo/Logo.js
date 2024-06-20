import React from "react";
import Tilt from 'react-parallax-tilt';
import brain from './brain.png'
import './Logo.css';

const Logo = () => {
  return (
		<Tilt className="Tilt br2 shadow-2 mt0 ma2">
			<div>
				<img src={brain} alt="logo"></img>
			</div>
		</Tilt>
  )
}

export default Logo;