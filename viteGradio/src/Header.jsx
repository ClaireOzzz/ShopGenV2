// Header.js
import React, { useState } from 'react';
import './App.css';

function Header({ onPageButtonClick, currentPage }) {
  return (
    <>
      <div style={{ paddingBottom: '2%', borderBottom: '1px solid #000000' }}>
        <img src="./SUNS.png" className="logo" alt="SUNS" />
        <div className="buttonContainer">
          <div className={`buttonGroup ${currentPage === 'Visualisation' ? 'active' : ''}`}>
            <button
              className={`circularButton ${currentPage === 'Visualisation' ? 'activeButton' : ''}`}
              onClick={() => onPageButtonClick('Visualisation')}
            >
              1
            </button>
            <div className="buttonText">Visualisation</div>
          </div>
          <div className={`buttonGroup ${currentPage === 'Prompt' ? 'active' : ''}`}>
            <button
              className={`circularButton ${currentPage === 'Prompt' ? 'activeButton' : ''}`}
              onClick={() => onPageButtonClick('Prompt')}
            >
              2
            </button>
            <div className="buttonText">Prompt</div>
          </div>

          <div className={`buttonGroup ${currentPage === 'Generate' ? 'active' : ''}`}>
            <button
              className={`circularButton ${currentPage === 'Generate' ? 'activeButton' : ''}`}
              onClick={() => onPageButtonClick('Generate')}
            >
              3
            </button>
            <div className="buttonText">Generate</div>
          </div>

          <div className={`buttonGroup ${currentPage === 'Gallery' ? 'active' : ''}`}>
            <button
              className={`circularButton ${currentPage === 'Gallery' ? 'activeButton' : ''}`}
              onClick={() => onPageButtonClick('Gallery')}
            >
              4
            </button>
            <div className="buttonText">Gallery</div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;
