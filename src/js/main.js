import * as THREE from 'three';
    import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';
    import {GUI} from 'dat.gui';
    
    function main() {
      const canvas = document.querySelector('#c');
      const renderer = new THREE.WebGLRenderer({canvas});
    
      const fov = 65;
      const aspect = 2;
      const near = 0.1;
      const far = 100;
      const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
      // const camera = new THREE.OrthographicCamera(width/ - 2, width / 2, height / 2, height / - 2, 1, 1000);
      camera.position.set(10, 10, 12.0);
    
      class UpGUIHelper {
        constructor(camera) {
          this.camera = camera;
          this.angle = 0;
        }
        get value() {
          return this.angle;
        }
        set value(v) {
          this.angle = v;
          const r = THREE.Math.degToRad(v);
          this.camera.up.set(Math.sin(r), Math.cos(r), 0);
        }
      }
    
      function updateCamera() {
        camera.lookAt(0,0,0);
        camera.updateProjectionMatrix();
      }
    
      const gui = new GUI();
      const upGUIHelper = new UpGUIHelper(camera);
      gui.add(upGUIHelper, 'value', -180, 180).name('angle').onChange(updateCamera);
    
      const controls = new OrbitControls(camera, canvas);
      controls.target.set(0, 0, 0);
      controls.update();
    
      const scene = new THREE.Scene();
      scene.background = new THREE.Color('black');
    
      {
        const planeSize = 40;
    
        const loader = new THREE.TextureLoader();
        const texture = loader.load('https://threejsfundamentals.org/threejs/resources/images/checker.png');
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        texture.magFilter = THREE.NearestFilter;
        const repeats = planeSize / 2;
        texture.repeat.set(repeats, repeats);
    
        const planeGeo = new THREE.PlaneBufferGeometry(planeSize, planeSize);
        const planeMat = new THREE.MeshPhongMaterial({
          map: texture,
          side: THREE.DoubleSide,
        });
        const mesh = new THREE.Mesh(planeGeo, planeMat);
        mesh.rotation.x = Math.PI * -.5;
        scene.add(mesh);
      }
      
        const cubeSize = 4;
        const cubeGeo = new THREE.BoxBufferGeometry(cubeSize, cubeSize, cubeSize);
        const cubeMat = new THREE.MeshPhongMaterial({color: '#8AC'});
        // const cubeMat = new THREE.MeshBasicMaterial({color:0x00CC00});
        const mycube = new THREE.Mesh(cubeGeo, cubeMat);
        mycube.position.set(cubeSize + 1, cubeSize / 2, 0);
        scene.add(mycube);
      console.log(camera);
    
      {
        const color = 0xFFFFFF;
        const intensity = 1;
        const light = new THREE.DirectionalLight(color, intensity);
        light.position.set(0, 10, 0);
        light.target.position.set(-5, 0, 0);
        scene.add(light);
        scene.add(light.target);
      }
    
      function resizeRendererToDisplaySize(renderer) {
        const canvas = renderer.domElement;
        const width = canvas.clientWidth;
        const height = canvas.clientHeight;
        const needResize = canvas.width !== width || canvas.height !== height;
        if (needResize) {
          renderer.setSize(width, height, false);
        }
        return needResize;
      }
      function euler_center(meshs, rc_x, rc_y, rc_z){
        meshs.position.x += rc_x;
        meshs.position.y += rc_y;
        meshs.position.z += rc_z;

      }
      function euler_xyz(meshs, angX_theta,angY_psi,angZ_phi){
        cZ = Math.cos(angZ_phi * Math.PI/180.0);
        sZ = Math.sin(angZ_phi * Math.PI/180.0);
        cX = Math.cos(angX_theta * Math.PI/180.0);
        sX = Math.sin(angX_theta * Math.PI/180.0);
        cY = Math.cos(angY_psi * Math.PI/180.0);
        sY = Math.sin(angY_psi * Math.PI/180.0);
        
        X = meshs.position.x, Y = meshs.position.y, Z = meshs.position.z, norm = 1;
        meshs.position.x = X*(cZ*cY - sZ*sY*sX) + Z*(cZ*sY + cY*sZ*sX) - Y*(cX * sZ);
        meshs.position.y = X*(cY*sZ + cZ*sY*sX) + Z*(sZ*sY - cZ*cY*sX) + Y*(cZ*cX);
        meshs.position.z = Y*(sX) + cY*Z*cX - X*cX*sY;
        
        }
        
        function setnewradius(meshs, nx,ny,nz){
          meshs.position.set(nx,ny,nz);
        }
        setnewradius(mycube, 0, 2, 0);
      function render() {
            
            // mycube.scale.set(0.2,0.2,0.2);
            // mycube.rotation.x+=0.01;
            // mycube.rotation.y+=0.01;
            // mycube.rotation.z+=0.01;
            // euler_xyz(mycube,0,0.2,0);
            cubeRecX = mycube.position.x;
            cubeRecY = mycube.position.y;
            cubeRecZ = mycube.position.z;
            // euler_center(mycube, 0,2,0);
            // euler_xyz(camera, 0, 0.2, 0);
            // camera.lookAt(mycube.position);

        
        if (resizeRendererToDisplaySize(renderer)) {
          const canvas = renderer.domElement;
          camera.aspect = canvas.clientWidth / canvas.clientHeight;
          camera.updateProjectionMatrix();
        }
    
        renderer.render(scene, camera);
            mycube.position.x = cubeRecX;
            mycube.position.y = cubeRecY;
            mycube.position.z = cubeRecZ;
        requestAnimationFrame(render);
      }
    
      requestAnimationFrame(render);

    }
    
    main();