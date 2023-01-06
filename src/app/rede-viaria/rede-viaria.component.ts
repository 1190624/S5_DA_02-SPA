import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { CSS3DRenderer } from "three/examples/jsm/renderers/CSS3DRenderer";
import { ArmazemService } from '../services/armazem/armazem.service';
import * as THREE from "three";
import { Armazem } from '../dto/armazem';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import TextSprite from '@seregpie/three.text-sprite';
import { withDebugTracing } from '@angular/router';

@Component({
  selector: 'app-map',
  templateUrl: './rede-viaria.component.html',
  styleUrls: ['./rede-viaria.component.css']
})
export class RedeViariaComponent implements OnInit {
  @ViewChild('rendererContainer') rendererContainer: ElementRef;

  renderer: THREE.WebGLRenderer = new THREE.WebGLRenderer();
  scene: THREE.Scene = new THREE.Scene();
  camera: THREE.PerspectiveCamera = new THREE.PerspectiveCamera();
  labelRenderer: CSS3DRenderer = new CSS3DRenderer();
  controls: OrbitControls = new OrbitControls(this.camera, this.labelRenderer.domElement);

  checkOrbit: boolean = true;
  windowsResize: number = 0;

  public listaArmazensDTO: Array<Armazem> = new Array<Armazem>();

  constructor(public armazemService: ArmazemService) {

  }

  ngOnInit(): void {
    this.scene.background = new THREE.Color(0xfffff);
  }

  ngAfterViewInit(): void {
    this.initialize();
    this.animate();
  }

  /**
   * SCENE
   */
  private initialize(): void {
    // Create a scene (the viewports frames)
    this.scene = new THREE.Scene();
    //this.scene.background = new THREE.Color(0xff0000);

    //adição de nevoeiro
    this.scene.fog = new THREE.FogExp2(0x34583d, 0.004);


    // adição de uma fonte de iluminação
    const color = 0xFFFFFF;
    const intensity = 1;
    const light = new THREE.SpotLight(color, intensity);
    light.position.set(100, 100, 100);
    light.angle = THREE.MathUtils.degToRad(30);
    light.penumbra = 0.4;
    this.scene.add(light);
    this.scene.add(light.target);

    //ajuda para saber a origem da luz qual é o comprimento que é projetada
    const helper = new THREE.SpotLightHelper(light);
    this.scene.add(helper);

    //this.renderer.shadowMap.enable = true;


    this.scene.background = new THREE.CubeTextureLoader().load([
      '../../assets/skybox/xpos.png',
      '../../assets/skybox/xneg.png',
      '../../assets/skybox/ypos.png',
      '../../assets/skybox/yneg.png',
      '../../assets/skybox/zpos.png',
      '../../assets/skybox/zneg.png',
    ]);

    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 10000);
    this.camera.position.set(0, 90, 0);

    //atualiza os valores da window
    //window.addEventListener('resize', event => this.windowResize(event));

    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(this.renderer.domElement);

    // Orbit controls
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.2;

    this.controls.maxPolarAngle = Math.PI / 2;

    this.controls.target.set(0, 5, 0);
    this.controls.update();

    this.createBase();
    this.createRotundas();
    this.createArmazens();
    //this.createMiniMapView();
    //this.addLigths();
    //this.createRenderer();

    window.addEventListener('resize', this.windowResize.bind(this));
  }

  /**
   * BASE
   */
  private createBase() {
    let geometry, material, mesh;
    geometry = new THREE.BoxGeometry(120, 1, 120);
    material = new THREE.MeshBasicMaterial({ color: 0xe6e1e5 });
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.y = -1;
    this.scene.add(mesh);
  }

  /**
 * ROTUNDAS
 */
  private async createRotundas() {
    await this.armazemService.getArmazens().toPromise().then(a => {
      if (a != undefined) {
        this.listaArmazensDTO = a;
        return true;
      }
      return false;
    });

    this.listaArmazensDTO.forEach(a => {
      let raio = 0.5 + 10 * 0.15; // 10 DEPENDE DO NUMERO DE LINKS
      let object = new THREE.Group();

      let coordenadas = this.transformarCoordenadas(a);

      let geometry, material, mesh;
      geometry = new THREE.CylinderGeometry(raio, raio, 0.1, 32);
      material = new THREE.MeshBasicMaterial({ color: 0x3ac9ad });
      mesh = new THREE.Mesh(geometry, material);
      mesh.position.y = 0.1;
      object.add(mesh);

      object.position.set(coordenadas.x, coordenadas.y, coordenadas.z);
      this.scene.add(object);
    });
  }

  transformarCoordenadas(armazem: Armazem) {
    return {
      x: (100 / (8.7613 - 8.2451)) * (armazem.Longitude - 8.2451) - 50,
      z: (100 / (42.1115 - 40.8387)) * (armazem.Latitude - 40.8387) - 50,
      y: 2
      //y: ((50 / 800) * armazem.alt) / 10
    };
  }

  /**
   * ARMAZENS
   */

  private async createArmazens() {

    await this.armazemService.getArmazens().toPromise().then(a => {
      if (a != undefined) {
        this.listaArmazensDTO = a;
        return true;
      }
      return false;
    });

    const gltfLoader = new GLTFLoader();
    console.log(this.listaArmazensDTO);

    this.listaArmazensDTO.forEach(a => {
      let coordenadas = this.transformarCoordenadas(a);
      gltfLoader.load('../../assets/armazem.gltf', (gltf) => {
        let root = gltf.scene;
        let newRoot = root.clone();
        newRoot.scale.set(0.5, 0.5, 0.5);
        

        //posição diretamente em cima da rotunda
        //newRoot.position.set(armazem.coordenadas.x - 1, armazem.coordenadas.y-0.2, armazem.coordenadas.z);

        //posição ao lado
        newRoot.position.set(coordenadas.x, coordenadas.y, coordenadas.z - 2);

        this.scene.add(newRoot);

      });


      let sprite=new TextSprite({ text: a.Designacao,alignment: 'left',
        color: '#000000',
        fontFamily: '"Arial", Times, serif',
        fontStyle: 'italic',
        backgroundColor: '#ffffff'});
      sprite.position.set(coordenadas.x, coordenadas.y + 3, coordenadas.z - 2);
      this.scene.add(sprite)

    });
  }

  /**
   * ANIMAÇÕES
   */
  private windowResize() {
    let camera = this.camera;
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.labelRenderer.setSize(window.innerWidth, window.innerHeight);
  }

  animate() {
    window.requestAnimationFrame(() => this.animate());

    if (this.checkOrbit) {
      this.controls.update();
    }

    this.render();
  }

  private render() {
    this.renderer.render(this.scene, this.camera);
    this.labelRenderer.render(this.scene, this.camera);
  }
}
