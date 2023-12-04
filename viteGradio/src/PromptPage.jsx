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
      <div className={props.isVisible ? 'visible' : 'hidden'} style={{ overflow: 'hidden' }} >
        <gradio-app eager="true" src="https://aa3ea81ff3eadca8ae.gradio.live/"></gradio-app>
        <button className='nextbutton'
          onClick={() => props.onPageButtonClick('Generate')}
         >Next</button>
     

          <div className="modelcontainer">
            <div className="modelpanel panel1 active">
              <h3>Porcelain</h3>
            </div>
            <div className="modelpanel panel2">
              <h3>oldComic</h3>
            </div>
            <div className="modelpanel panel3">
              <h3>Black & White House</h3>
            </div>
            <div className="modelpanel panel4">
              <h3>allImages</h3>
            </div>
          </div>
        {/* <iframe src="./../another-page.html" width="100%" height="1000px" frameBorder="0"></iframe> */}
        

        <div className='BottomBar'style={{backgroundColor: 'transparent'}}  >
          <img src="./SUNSbtm.png" className="logoBtm" alt="SUNS" style={{top:'82%', position:'fixed', width: '100px'}} />
        </div>
      
      </div>
    </>
  );
}

export default PromptPage;
