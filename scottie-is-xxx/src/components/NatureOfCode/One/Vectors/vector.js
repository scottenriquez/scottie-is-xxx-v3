import {useEffect} from 'react';
import * as THREE from 'three';
import SceneInit from './sceneInit';

const generateLine = (vectors) => {
  const material = new THREE.LineBasicMaterial({color: 0x50fa7b});
  const geometry = new THREE.BufferGeometry().setFromPoints(vectors);
  return new THREE.Line(geometry, material);
};

const Vector = () => {
  useEffect(() => {
    const canvas = new SceneInit('noc-vector-1-canvas-div');
    canvas.initialize();
    const vectors = [new THREE.Vector3(0, 5, 0), new THREE.Vector3(0, -0.5, 0)];
    const line = generateLine(vectors);
    canvas.scene.add(line);
    const gridXZ = new THREE.GridHelper(100, 10);
    canvas.scene.add(gridXZ);
    const gridXY = new THREE.GridHelper(100, 10);
    gridXY.rotation.x = Math.PI / 2;
    canvas.scene.add(gridXY);
    const gridYZ = new THREE.GridHelper(100, 10);
    gridYZ.rotation.z = Math.PI / 2;
    canvas.scene.add(gridYZ);
    canvas.animate();
  }, []);
  return (<div id={'noc-vector-1-canvas-div'} style={{
      height: '400px', width: '100%', backgroundColor: 'black', position: 'relative'
    }}>
      <canvas id={'noc-bouncing-vector-1-canvas'}/>
    </div>);
}

export default Vector;