import React, { useState, useEffect } from 'react';
import './App.css';

function GalleryPage({ isVisible }) {
  return (
    <>
      <div className={isVisible ? 'visible' : 'hidden'} style={{ overflow: 'auto', maxHeight: '1000px' }}>
        {isVisible ? (
          <iframe id="iframeid" loading="lazy" src="./../another-page.html" width="100%" height="1000px" frameBorder="0"></iframe>
        ) : (
          <div style={{ width: '100%', height: '1000px' /* Set your desired height */ }}></div>
        )}

        <div className='BottomBar'>
          <img src="./SUNSbtm.png" className="logoBtm" alt="SUNS" />
        </div>
      </div>
    </>
  );
}

export default GalleryPage;
