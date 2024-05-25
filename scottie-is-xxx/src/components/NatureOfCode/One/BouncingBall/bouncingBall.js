import React, {useEffect} from 'react';
import * as THREE from 'three';
import SceneInit from './sceneInit';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faRefresh} from '@fortawesome/free-solid-svg-icons';

const generateSphere = (sphereLocaationVector) => {
  const sphereGeometry = new THREE.SphereGeometry(5, 32, 32);
  const sphereMaterial = new THREE.MeshStandardMaterial({color: 0x50fa7b, roughness: 0});
  const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
  sphere.name = 'sphere';
  sphere.position.set(sphereLocaationVector.x, sphereLocaationVector.y, sphereLocaationVector.z);
  return sphere;
};

const handleRefreshDataClick = () => {

};

const BouncingBall = () => {
  useEffect(() => {
    const canvas = new SceneInit('noc-bouncing-ball-canvas-div');
    canvas.initialize();
    const sphereLocationVector = new THREE.Vector3(0, 5, 0);
    const sphere = generateSphere(sphereLocationVector);
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
      <button className={'button button--secondary button--md'} style={{backgroundColor: '#A277FF', color: 'black'}}
              onClick={this.handleRefreshDataClick}><FontAwesomeIcon icon={faRefresh}/> Generate {this.props.buttonText}
      </button>
      <canvas id={'noc-bouncing-ball-canvas'}/>
    </div>
  );
}

export default BouncingBall;