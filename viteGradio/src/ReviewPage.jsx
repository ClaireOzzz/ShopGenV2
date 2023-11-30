import React, { useState } from 'react';
import Test from './components/test';
import ImageGenerationForm from './components/sdxl';
import Original from './components/original';
import Header from './Header';
import './App.css';

function ReviewPage({ isVisible }) {
  
  return (
    <>
      <div className={isVisible ? 'visible' : 'hidden'}>
      {/* <gradio-app src="https://claireozzz-sdxl-control-loras.hf.space"></gradio-app> */}
      </div>
    </>
  );
}

export default ReviewPage;