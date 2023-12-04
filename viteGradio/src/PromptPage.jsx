import React, { useState, useEffect } from 'react';
import Test from './components/test';
import ImageGenerationForm from './components/sdxl';
import Original from './components/original';
import Header from './Header';
import './App.css';

function PromptPage(props) {

  const panels = document.querySelectorAll('.modelpanel');

  panels.forEach(panel => {
      panel.addEventListener('click', () => {
          removeActiveClasses();
          panel.classList.add('active');
      });
  });

  function removeActiveClasses () {
      panels.forEach(panel => {
          panel.classList.remove('active');
      })
  }

  return (
    <>
      <div className={props.isVisible ? 'visible' : 'hidden'} style={{ overflow: 'hidden'}} >
        <gradio-app eager="true" src="https://7df0f531808e92559e.gradio.live/" ></gradio-app>
        <button className='nextbutton'
          onClick={() => props.onPageButtonClick('Generate')}
         >Next</button>
     

          <div className="modelcontainer">
            <div className="modelpanel panel1 active">
              <h3>Porcelain</h3>
            </div>
            <div className="modelpanel panel2">
              <h3>Comic</h3>
            </div>
            <div className="modelpanel panel3">
              <h3>Black & White House</h3>
            </div>
            <div className="modelpanel panel4">
              <h3>All Peranakan Data</h3>
            </div>
          </div>
        
        

        <div className='BottomBar'style={{ position:'fixed' ,zIndex:'3001'}}  >
          <img src="./SUNSbtm.png" className="logoBtm" alt="SUNS" style={{top:'82%', position:'fixed', width: '100px'}} />
        </div>
      
      </div>
    </>
  );
}

export default PromptPage;
