import * as THREE from 'three';

import MyTexture from  "./../images/result1.png";
import MyDepth from  "./../images/depth1.png";

import './App.css';
 const renderer = new THREE.WebGLRenderer({ antialias: true });

function Render3D(isVisible) {
    let mesh;
    let material;
    let image_ar;

    const settings = {
        metalness: 0,
        roughness: 10,
        ambientIntensity: 0,
        displacementScale: 4, 
        displacementBias: -0.5,
    };

    // init
    const camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.z = 13.5;

    const scene = new THREE.Scene();

    scene.background = new THREE.Color( 0xffffff );
    // const renderer = new THREE.WebGLRenderer( { antialias: true } );
    renderer.setSize( window.innerWidth/2, window.innerHeight/2 );
    renderer.setAnimationLoop( animation );
    renderer.setPixelRatio( window.devicePixelRatio );
    document.body.appendChild( renderer.domElement )

    // animation
    window.addEventListener("mousemove", onmousemove, false);
    var plane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0.5);
    var raycaster = new THREE.Raycaster(); //for reuse
    var mouse = new THREE.Vector2();       //for reuse
    var intersectPoint = new THREE.Vector3();//for reuse

    function onmousemove(event) {
    //get mouse coordinates
        mouse.x = (event.clientX / window.innerWidth)  - 1;
        mouse.y = -(event.clientY / window.innerHeight)- 1;
        raycaster.setFromCamera(mouse, camera);//set raycaster
        raycaster.ray.intersectPlane(plane, intersectPoint); // find the point of intersection
        mesh.lookAt(intersectPoint); // face our arrow to this point
    }

    function animation( time ) {
        renderer.render( scene, camera );
    }

    function onWindowResize() {
        const aspect = window.innerWidth / window.innerHeight;
        camera.aspect = aspect;
        camera.updateProjectionMatrix();

        renderer.setSize( window.innerWidth/2, window.innerHeight/2 );
    }
    window.addEventListener( 'resize', onWindowResize );

    const image = new Image();
    const image2 = new Image();
    (image.onload) = function() { 

        if (mesh) {
            mesh.geometry.dispose();
            mesh.material.dispose();
            scene.remove( mesh );
        }
        
        let amap = new THREE.TextureLoader().load("../images/result1.png")
		let dmap = new THREE.TextureLoader().load("../images/depth1.png")
       
        // material
        material = new THREE.MeshStandardMaterial( {
            color: 0xaaaaaa,
            map: amap,
            displacementMap: dmap,
            emissive: 0xaaaaaa,
            emissiveIntensity: 2.5, 
            emissiveMap :  amap,
            roughness: settings.roughness,
            metalness: settings.metalness,
            displacementScale: settings.displacementScale,
            displacementBias: settings.displacementBias,
            side: THREE.DoubleSide
        } );

        // generating geometry and add mesh to scene
        const geometry = new THREE.PlaneGeometry( 10, 10, 512, 512 );
        mesh = new THREE.Mesh( geometry, material );
        mesh.scale.x = window.innerWidth/1000;
        mesh.frustrumCulled = false
        mesh.position.set(0.6,0.8,0)
        scene.add( mesh );
        
    }
    image.src = MyTexture;
    image2.src = MyDepth;
}

function Viewer3D(props) {
    // console.log("called ")
    renderer.clear();
    renderer.setSize( 0, 0);

    function updateTitles() {
        const titleInput = document.getElementById('titleInput');
        const newTitle = titleInput.value;
      
        // Fetch existing titles
        fetch('../images/titles.json')
          .then(response => response.json())
          .then(existingTitles => {
            // Update titles array
            existingTitles.push(newTitle);
            console.log("existingTitles ", existingTitles)
            // Update titles.json file
            fetch('../images/titles.json', {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json',
              },
              mode: "cors",
              body: JSON.stringify(existingTitles),
            })
              .then(response => response.json())
              .then(data => {
                console.log('Titles updated:', data);
                // Optionally, you can clear the input field after updating
                titleInput.value = '';
              })
              .catch(error => {
                console.error('Error updating titles:', error);
              });
          })
          .catch(error => {
            console.error('Error fetching existing titles:', error);
          });
      }

      var isVisible = props.isVisible;
  
    return (
      <>
        {isVisible ? (
            <div>
                <div style={{ top: '-10%', position: 'static', display: 'inline-block' }}>
                    <Render3D isVisible={isVisible} />
                </div>
                <div className='BottomBar' style={{position: 'fixed'}}>
                    <img src="./SUNSbtm.png" className="logoBtm" alt="SUNS" style={{padding:'0.5% 1% 1% 1%'}} />
                </div>
                {/* Add input field and button */}
                <div style={{ position: 'fixed', top: '70%', left: '50%', transform: 'translateX(-50%)', textAlign: 'center', width:'90%' }}>
                    <input type="text" id="titleInput" placeholder="Enter a title for your shop" style={{ margin:'0', width:'20%', scale:'1.8' }} />
                    <button 
                    onClick={() => props.onPageButtonClick('Gallery')}
                    style={{ position:'fixed', textAlign: 'center', marginTop:'1%' }} >Next</button>
                </div>
            </div>
        ) : null}
       {/* <iframe src="./../another-page.html" width="100%" height="1000px" frameborder="0"></iframe> */}
      </>
    );
  }

  export default Viewer3D;