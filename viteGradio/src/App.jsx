// App.js
import React, { useState } from 'react';
import Header from './Header';
import VisualisationPage from './VisualisationPage';
import ReviewPage from './ReviewPage';
import PromptPage from './PromptPage';
import Viewer3D from './3Dviewer';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

//import ThreeJSComponent from './multiple3D';

// import GeneratePage from './components/GeneratePage';
import './App.css';

function App() {
  const [currentPage, setCurrentPage] = useState('Visualisation');

  const handleButtonClick = (page) => {
    setCurrentPage(page);
  };

  return (
    <>
      <div>
        <Header onPageButtonClick={handleButtonClick} style={{zIndex:'100'}}/>
        {/* <ThreeJSComponent/> */}
        <VisualisationPage onPageButtonClick={handleButtonClick} isVisible={currentPage === 'Visualisation'} />
        <ReviewPage isVisible={currentPage === 'Review'} />
        <PromptPage isVisible={currentPage === 'Prompt'} />
        <Viewer3D isVisible={currentPage === 'Generate'} />
       
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
