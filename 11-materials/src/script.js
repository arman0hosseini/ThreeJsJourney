import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { materialReference } from "three/src/nodes/accessors/MaterialReferenceNode.js";
import GUI from "lil-gui";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader.js";
import { iridescence } from "three/src/nodes/core/PropertyNode.js";

/**
 * Debug
 */
const gui = new GUI();

/**
 * Base
 */
// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

// Textures / TextureLoader
const textureLoader = new THREE.TextureLoader();

// Door material textures
const doorColorTexture = textureLoader.load("./textures/door/color.jpg");
const doorAlphaTexture = textureLoader.load("./textures/door/alpha.jpg");
const doorAmbientOcclusionTexture = textureLoader.load(
  "./textures/door/ambientOcclusion.jpg",
);
const doorHeightTexture = textureLoader.load("./textures/door/height.jpg");
const doorNormalTexture = textureLoader.load("./textures/door/normal.jpg");
const doorMetalnessTexture = textureLoader.load(
  "./textures/door/metalness.jpg",
);
const doorRoughnessTexture = textureLoader.load(
  "./textures/door/roughness.jpg",
);

// Helper textures used by alternative material examples
const matcapTexture = textureLoader.load("./textures/matcaps/1.png");
const gradientTexture = textureLoader.load("./textures/gradients/3.jpg");

// Color textures need sRGB so their colors match the source image files.
doorColorTexture.colorSpace = THREE.SRGBColorSpace;
matcapTexture.colorSpace = THREE.SRGBColorSpace;

// Optional alpha-map filter settings for crisp transparency experiments.
// doorAlphaTexture.generateMipmaps = false;
// doorAlphaTexture.magFilter = THREE.NearestFilter;

/**
 * Objects
 */
// Keep one material block active at a time while comparing material behavior.
// MeshBasicMaterial
// const material = new THREE.MeshBasicMaterial();
// material.map = doorColorTexture;
// material.color = new THREE.color("red");
// material.wireframe = true;
// material.transparent = true;
// material.opacity = 0.5;
// material.alphaMap = doorAlphaTexture;
// material.side = THREE.DoubleSide;

// MeshNormalMaterial
// const material = new THREE.MeshNormalMaterial();
// material.flatShading = true;

// MeshMatcapMaterial
// const material = new THREE.MeshMatcapMaterial();
// material.matcap = matcapTexture;

// MeshDepthMaterial
// const material = new THREE.MeshDepthMaterial();

// MeshLambertMaterial
// const material = new THREE.MeshLambertMaterial();

// MeshPhongMaterial
// const material = new THREE.MeshPhongMaterial();
// material.shininess = 100;
// material.specular = new THREE.colorSpace(0x1188ff);

// MeshToonMaterial
// const material = new THREE.MeshToonMaterial();
// gradientTexture.minFilter = THREE.NearestFilter;
// gradientTexture.magFilter = THREE.NearestFilter;
// gradientTexture.generateMipmaps = false;
// material.gradientMap = gradientTexture;

// MeshStandardMaterial
// const material = new THREE.MeshStandardMaterial();
// material.map = doorColorTexture;
// material.aoMap = doorAmbientOcclusionTexture;
// material.aoMapIntensity = 1;
// material.displacementMap = doorHeightTexture;
// material.displacementScale = 0.05;
// material.metalnessMap = doorMetalnessTexture;
// material.metalness = 1;
// material.roughnessMap = doorRoughnessTexture;
// material.roughness = 1;
// material.normalMap = doorNormalTexture;
// // material.normalScale.set(0.5, 0.5);
// material.alphaMap = doorAlphaTexture;
// material.transparent = true;
// gui.add(material, "aoMapIntensity").min(0).max(2).step(0.0001);
// gui.add(material, "metalness").min(0).max(1).step(0.0001);
// gui.add(material, "roughness").min(0).max(1).step(0.0001);

/**
 * Active Material
 */
// MeshPhysicalMaterial
const material = new THREE.MeshPhysicalMaterial();

// Texture maps are left commented while focusing on glass-like transmission.
// material.map = doorColorTexture;
// material.aoMap = doorAmbientOcclusionTexture;
// material.aoMapIntensity = 1;
// material.displacementMap = doorHeightTexture;
// material.displacementScale = 0.05;
// material.metalnessMap = doorMetalnessTexture;
material.metalness = 0;

