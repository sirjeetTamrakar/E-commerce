import React from "react";
import styles from "../styles/Footer.module.css";

const Footer = () => {
	return (
		<div className={styles.background}>
			<div className={styles.main}>
				<div
					className={styles.flex}
				>
					<div>Your Logo</div>
					<div className={styles.address}>
						<small>Lazimpat, Kathmandu 44600, Nepal</small>
						<small>Phone: +977-1-4410151 </small>
						<small>Fax: +977-1-4412691</small>
					</div>
					<div className={styles.icons}>
						<i
							className='devicon-linkedin-plain'
						></i>
						<i
							className='devicon-chrome-plain'
						></i>
						<i
							className='devicon-codeigniter-plain'
						></i>
						<i
							
							className='devicon-coffeescript-original'
						></i>
					</div>
				</div>
				<div
	
					className={styles.flex}
				>
					<div>Categories</div>
					<small>IT & Tech</small>
					<small>Business</small>
					<small>Marketing</small>
					<small>Development</small>
				</div>
				<div
	
					className={styles.flex}
				>
					<div>Useful Links</div>
					<small>Payment & Tax</small>
					<small>Terms of Service</small>
					<small>Your account</small>
					<small>Privacy policy</small>
				</div>
				<div
	
					className={styles.flex}
				>
					<div>Stay Connected</div>
					<input type='text' placeholder='Email address' />
					<div className={styles.phone}>
						<span className='material-icons'>phone</span>
						<small>Call (+51) 801-234-521-007</small>
					</div>
					<div className={styles.phone}>
						<span className='material-icons'>email</span>
						<small>contact@design.com</small>
					</div>
				</div>
			</div>
			<div className={styles.last}>
				<small >
					Created with <span className='material-icons'>favorite_border</span>
					By Srijeet Tamrakar-2021
				</small>
				<div >
					VISA&nbsp;
					<i className='devicon-vuejs-plain'></i>
				</div>
			</div>
		</div>
	);
};

export default Footer;

