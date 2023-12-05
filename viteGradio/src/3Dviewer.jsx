import * as THREE from 'three';
import {useEffect, useState} from 'react';

import './App.css';
const renderer = new THREE.WebGLRenderer({ antialias: true });


async function loadTextures() {
  const response = await fetch('../images/names.json');
  const names = await response.json();

  let highestNumber = 0;
  for (const name of names) {
      const match = name.match(/(\d+)/);
      if (match) {
          const number = parseInt(match[0]);
          if (number > highestNumber) {
              highestNumber = number;
          }
      }
  }

  const resultImagePath = `../images/result${highestNumber}.png`;
  const depthImagePath = `../images/depth${highestNumber}.png`;

  const amap = new THREE.TextureLoader().load(resultImagePath);
  const dmap = new THREE.TextureLoader().load(depthImagePath);

  return { amap, dmap };
}

function createMesh(amap, dmap) {
  const settings = {
      metalness: 0,
      roughness: 10,
      ambientIntensity: 0,
      displacementScale: 4,
      displacementBias: -0.5,
  };

  const material = new THREE.MeshStandardMaterial({
      color: 0xaaaaaa,
      map: amap,
      displacementMap: dmap,
      emissive: 0xaaaaaa,
      emissiveIntensity: 2,
      emissiveMap: amap,
      roughness: settings.roughness,
      metalness: settings.metalness,
      displacementScale: settings.displacementScale,
      displacementBias: settings.displacementBias,
      side: THREE.DoubleSide,
  });

  const geometry = new THREE.PlaneGeometry(10, 10, 512, 512);
  const mesh = new THREE.Mesh(geometry, material);
  mesh.scale.x = window.innerWidth / 1000;
  mesh.frustrumCulled = false;
  mesh.position.set(0.6, 0.8, 0);

  return mesh;
}

function Viewer3D(props) {
  const [loaded, setLoaded] = useState(false);
  var isVisible = props.isVisible
  loadTextures()
  function Render3D() {

    renderer.setSize(0, 0);
    renderer.clear();
      const render = async () => {
          const { amap, dmap } = await loadTextures();
          const mesh = createMesh(amap, dmap);

          // init
          const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);
          camera.position.z = 13.5;

          const scene = new THREE.Scene();
          scene.background = new THREE.Color(0xffffff);
          renderer.setSize(window.innerWidth / 2, window.innerHeight / 2);
          renderer.setAnimationLoop(animation);
          renderer.setPixelRatio(window.devicePixelRatio);
          document.body.appendChild(renderer.domElement);

          // animation
          window.addEventListener('mousemove', onmousemove, false);
          const plane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0.5);
          const raycaster = new THREE.Raycaster();
          const mouse = new THREE.Vector2();
          const intersectPoint = new THREE.Vector3();

          function onmousemove(event) {
              mouse.x = (event.clientX / window.innerWidth) - 1;
              mouse.y = -(event.clientY / window.innerHeight) - 1;
              raycaster.setFromCamera(mouse, camera);
              raycaster.ray.intersectPlane(plane, intersectPoint);
              mesh.lookAt(intersectPoint);
          }

          function animation(time) {
              renderer.render(scene, camera);
          }

          function onWindowResize() {
              const aspect = window.innerWidth / window.innerHeight;
              camera.aspect = aspect;
              camera.updateProjectionMatrix();
              renderer.setSize(window.innerWidth / 2, window.innerHeight / 2);
          }

          window.addEventListener('resize', onWindowResize);

          // Load the mesh into the scene
          scene.add(mesh);

          setLoaded(true);
      };

      render();

      // Cleanup function
      return () => {
          // Dispose of renderer and its resources
          renderer.dispose();
          renderer.setSize(0, 0);
          renderer.clear();
         
      };
    }
    
    if (isVisible==false) {

    renderer.setSize(0, 0);
    renderer.clear();
    }
    var newTitleList = null
    function updateTitles() {
      const titleInput = document.getElementById('titleInput');
      const newTitle = titleInput.value;
      if (!localStorage.script) {
        localStorage.script = JSON.stringify([
          "The Original One",
          "My Lantern Shop",
          "Plain Test",
          "Street Corner",
          "A Peranakan Garden",
          "Peranakan cafe",
          " ",
          " ",
          "A french cafe",
          " ",
          " ",
          " ",
          " ",
          " ",
          " ",
          " ",
          " ",
          " ",
          "The Last one"
        ]
        ) ;
      }  
      localStorage.clear();
      newTitleList = JSON.parse(localStorage.script) ;
      console.log("help", newTitleList);
      newTitleList.push(newTitle);
      console.log(newTitleList)

    saveScript();
    }
    
    function saveScript() {
      localStorage.clear();
      localStorage.script = JSON.stringify(newTitleList) ;
    }
  
    return (
      <>
        { isVisible ? (
            <div>
                <div style={{ top: '-10%', position: 'static', display: 'inline-block' }}>
                    <Render3D isVisible={isVisible} />
                </div>
                <div className='BottomBar' style={{position: 'fixed'}}>
                    <img src="./SUNSbtm.png" className="logoBtm" alt="SUNS" style={{padding:'0.5% 1% 1% 1%'}} />
                </div>
                {/* Add input field and button */}
                <div style={{ position: 'fixed', top: '70%', left: '50%', transform: 'translateX(-50%)', textAlign: 'center', width:'90%' }}>
                    <input type="text" id="titleInput" placeholder="Enter a title for your shop" className='inputPrompt' />
                    <button 
                    onClick={() => {
                        props.onPageButtonClick('Gallery');
                        updateTitles();
                    }}
                    style={{ position:'fixed', textAlign: 'center', marginTop:'1%' }} >Next</button>
                </div>
            </div>
            
        ) : null}
     
      </>
    );
  }

  export default Viewer3D;