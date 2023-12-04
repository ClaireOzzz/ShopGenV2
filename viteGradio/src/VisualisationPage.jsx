import React from 'react';
import './App.css';

function VisualisationPage( props ) {
  return (
    <>
      <div className={props.isVisible ? 'visible' : 'hidden'}>
         <video width="95%" height="95%" autoPlay muted playsInline controls={false}>
          <source src="./intro.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        <div className="centered-container">
          <button 
            onClick={() => props.onPageButtonClick('Prompt')}
          >Begin</button>
        </div>
        <div className='BottomBar'>
          <img src="./SUNSbtm.png" className="logoBtm" alt="SUNS" />
        </div>
      </div>
    </>
  );
}

export default VisualisationPage;
