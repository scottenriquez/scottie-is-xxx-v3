import { useEffect } from 'react';
import * as THREE from 'three';
import SceneInit from './sceneInit';

function BouncingBall() {
  useEffect(() => {
    const canvas = new SceneInit('bouncingBall');
    canvas.initialize();
    canvas.animate();
    const boxGeometry = new THREE.BoxGeometry(16, 16, 16);
    const boxMaterial = new THREE.MeshNormalMaterial();
    const boxMesh = new THREE.Mesh(boxGeometry, boxMaterial);
    canvas.scene.add(boxMesh);
  }, []);
  return (
    <div id={'noc-bouncing-ball-canvas-div'} style={{
      height: '400px',
      width: '100%',
      backgroundColor: 'black',
    }}>
      <canvas id="bouncingBall" style={{
        height: '400px',
        width: '100%',
      }}/>
    </div>
  );
}

export default BouncingBall;