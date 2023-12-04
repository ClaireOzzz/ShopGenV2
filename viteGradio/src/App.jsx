// App.js
import React, { useState } from 'react';
import Header from './Header';
import VisualisationPage from './VisualisationPage';
import GalleryPage from './GalleryPage';
import PromptPage from './PromptPage';
import Viewer3D from './3Dviewer';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import './App.css';

function App() {
  const [currentPage, setCurrentPage] = useState('Visualisation');

  const handleButtonClick = (page) => {
    setCurrentPage(page);
  };

  return (
    <>
      <div>
        <Header onPageButtonClick={handleButtonClick} currentPage={currentPage} style={{zIndex:'100'}}/>
        <VisualisationPage onPageButtonClick={handleButtonClick} isVisible={currentPage === 'Visualisation'} />
        <PromptPage onPageButtonClick={handleButtonClick} isVisible={currentPage === 'Prompt'} />
        <Viewer3D onPageButtonClick={handleButtonClick} isVisible={currentPage === 'Generate'} />
        <GalleryPage isVisible={currentPage === 'Gallery'} />
       
        <Router>
        <div>
         
          <Routes>
            <Route path="/generate" element={<Viewer3D/>} />
          </Routes>
        </div>
      </Router>
     
      </div>
    </>
  );
}

export default App;
