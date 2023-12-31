// https://web.blockbench.net/ <- create your basic model here
// export it as a gltf file and drag the exported file into files here
// change the file name in this script file to your new model filename
// press run!

const backgroundColor = 0x0000000;

/*////////////////////////////////////////*/

var renderCalls = [];
var i = 0;
var object;
function render () {
  requestAnimationFrame( render );
  renderCalls.forEach((callback)=>{ callback(); });
  //object.position.set(0, -2+i, -0.75);
  i = i+1;
}
render();

/*////////////////////////////////////////*/

var scene = new THREE.Scene();

var camera = new THREE.PerspectiveCamera( 80, window.innerWidth / window.innerHeight, 0.1, 800 );
camera.position.set(3,3,3);


var renderer = new THREE.WebGLRenderer( { antialias: true } );
renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setClearColor( backgroundColor );//0x );

renderer.toneMapping = THREE.LinearToneMapping;
renderer.toneMappingExposure = Math.pow( 0.7, 5.0 );
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFShadowMap;

window.addEventListener( 'resize', function () {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize( window.innerWidth, window.innerHeight );
}, false );

document.body.appendChild( renderer.domElement);

function renderScene(){ renderer.render( scene, camera ); }
renderCalls.push(renderScene);

/* ////////////////////////////////////////////////////////////////////////// */

var controls = new THREE.OrbitControls( camera );

controls.rotateSpeed = 0.3;
controls.zoomSpeed = 0.9;

controls.minDistance = 3;
controls.maxDistance = 20;

controls.minPolarAngle = 0; // radians
controls.maxPolarAngle = Math.PI /2; // radians

controls.enableDamping = true;
controls.dampingFactor = 0.05;

renderCalls.push(function(){
  controls.update()
});


/* ////////////////////////////////////////////////////////////////////////// */


var light = new THREE.PointLight( 0xffffcc, 20, 200 );
light.position.set( 4, 30, -20 );
scene.add( light );

var light2 = new THREE.AmbientLight( 0x20202A, 20, 100 );
light2.position.set( 30, -10, 30 );
scene.add( light2 );


// const directionalLight = new THREE.DirectionalLight( 0xff0000, 0.9 );
// scene.add( directionalLight )

/* ////////////////////////////////////////////////////////////////////////// */



var loader = new THREE.GLTFLoader();
loader.crossOrigin = true;
loader.load( 'tinker1.glb', function ( data ) {

  
    object = data.scene;
    object.position.set(0, -2, -0.75);


    TweenMax.from( object.position, 3, {
      y: 2,
      yoyo: true,
      repeat: -1,
      ease: 'Power2.easeInOut'
    });

    scene.add( object );
    console.log("loaded")
});
