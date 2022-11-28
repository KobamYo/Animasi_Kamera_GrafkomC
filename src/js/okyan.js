import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
const renderer = new THREE.WebGLRenderer();

renderer.setSize( window.innerWidth, window.innerHeight );

 document.body.appendChild( renderer.domElement );

 const scene = new THREE.Scene();
 const camera = new THREE.PerspectiveCamera( 93,1, 0.1, 1000 );
//  const camera = new THREE.PerspectiveCamera( 93, window.innerWidth / window.innerHeight, 0.1, 1000 );
 console.log(camera.position);
 console.log(camera.rotation);
//  camera.position.set()

//  const orbit = new OrbitControls(camera, renderer.domElement);

 const axesHelper = new THREE.AxesHelper( 5 );
 scene.add(axesHelper);

 camera.position.set(3,3,0);
 camera.rotation.x = 5;
 camera.lookAt(0,0,0);
//  orbit.update();
 const boxGeometry = new THREE.BoxGeometry(1,1,1);
 const boxMaterial = new THREE.MeshBasicMaterial({color: 0xcc00aa});
 const box = new THREE.Mesh(boxGeometry, boxMaterial);
 scene.add(box);
 box.position.y = 1;

 const planeGeometry = new THREE.PlaneGeometry( 30, 30, 32 );
 const planeMaterial = new THREE.MeshBasicMaterial( {color: 0xffffff, side: THREE.DoubleSide} );
 const plane = new THREE.Mesh( planeGeometry, planeMaterial );
 scene.add( plane );
 plane.rotation.x = -0.5*Math.PI;

 const sphereGeometry = new THREE.SphereGeometry( 4, 40, 40 );
 const sphereMaterial = new THREE.MeshBasicMaterial( {color: 0xffff00, wireframe: true} );
 const sphere = new THREE.Mesh( sphereGeometry, sphereMaterial );
 scene.add( sphere );

 const gridHelper = new THREE.GridHelper( 40, 40 );
 scene.add( gridHelper );

 function animate(time){
    box.rotation.x += (time%10/1000);
    box.rotation.y += (time%10/1000);
    box.rotation.z += (time%10/1000);
    renderer.render(scene, camera);
 }
renderer.setAnimationLoop(animate);
//  renderer.render(scene, camera);