import React, {useEffect} from 'react';
import * as THREE from 'three';
import SceneInit from './sceneInit';

const generateSphere = () => {
  const x = Math.random() * 100 - 50;
  const y = Math.random() * 100 - 50;
  const z = Math.random() * 100 - 50;
  const sphereLocationVector = new THREE.Vector3(x, y, z);
  const sphereGeometry = new THREE.SphereGeometry(5, 32, 32);
  const sphereMaterial = new THREE.MeshStandardMaterial({color: 0x50fa7b, roughness: 0});
  const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
  sphere.name = 'sphere';
  sphere.position.set(sphereLocationVector.x, sphereLocationVector.y, sphereLocationVector.z);
  return sphere;
};

const BouncingBall = () => {
  useEffect(() => {
    const canvas = new SceneInit('noc-bouncing-ball-canvas-div');
    canvas.initialize();
    const sphere = generateSphere();
    const gridXZ = new THREE.GridHelper(100, 10);
    canvas.scene.add(gridXZ);
    const gridXY = new THREE.GridHelper(100, 10);
    gridXY.rotation.x = Math.PI / 2;
    canvas.scene.add(gridXY);
    const gridYZ = new THREE.GridHelper(100, 10);
    gridYZ.rotation.z = Math.PI / 2;
    canvas.scene.add(gridYZ);
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