import * as THREE from 'three';

// import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
// import { GUI } from 'three/examples/jsm/libs/lil-gui.module.min.js';

import MyTexture from  "./../images/result.png";
import MyDepth from  "./../images/depth.png";

import './App.css';
 const renderer = new THREE.WebGLRenderer({ antialias: true });

function Render3D(isVisible) {
    let mesh;
    let material;
    let image_ar;

    const settings = {
        metalness: 0.0,
        roughness: 0.14,
        ambientIntensity: 0.85,
        displacementScale: 5, 
        displacementBias: -0.5,
        // emissive: 0xffffff,
    };

    // init
    const camera = new THREE.PerspectiveCamera( 50, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.z = 8.5;

    const scene = new THREE.Scene();

    // const ambientLight = new THREE.AmbientLight( 0xffffff, 4 );
    // scene.add( ambientLight );

    // const pointLight = new THREE.PointLight( 0xff0000, 1 );
    // pointLight.position.z = 2500;
    // scene.add( pointLight );
    scene.background = new THREE.Color( 0xffffff );
    // const renderer = new THREE.WebGLRenderer( { antialias: true } );
    renderer.setSize( window.innerWidth/2, window.innerHeight/2 );
    renderer.setAnimationLoop( animation );
    // renderer.toneMapping = THREE.ACESFilmicToneMapping;
    // renderer.toneMappingExposure = 1;
    // renderer.outputColorSpace = THREE.SRGBColorSpace;
    document.body.appendChild( renderer.domElement )

    // animation
    window.addEventListener("mousemove", onmousemove, false);
    var plane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0.5); // it's up to you how you will create THREE.Plane(), there are several methods
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


    // orbit controls
    // const controls = new OrbitControls( camera, renderer.domElement );
    // controls.enableZoom = false;
    // controls.enableDamping = false;


    const image = new Image();
    const image2 = new Image();
    (image.onload) = function() { 

        if (mesh) {
            mesh.geometry.dispose();
            mesh.material.dispose();
            scene.remove( mesh );
        }
        
        image_ar = image.width / image.height ;
        
        const ctx = document.createElement('canvas').getContext('2d');
        ctx.canvas.width = image.width;
        ctx.canvas.height = image.height;
        ctx.drawImage(image, 0, 0);
        const myrgbmap = new THREE.CanvasTexture(ctx.canvas);

        const ctx2 = document.createElement('canvas').getContext('2d');
        ctx2.canvas.width = image2.width;
        ctx2.canvas.height = image2.height;
        ctx2.drawImage(image2, 0, 0);
        const mydepthmap = new THREE.CanvasTexture(ctx2.canvas);

        
        // material
        material = new THREE.MeshStandardMaterial( {
            color: 0xaaaaaa,
            map: myrgbmap,
            displacementMap: mydepthmap,
            emissive: 0xffffff,
            emissiveIntensity: 0.9, 
            emissiveMap :  myrgbmap,
            roughness: settings.roughness,
            metalness: settings.metalness,
            displacementScale: settings.displacementScale,
            displacementBias: settings.displacementBias,
            side: THREE.DoubleSide
        } );

        // generating geometry and add mesh to scene
        const geometry = new THREE.PlaneGeometry( 10, 10, 512, 512 );
        mesh = new THREE.Mesh( geometry, material );
        mesh.scale.y = 1.0 / image_ar;
        mesh.scale.multiplyScalar( 0.5);
        scene.add( mesh );
        
    }
    image.src = MyTexture;
    image2.src = MyDepth;
}

function Viewer3D({ isVisible }) {
    // console.log("called ")
    renderer.clear();
    renderer.setSize( 0, 0);
  
    return (
      <>
        {isVisible ? (
            <div style={{ position: 'static', display: 'inline-block' }}>
            <Render3D isVisible={isVisible} />
            </div>
        ) : null}
       {/* <iframe src="./../another-page.html" width="100%" height="1000px" frameborder="0"></iframe> */}
      </>
    );
  }

  export default Viewer3D;