import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { CSS3DRenderer } from "three/examples/jsm/renderers/CSS3DRenderer";
import { ArmazemService } from '../services/armazem/armazem.service';
import * as THREE from "three";
import { Armazem } from '../dto/armazem';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import TextSprite from '@seregpie/three.text-sprite';
import { RotasService } from '../services/rotas/rotas.service';
import { Mesh, Object3D } from 'three';

@Component({
  selector: 'app-rede-viaria',
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

  private listaArmazensDTO: any[] = [];
  private listaRotasDTO: any[] = [];
  private rotunda = new THREE.CylinderGeometry(3, 3, 0.1, 32);

  constructor(private armazemService: ArmazemService, private rotasService: RotasService) {

  }

  ngOnInit(): void {
    this.initialize();
    this.animate();
  }

  ngAfterViewInit(): void {

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
    const intensity = 1.3;
    const light = new THREE.SpotLight(color, intensity);
    light.castShadow = true;
    light.position.set(50, 100, 50);
    light.angle = THREE.MathUtils.degToRad(50);
    light.penumbra = 0.4;
    this.scene.add(light);
    this.scene.add(light.target);


    const ambientlight = new THREE.AmbientLight(color, 0.3);
    this.scene.add(ambientlight);

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
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFShadowMap
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
    this.createEstradas();
    this.createCamioes();

    window.addEventListener('resize', this.windowResize.bind(this));
  }

  /**
   * BASE
   */
  private createBase() {
    let geometry, material, mesh;
    geometry = new THREE.BoxGeometry(120, 1, 120);
    material = new THREE.MeshPhongMaterial({ color: 0x616161 });
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.y = -1;
    mesh.castShadow = true;
    mesh.receiveShadow = true;
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

      let material, mesh;
      //geometry = new THREE.CylinderGeometry(raio, raio, 0.1, 32);
      material = new THREE.MeshBasicMaterial({ color: 0x37373f });
      mesh = new THREE.Mesh(this.rotunda, material);
      mesh.position.y = 0.1;
      mesh.receiveShadow = true;
      mesh.castShadow = true;
      object.add(mesh);
      object.name = a.Designacao;
      object.position.set(coordenadas.x, coordenadas.y, coordenadas.z);
      this.scene.add(object);
      const gltfLoader2 = new GLTFLoader();

      gltfLoader2.load('../../assets/rotunda/scene.gltf', (gltf) => {
        let root = gltf.scene;
        let newRoot = root.clone();
        newRoot.castShadow = true;
        newRoot.receiveShadow = true;
        newRoot.scale.set(0.09, 0.09, 0.09);
        newRoot

        newRoot.position.set(coordenadas.x, coordenadas.y + 0.1, coordenadas.z);

        this.scene.add(newRoot);
      });
    });
  }

  transformarCoordenadas(armazem: Armazem) {
    return {
      x: (100 / (8.7613 - 8.2451)) * (armazem.Longitude - 8.2451) - 50,
      z: (100 / (42.1115 - 40.8387)) * (armazem.Latitude - 40.8387) - 50,
      y: ((50 / 800) * armazem.Altitude) / 5
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

    console.log(this.listaArmazensDTO);
    const gltfLoader = new GLTFLoader();

    this.listaArmazensDTO.forEach(a => {
      let coordenadas = this.transformarCoordenadas(a);
      gltfLoader.load('../../assets/armazem/scene.gltf', (gltf) => {
        gltf.scene.traverse( function( node ) {

          if ( node as Mesh ) { node.castShadow = true; }
  
      } );
        let root = gltf.scene;
        let newRoot = root.clone();
        newRoot.castShadow = true;
        newRoot.receiveShadow = true;
        newRoot.scale.set(0.0005, 0.0005, 0.0005);

        //posição ao lado
        newRoot.position.set(coordenadas.x, coordenadas.y, coordenadas.z - 5);

        this.scene.add(newRoot);

      });
      if (a.Estado == false) {
        gltfLoader.load('../../assets/exclamacao/scene.gltf', (gltf) => {
          let root = gltf.scene;
          let newRoot = root.clone();
          newRoot.castShadow = true;
          newRoot.receiveShadow = true;
          newRoot.scale.set(1, 1, 1);

          //posição ao lado
          newRoot.position.set(coordenadas.x, coordenadas.y + 4, coordenadas.z - 5);

          this.scene.add(newRoot);

        });
      }
      /** 
            //Billboards por cima dos armazéns
            let sprite = new TextSprite({
              text: a.Designacao, alignment: 'left',
              color: '#000000',
              fontFamily: '"Arial", Times, serif',
              fontStyle: 'italic',
              backgroundColor: '#ffffff'
            });
            sprite.position.set(coordenadas.x, coordenadas.y + 3, coordenadas.z - 5);
            this.scene.add(sprite)
      */
    });
  }

  private async createEstradas() {
    await this.rotasService.getRotas().toPromise().then(r => {
      if (r != undefined) {
        this.listaRotasDTO = r;
        return true;
      }
      return false;
    });
    console.log(this.listaRotasDTO);

    let loader = new THREE.TextureLoader();
    var texturaElemLig = loader.load('../../assets/estrada.jpg', function (texture) {
      texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
      texture.offset.set(0, 0);
      texture.repeat.set(0.2, 1);
    });

    let elemLigMaterial = [
      new THREE.MeshBasicMaterial({ color: 0x37373f }), //right side
      new THREE.MeshBasicMaterial({ color: 0x37373f }), //left side
      new THREE.MeshBasicMaterial({ map: texturaElemLig }), //top side
      new THREE.MeshBasicMaterial({ color: 0x37373f }), //bottom side
      new THREE.MeshBasicMaterial({ color: 0x37373f }), //front side
      new THREE.MeshBasicMaterial({ color: 0x37373f }), //back side
    ];

    for (let i = 0; i < this.listaRotasDTO.length; i++) {
      let armazem1 = <Object3D>this.scene.getObjectByName((this.listaRotasDTO[i].origem));
      let armazem2 = <Object3D>this.scene.getObjectByName((this.listaRotasDTO[i].destino));

      if (armazem1 != null && armazem2 != null) {
        let teta1 = Math.atan2(-(armazem2.position.z - armazem1.position.z), armazem2.position.x - armazem1.position.x);
        let teta2 = Math.PI + teta1;

        let elemLigGeometry = new THREE.BoxGeometry(1, 0.2, 3);

        let elemLig1Mesh = new THREE.Mesh(elemLigGeometry, elemLigMaterial);
        elemLig1Mesh.position.set(armazem1.position.x + this.rotunda.parameters.radiusTop * Math.cos(teta1), armazem1.position.y, armazem1.position.z - this.rotunda.parameters.radiusTop * Math.sin(teta1));
        elemLig1Mesh.rotateY(teta1)
        elemLig1Mesh.castShadow = true;
        elemLig1Mesh.receiveShadow = true;
        this.scene.add(elemLig1Mesh)

        let elemLig2Mesh = new THREE.Mesh(elemLigGeometry, elemLigMaterial);
        elemLig2Mesh.position.set(armazem2.position.x + this.rotunda.parameters.radiusTop * Math.cos(teta2), armazem2.position.y, armazem2.position.z - this.rotunda.parameters.radiusTop * Math.sin(teta2));
        elemLig2Mesh.rotateY(teta2)
        elemLig2Mesh.castShadow = true;
        elemLig2Mesh.receiveShadow = true;
        this.scene.add(elemLig2Mesh)

        let estradaGeometry = new THREE.BoxGeometry(3, 0.20, Math.sqrt(Math.pow(elemLig1Mesh.position.x - elemLig2Mesh.position.x, 2) + Math.pow(elemLig1Mesh.position.y - elemLig2Mesh.position.y, 2) + Math.pow(elemLig1Mesh.position.z - elemLig2Mesh.position.z, 2)));
        var texturaEstrada = loader.load('../../assets/estrada.jpg', function (texture) {
          texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
          texture.offset.set(0, 0);
          texture.repeat.set(Math.sqrt(Math.pow(elemLig1Mesh.position.x - elemLig2Mesh.position.x, 2) + Math.pow(elemLig1Mesh.position.y - elemLig2Mesh.position.y, 2) + Math.pow(elemLig1Mesh.position.z - elemLig2Mesh.position.z, 2)) / 5, 1);
          texture.rotation = Math.PI / 2;
        });

        let estradaMaterial = [
          new THREE.MeshBasicMaterial({ color: 0x37373f }), //right side
          new THREE.MeshBasicMaterial({ color: 0x37373f }), //left side
          new THREE.MeshBasicMaterial({ map: texturaEstrada }), //top side
          new THREE.MeshBasicMaterial({ color: 0x37373f }), //bottom side
          new THREE.MeshBasicMaterial({ color: 0x37373f }), //front side
          new THREE.MeshBasicMaterial({ color: 0x37373f }), //back side
        ];
        let estradaMesh = new THREE.Mesh(estradaGeometry, estradaMaterial);

        estradaMesh.position.set((elemLig1Mesh.position.x + elemLig2Mesh.position.x) / 2,
          (elemLig1Mesh.position.y + elemLig2Mesh.position.y) / 2,
          (elemLig1Mesh.position.z + elemLig2Mesh.position.z) / 2);
        estradaMesh.castShadow = true;
        estradaMesh.receiveShadow = true;
        this.scene.add(estradaMesh)

        let beta = Math.asin((elemLig1Mesh.position.y - elemLig2Mesh.position.y) / estradaGeometry.parameters.depth);
        let omega = teta1 + Math.PI / 2;
        estradaMesh.rotation.set(beta, omega, 0, "ZYX")

        //this.roadsData.set(this.routes[i].routeId, [teta0, teta1, elemLig0Mesh.position.x, elemLig0Mesh.position.y, elemLig0Mesh.position.z, elemLig1Mesh.position.x, elemLig1Mesh.position.y, elemLig1Mesh.position.z, roadMesh.position.x, roadMesh.position.y, roadMesh.position.z, beta, (teta0 + Math.PI / 2)])
      }
    }
  }

  /**
   * CAMIOES
   */
  private async createCamioes() {
    const gltfLoader2 = new GLTFLoader();

    gltfLoader2.load('../../assets/camiao/scene.gltf', (gltf) => {
      let root = gltf.scene;
      let newRoot = root.clone();
      newRoot.castShadow = true;
      newRoot.receiveShadow = true;
      newRoot.scale.set(0.4, 0.4, 0.4);

      newRoot.position.set(2, 2, 2);

      this.scene.add(newRoot);
    });
  }

  /**
   * ANIMAÇAO CAMIAO
   */
  /** 
  private manualMovement(){
     
    document.onkeydown = function (e) {
      switch (e.key) {
        case "a":
          //rodar a camara para a esquerda
          truck?.position.set(truck?.position.x- 0.1,truck?.position.y,truck?.position.z) ;
          break;

        case "d":
          //rodar a camara para a direita
          truck?.position.set(truck?.position.x+ 0.1,truck?.position.y,truck?.position.z) ;
          break;

        case "w":
          //avançar - incrementar a posição da camara no eixo dos zz
          truck?.position.set(truck?.position.x,truck?.position.y,truck?.position.z- 0.1) ;
          break;

        case "s":
          //recuar - decrementar a posição da camara no eixo dos zz
          truck?.position.set(truck?.position.x,truck?.position.y,truck?.position.z+ 0.1) ;
          break;

        default:break;
      }

      switch (e.keyCode){
        case 39://right key
          truck?.rotateY(5 * Math.PI / 180);
          break;

        case 37://lef key
          truck?.rotateY(-5 * Math.PI / 180);
          break;

        case 38://up key
          truck?.rotateX(-5 * Math.PI / 180);
          break;

        case 40://down key
          truck?.rotateX(5 * Math.PI / 180);
          break;

        default:break;
      }
    }
  }
 */

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
    this.renderer.shadowMap.enabled = true;
    this.renderer.render(this.scene, this.camera);
    this.labelRenderer.render(this.scene, this.camera);
  }
}