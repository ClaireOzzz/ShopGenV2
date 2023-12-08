import React, { useState, useEffect } from 'react';
import './App.css';

function PromptPage(props) {
  // Mini gallery
  const [isSlideoutOpen, setIsSlideoutOpen] = useState(false);

  const handleToggle = () => {
    setIsSlideoutOpen(!isSlideoutOpen);
  };
  const handleClose = () => {
    setIsSlideoutOpen(false);
  };

  // Visual model style panales
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
      <div className={props.isVisible ? 'visible' : 'hidden'} style={{ overflow: 'hidden', height:'870px'}} >
        <gradio-app eager="true" src="https://48a672e906b7b5eab4.gradio.live" ></gradio-app>

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
        
            <button className='nextbutton' onClick={() => props.onPageButtonClick('Generate')}>
              Next
            </button>
            <button type="button" className="nextbutton" style={{marginRight:'100px'}} onClick={handleToggle}>
              View Gallery
            </button>
            
            <div id="slideout" className={isSlideoutOpen ? 'on' : ''}>
                <button type="button"  style={{left:'70%', fontWeight:'bolder', fontSize:'110%'}} onClick={handleClose}>
                  x
                </button>
                <iframe id="iframeid" loading="lazy" src="./../another-page.html" width="120%" height="1000px" style={{top:'4%', border:'none', overflowX:'hidden'}} ></iframe>
            </div>
         
        <div className='BottomBar'style={{ position:'fixed' ,zIndex:'3001'}}  >
          <img src="./SUNSbtm.png" className="logoBtm" alt="SUNS" style={{top:'82%', position:'fixed', width: '100px'}} />
        </div>
      
      </div>
    </>
  );
}

export default PromptPage;
