import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

export default class SceneInit {
  constructor(canvasId) {
    this.scene = undefined;
    this.camera = undefined;
    this.renderer = undefined;
    this.fov = 45;
    this.canvasId = canvasId;
    this.stats = undefined;
    this.controls = undefined;
    this.ambientLight = undefined;
    this.directionalLight = undefined;
    this.divHTMLElement = document.getElementById(this.canvasId);
    this.canvasHTMLElement = this.divHTMLElement.children[0];
    this.canvasHTMLElement.height = this.divHTMLElement.clientHeight;
    this.canvasHTMLElement.width = this.divHTMLElement.clientWidth;
    this.bottomXPosition= -100;
    this.bottomYPosition = -100;
    this.bottomZPosition = -100;
    this.topXPosition= 100;
    this.topYPosition = 100;
    this.topZPosition = 100;
    this.timeStep = 0.2;
  }

  initialize() {
    this.scene = new THREE.Scene();
    this.scene.name = 'BouncingBall';
    this.camera = new THREE.PerspectiveCamera(
      this.fov,
      this.divHTMLElement.clientWidth / this.divHTMLElement.clientHeight,
      1,
      1000
    );
    this.camera.position.x = -40;
    this.camera.position.y = 20;
    this.camera.position.z = 40;
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvasHTMLElement,
      antialias: true,
    });
    this.renderer.setSize(this.divHTMLElement.clientWidth, this.divHTMLElement.clientHeight);
    this.clock = new THREE.Clock();
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    this.ambientLight.castShadow = true;
    this.scene.add(this.ambientLight);
    this.directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    this.directionalLight.position.set(0, 32, 64);
    this.scene.add(this.directionalLight);
    window.addEventListener('resize', () => this.onWindowResize(), false);
  }

  generateRandomVelocity() {
    return Math.floor(Math.random() * 51) - 25;
  }

  animate(pause) {
    if (pause) {
      return;
    }
    const sphere = this.scene.getObjectByName('sphere');
    window.requestAnimationFrame(this.animate.bind(this));
    const sphereVelocityVector = new THREE.Vector3(this.generateRandomVelocity(), this.generateRandomVelocity(), this.generateRandomVelocity());
    const timeDelta = this.clock.getDelta();
    sphereVelocityVector.addScalar(timeDelta);
    sphereVelocityVector.normalize();
    sphere.position.add(sphereVelocityVector);
    this.render();
    this.controls.update();
  }

  render() {
    this.renderer.render(this.scene, this.camera);
  }

  onWindowResize() {
    this.camera.aspect = this.divHTMLElement.clientWidth / this.divHTMLElement.clientHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(this.divHTMLElement.clientWidth, this.divHTMLElement.clientHeight);
  }
}