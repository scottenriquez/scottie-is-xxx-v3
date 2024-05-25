import {useEffect} from 'react';
import * as THREE from 'three';
import SceneInit from './sceneInit';

const generateFloor = () => {
  const floorGeometry = new THREE.BoxGeometry(50, 1, 50);
  const floorMaterial = new THREE.MeshStandardMaterial({color: 0xbd93f9, roughness: 0});
  const floor = new THREE.Mesh(floorGeometry, floorMaterial);
  floor.position.set(0, -10, 0);
  return floor;
};

const generateSphere = (sphereLocaationVector) => {
  const sphereGeometry = new THREE.SphereGeometry(5, 32, 32);
  const sphereMaterial = new THREE.MeshStandardMaterial({color: 0x50fa7b, roughness: 0});
  const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
  sphere.name = 'sphere';
  sphere.position.set(sphereLocaationVector.x, sphereLocaationVector.y, sphereLocaationVector.z);
  return sphere;
};

const BouncingBall = () => {
  useEffect(() => {
    const canvas = new SceneInit('noc-bouncing-ball-canvas-div');
    canvas.initialize();
    const floor = generateFloor();
    const sphereLocationVector = new THREE.Vector3(0, 5, 0);
    const sphere = generateSphere(sphereLocationVector);
    canvas.scene.add(floor);
    canvas.scene.add(sphere);
    canvas.animate();
  }, []);
  return (
    <div id={'noc-bouncing-ball-canvas-div'} style={{
      height: '400px',
      width: '100%',
      backgroundColor: 'black',
      position: 'relative'
    }}>
      <canvas id={'noc-bouncing-ball-canvas'}/>
    </div>
  );
}

export default BouncingBall;