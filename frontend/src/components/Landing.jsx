import React, { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useNavigate } from 'react-router-dom'; 

export const Landing = () => {
  const navigate = useNavigate();
  const containerAnimation = useAnimation();
  const leftImageAnimation = useAnimation();
  const rightImageAnimation = useAnimation();
  const bottomImageAnimation = useAnimation();
  const socialImageAnimation = useAnimation();
  const logoImageAnimation = useAnimation();
  const techspardhaImageAnimation = useAnimation();
  const microImageAnimation = useAnimation();
  const rocketImageAnimation = useAnimation();
  const backImageAnimation = useAnimation();
  const microTextImageAnimation = useAnimation();

  function loginStatus() {
    if(localStorage.getItem('userId') ?? "" !== "") {
      window.location.href = '/lobby';
    }
  }
  loginStatus();

  useEffect(() => {
    const animatePage = async () => {

      // Animation sequence
      await containerAnimation.start({ background: '#000' });

      // Left and Right Images appear simultaneously
      await Promise.all([
        leftImageAnimation.start({ left: '8.5%', opacity: 1 }, { duration: 2 }),
        rightImageAnimation.start({ right: '8.5%', opacity: 1 }, { duration: 2 }),
      ]);

      // Left and Right Image Collapse simultaneously
      await Promise.all([
        leftImageAnimation.start({ width: '30%', height: '70%', top: '15%', opacity: 0.5, left: '25%' }, { duration: 0.75 }),
        rightImageAnimation.start({ width: '30%', height: '70%', top: '15%', opacity: 0.5, right: '25%' }, { duration: 0.75 }),
      ]);

      await Promise.all([
        bottomImageAnimation.start({ opacity: 1, bottom: '35%' }, { duration: 1.5 }),
        socialImageAnimation.start({ opacity: 1, right: '5%' }, { duration: 1.5 }),
        logoImageAnimation.start({ opacity: 1 }, { duration: 1.5 }),
        techspardhaImageAnimation.start({ opacity: 1 }, { duration: 1.5 }),
        microImageAnimation.start({ opacity: 1 }, { duration: 1.5 }),
        microTextImageAnimation.start({ opacity: 1 }, { duration: 1.5 }),
      ]);

      await Promise.all([
        Promise.all([
          leftImageAnimation.start({ opacity: 0 }, { duration: 1.5 }),
          rightImageAnimation.start({ opacity: 0 }, { duration: 1.5 }),
          bottomImageAnimation.start({ opacity: 0 }, { duration: 1.5 }),
        ]),
        rocketImageAnimation.start({ opacity: 1, top: '15%' }, { duration: 1.75 }),
        backImageAnimation.start({ opacity: 1, top: '51.5%' }, { duration: 1.75, y: [500, 0] }),
      ]);

      // You can add more animations for the new gif sliding in
    };

    animatePage();
  }, [
    containerAnimation,
    leftImageAnimation,
    rightImageAnimation,
    bottomImageAnimation,
    socialImageAnimation,
    logoImageAnimation,
    techspardhaImageAnimation,
    microImageAnimation,
    rocketImageAnimation,
    backImageAnimation,
    microTextImageAnimation,
    navigate, // Add navigate to dependencies
  ]);

  return (
    <motion.div
      className="landing-container"
      style={{ background: '#000', width: '100%', height: '100%', position: 'absolute' }}
      animate={containerAnimation}
    >
      {/* Left Image */}
      <motion.img
        src="assets/left.svg"
        alt="left"
        style={{
          position: 'absolute',
          width: '50%',
          height: '105%',
          left: '0%',
          top: '-5%',
          opacity: 0, // initially hide
        }}
        animate={leftImageAnimation}
      />

      {/* Right Image */}
      <motion.img
        src="assets/right.svg"
        alt="right"
        style={{
          position: 'absolute',
          width: '50%',
          height: '105%',
          right: '0%',
          top: '-5%',
          opacity: 0, // initially hide
        }}
        animate={rightImageAnimation}
      />

      {/* Bottom Image */}
      <motion.img
        src="assets/bottom.svg"
        alt="bottom"
        style={{
          position: 'absolute',
          width: '30%',
          height: '35%',
          right: '34%',
          bottom: '0%',
          opacity: 0, // initially hide
        }}
        animate={bottomImageAnimation}
      />

      {/* Social Image */}
      <motion.img
        src="assets/social.png"
        alt="social"
        style={{
          position: 'absolute',
          width: '5.4%',
          height: '25%',
          right: '0%',
          top: '39%',
          opacity: 0,
          zIndex: 1, // initially hide
        }}
        animate={socialImageAnimation}
      />

      {/* Logo Image */}
      <motion.img
        src="assets/logo.svg"
        alt="logo"
        style={{
          position: 'absolute',
          width: '14%',
          height: '14%',
          left: '0%',
          top: '5%',
          opacity: 0, // initially hide
        }}
        animate={logoImageAnimation}
      />

      {/* Techspardha Text*/}
      <motion.div
        style={{
          fontFamily: 'Inter',
          fontStyle: 'normal',
          fontWeight: '800',
          fontSize: '24px',
          lineHeight: '29px',
          color: 'white', 
          position: 'absolute',
          width: '6.5%',
          height: '14%',
          left: '12%',
          top: '8%',
          opacity: 0, // initially hide
        }}
        animate={techspardhaImageAnimation}
      >
        TechSpardha’24
      </motion.div>
 

      {/* Micro Image */}
      <motion.img
        src="assets/micro.png"
        alt="micro"
        style={{
          position: 'absolute',
          width: '6.5%',
          height: '14%',
          right: '5%',
          top: '5%',
          opacity: 0, // initially hide
        }}
        animate={microImageAnimation}
      />

      {/* Micro Text Image */}
      <motion.div
        style={{
          fontFamily: 'Inter',
          fontStyle: 'normal',
          fontWeight: '800',
          fontSize: '24px',
          lineHeight: '29px',
          color: 'white',
          position: 'absolute',
          width: '6.5%',
          height: '14%',
          right: '4.8%',
          top: '18.5%',
          opacity: 0, // initially hide
        }}
        animate={microTextImageAnimation}
      >
        Microbus
      </motion.div>  

      {/* Rocket Image */}
      <motion.img
        src="assets/rocket.png"
        alt="rocket"
        style={{
          position: 'absolute',
          width: '30%',
          height: '50%',
          bottom: '0%',
          left: '35%',
          zIndex: '1',
          opacity: 0, // initially hide
        }}
        animate={rocketImageAnimation}
      />

      {/* Back Image */}
      <motion.div
        style={{
          background: 'linear-gradient(0deg, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), linear-gradient(94.68deg, rgba(7, 39, 78, 0.88) 0.25%, #06000E 30.71%, rgba(18, 4, 40, 0.42) 67.49%, rgba(7, 33, 97, 0.72) 100%)',
          position: 'absolute',
          width: '100%',
          display:'flex',
          // alignItems:'center',
          justifyContent:'center',
          height: '48.5%',
          bottom: '0%',
          left: '0%',
          zIndex: '0',
          opacity: 0, // initially hide
        }}
        animate={backImageAnimation}
      >
        <motion.div
          style={{
            position: 'absolute',
            fontFamily: 'Montserrat',
            fontSize: '3.8rem',
            fontWeight: '550',
            color: 'white',
            padding: '10px 15px',
            margin: '10px',
            top: '23%',
          }}
        >
          Get, Set and Go !!!!
        </motion.div>

        {/* Buttons for Login and Signup */}
        <motion.button
          style={{
            position: 'absolute',
            fontFamily: 'Montserrat',
            fontSize: '2rem',
            fontWeight: '550',
            background: '#fff',
            color: '#000',
            padding: '10px 15px',
            margin: '10px',
            borderRadius: '18px',
            left: '40%',
            top: '61%',
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={()=> navigate('/login')}
        >
          Login
        </motion.button>
        <motion.button
          style={{
            position: 'absolute',
            fontFamily: 'Montserrat',
            fontSize: '2rem',
            fontWeight: '550',
            background: '#fff',
            color: '#000',
            padding: '10px 15px',
            margin: '10px',
            borderRadius: '18px',
            right: '40%',
            top: '61%',
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate('/signup')}
        >
          Signup
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

export default Landing;