import React, { useState, useEffect } from 'react';
import Test from './components/test';
import ImageGenerationForm from './components/sdxl';
import Original from './components/original';
import Header from './Header';
import './App.css';

function PromptPage({ isVisible }) {
  const handleButtonClick = () => {
    // Calculate the scroll position to scroll to half the page
    const halfPageScroll = window.innerHeight * 0.8;
    //console.log(window.scroll)
    // Scroll down to half the page
    window.scrollTo({
      top: 1000,
      behavior: 'smooth', // Add smooth scrolling animation
    });
  };

  

  return (
    <>
      <div className={isVisible ? 'visible' : 'hidden'} style={{ overflow: 'auto', maxHeight: '1000px' }}>
        {/* <gradio-app eager="true" src="https://48d319625c8a1616e3.gradio.live/"></gradio-app> */}
        <button onClick={handleButtonClick}>Scroll to Half Page</button>
        <h1>LOADING</h1>
        <iframe src="./../another-page.html" width="100%" height="1000px" frameBorder="0"></iframe>
      
      </div>
    </>
  );
}

export default PromptPage;