// material.roughnessMap = doorRoughnessTexture;
material.roughness = 0;

// material.normalMap = doorNormalTexture;
// material.normalScale.set(0.5, 0.5);
// material.alphaMap = doorAlphaTexture;
// material.transparent = true;
// gui.add(material, "aoMapIntensity").min(0).max(2).step(0.0001);
gui.add(material, "metalness").min(0).max(1).step(0.0001);
gui.add(material, "roughness").min(0).max(1).step(0.0001);

// Clearcoat
// material.clearcoat = 1;
// material.clearcoatRoughness = 0;
// gui.add(material, "clearcoat").min(0).max(1).step(0.0001);
// gui.add(material, "clearcoatRoughness").min(0).max(1).step(0.0001);

// Sheen
// material.sheen = 1;
// material.sheenRoughness = 0.25;
// material.sheenColor.set(1, 1, 1);
// gui.add(material, "sheen").min(0).max(1).step(0.0001);
// gui.add(material, "sheenRoughness").min(0).max(1).step(0.0001);
// gui.addColor(material, "sheenColor");

// Iridescence
// material.iridescence = 1;
// material.iridescenceIOR = 1;
// material.iridescenceThicknessRange = [100, 800];

// gui.add(material, "iridescence").min(0).max(1).step(0.0001);
// gui.add(material, "iridescenceIOR").min(0).max(2.333).step(0.0001);
// gui.add(material.iridescenceThicknessRange, "0").min(1).max(1000).step(1);
// gui.add(material.iridescenceThicknessRange, "1").min(1).max(1000).step(1);

// Transmission
// Transmission uses the HDR environment to create glass-like refraction.
material.transmission = 1;
material.ior = 1.5;
material.thickness = 0.5;

gui.add(material, "transmission").min(0).max(1).step(0.001);
gui.add(material, "ior").min(1).max(10).step(0.001);
gui.add(material, "thickness").min(0).max(1).step(0.001);

/**
 * Objects
 */
const sphereGeometry = new THREE.SphereGeometry(0.5, 16, 16);
const planeGeometry = new THREE.PlaneGeometry(1, 1, 50, 50);
const torusGeometry = new THREE.TorusGeometry(0.3, 0.2, 16, 16);

// All meshes share the same material so GUI changes update them together.
const sphereMesh = new THREE.Mesh(sphereGeometry, material);
const planeMesh = new THREE.Mesh(planeGeometry, material);
const torusMesh = new THREE.Mesh(torusGeometry, material);

sphereMesh.position.x = -2;
torusMesh.position.x = 2;

scene.add(sphereMesh, planeMesh, torusMesh);

/**
 * Lights
 */
// The HDR environment lights the scene for the active physical material.
// const ambientLight = new THREE.AmbientLight(0xffffff, 1);
// scene.add(ambientLight);

// const pointLight = new THREE.PointLight(0xffffff, 20);
// pointLight.position.x = 2;
// pointLight.position.y = 3;
// pointLight.position.z = 4;
// scene.add(pointLight);

/**
 * Environment Map
 */
const rgbeLoader = new RGBELoader();

rgbeLoader.load("./textures/environmentMap/2k.hdr", (environmentMap) => {
  // Use the HDR as both the visible background and reflection/refraction source.
  environmentMap.mapping = THREE.EquirectangularReflectionMapping;
  scene.background = environmentMap;
  scene.environment = environmentMap;
});

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

// Keep the camera and renderer in sync with the browser viewport.
window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100,
);
camera.position.x = 1;
camera.position.y = 1;
camera.position.z = 3;
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
// renderer.outputColorSpace = THREE.SRGBColorSpace;

/**
 * Animate
 */
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();
  const rotationX = 0.15 * elapsedTime;
  const rotationY = 0.1 * elapsedTime;

  // Update objects
  sphereMesh.rotation.y = rotationY;
  planeMesh.rotation.y = rotationY;
  torusMesh.rotation.y = rotationY;

  sphereMesh.rotation.x = rotationX;
  planeMesh.rotation.x = rotationX;
  torusMesh.rotation.x = rotationX;

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
