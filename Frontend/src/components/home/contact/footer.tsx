import React from "react";
import { FaPhone } from 'react-icons/fa';
import { IoLocationSharp, IoMail } from 'react-icons/io5';

import { IonIcon } from "@ionic/react";
import { logoFacebook, logoInstagram, logoYoutube } from "ionicons/icons";

import { Link } from "react-router-dom";

import logo from '../../../images/logo.png';
import EuRcc from '../../../images/RCC_Logo.png'

import "./Footer.css"


const Footer: React.FC = () => {
	return (
		<footer className="footer-distributed">

			<div className="footer-left">

				<h3>3D<span>Factory</span></h3>
				<p className="footer-company-name">Be part of the solution, not pollution © 2023</p>

				<Link to="/home">
					<img id="company-logo" src={logo} />
				</Link>
			</div>

			<div className="footer-center">

				<div>
					<i></i>
					<p><IoLocationSharp /> Bitola, North Macedonia</p>
				</div>

				<div>
					<i></i>
					<p><FaPhone /> +389 75 444 204</p>
				</div>

				<div>
					<i></i>
					<p><IoMail /> <a href="mailto:art3dfactory@gmail.com">art3dfactory@gmail.com</a></p>
				</div>

			</div>

			<div className="footer-right">

				<div className="footer-icons">
					<a href="https://www.facebook.com/profile.php?id=100085664212659" target="_blank"><IonIcon size="large" icon={logoFacebook} /></a>
					<a href="https://instagram.com/3dprints_art?igshid=YmMyMTA2M2Y=" target="_blank"><IonIcon size="large" icon={logoInstagram} /></a>
					<a href="https://www.youtube.com/channel/UCO95fXFiVyZ3ifiX2ixsiUw" target="_blank"><IonIcon size="large" icon={logoYoutube} /></a>
				</div>
				<a target="_blank"><img className="rcc-logo-contact"src={EuRcc} /></a>
			</div>

		</footer>
	);
}

export default Footer;