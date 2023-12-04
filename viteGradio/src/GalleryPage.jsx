import React, { useState, useEffect } from 'react';
import Test from './components/test';
import ImageGenerationForm from './components/sdxl';
import Original from './components/original';
import Header from './Header';
import './App.css';

function GalleryPage({ isVisible }) {
  

  return (
    <>
      <div className={isVisible ? 'visible' : 'hidden'} style={{ overflow: 'auto', maxHeight: '1000px' }}>
    
        {/* <button onClick={handleButtonClick}>Scroll to Half Page</button> */}
        {/* <h1>LOADING</h1> */}
        <iframe src="./../another-page.html" width="100%" height="1000px" frameBorder="0"></iframe>
        
        <div className='BottomBar'>
          <img src="./SUNSbtm.png" className="logoBtm" alt="SUNS" />
        </div>
      
      </div>
    </>
  );
}

export default GalleryPage;
