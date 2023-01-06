import * as THREE from 'three';
import { OrbitControls } from 'https://unpkg.com/three@0.146.0/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'https://unpkg.com/three@0.146.0/examples/jsm/loaders/GLTFLoader.js';

import Armazem from './armazem.js';



export default class Mapa {
    constructor(armazemData) {
        this.armazemArray = [];

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
        //const helper = new THREE.SpotLightHelper(light);
        //this.scene.add(helper);

       // this.renderer.shadowMap.enable = true;


        this.scene.background = new THREE.CubeTextureLoader().load([
            'skybox/xpos.png',
            'skybox/xneg.png',
            'skybox/ypos.png',
            'skybox/yneg.png',
            'skybox/zpos.png',
            'skybox/zneg.png'
        ]);


        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 10000);
        this.camera.position.set(0, 90, 0);

        //atualiza os valores da window
        window.addEventListener('resize', event => this.windowResize(event));

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
        this.setUpScene(armazemData);


    }

    setUpScene(armazemData) {
        let geometry, material, mesh;
        geometry = new THREE.BoxGeometry(120, 1, 120);
        material = new THREE.MeshBasicMaterial({ color: 0xe6e1e5 });
        mesh = new THREE.Mesh(geometry, material);
        mesh.position.y = -1;
        this.scene.add(mesh);

        armazemData.forEach(obj => {
            const armazem = new Armazem(obj);
            //adicionar a um array
            this.armazemArray.push(armazem);
            this.scene.add(armazem.object);
        });


        this.connections(new THREE.MeshBasicMaterial({ color: 0x000000 }), armazemData)


    }

    connections(material, armazemData) {
        let points, geometry, mesh;

        const normals = new Float32Array([
            0, 1, 0,
            0, 1, 0,
            0, 1, 0,
            0, 1, 0,
            0, 1, 0,
            0, 1, 0
        ]);

        const indexes = [
            0, 2, 1,
            1, 2, 3,
            2, 6, 3,
            3, 6, 7,
            6, 4, 7,
            7, 4, 5
        ];

        for (let i = 0; i < this.armazemArray.length; i++) {
            //const element = this.armazemArray[i];

            for (let j = 0; j < this.armazemArray[i].links.length; j++) {
                const origem = this.armazemArray[i];
                const destino = this.armazemArray[this.armazemArray[i].links[j]];
                //console.log(origem.name);
                //console.log(destino.name);
                const compOri = origem.raio * 1.5;
                const compDest = destino.raio * 1.5;
                const largura = 0.4;


                //busca os vertices a frente do centro
                const direction = new THREE.Vector3(
                    destino.coordenadas.x - origem.coordenadas.x,
                    0,
                    destino.coordenadas.z - origem.coordenadas.z
                ).clampLength(0, 1);


                //busca os vertices ao lado do centro(armazém)
                const crossDirection = new THREE.Vector3(
                    direction.x,
                    0,
                    direction.z
                ).cross(new THREE.Vector3(0, 1, 0));



                points = [
                    new THREE.Vector3(origem.coordenadas.x + crossDirection.x * largura, origem.coordenadas.y, origem.coordenadas.z + crossDirection.z * largura),
                    new THREE.Vector3(origem.coordenadas.x - crossDirection.x * largura, origem.coordenadas.y, origem.coordenadas.z - crossDirection.z * largura)
                ];

                points.push(
                    new THREE.Vector3(points[0].x + direction.x * compOri, points[0].y, points[0].z + direction.z * compOri),
                    new THREE.Vector3(points[1].x + direction.x * compOri, points[1].y, points[1].z + direction.z * compOri)
                )

                points.push(
                    new THREE.Vector3(destino.coordenadas.x + crossDirection.x * largura, destino.coordenadas.y, destino.coordenadas.z + crossDirection.z * largura),
                    new THREE.Vector3(destino.coordenadas.x - crossDirection.x * largura, destino.coordenadas.y, destino.coordenadas.z - crossDirection.z * largura)
                )

                points.push(
                    new THREE.Vector3(points[4].x - direction.x * compDest, points[4].y, points[4].z - direction.z * compDest),
                    new THREE.Vector3(points[5].x - direction.x * compDest, points[5].y, points[5].z - direction.z * compDest)
                )

                //juntar pontos
                geometry = new THREE.BufferGeometry().setFromPoints(points);
                geometry.setAttribute('normal', new THREE.BufferAttribute(normals, 3));
                geometry.setIndex(indexes);




                mesh = new THREE.Mesh(geometry, material);

                this.scene.add(mesh);


                this.addArmazem3D(armazemData);
            }
        }

    }


    addArmazem3D(armazemData){


        const gltfLoader = new GLTFLoader();

        armazemData.forEach(obj => {
            const armazem = new Armazem(obj);


            gltfLoader.load('./armazem3D/imagem.gltf', (gltf) => {
                let root = gltf.scene;
                let newRoot = root.clone();
                newRoot.scale.set(0.5, 0.5, 0.5);
                
                //posição diretamente em cima da rotunda
                //newRoot.position.set(armazem.coordenadas.x - 1, armazem.coordenadas.y-0.2, armazem.coordenadas.z);

                //posição ao lado
                newRoot.position.set(armazem.coordenadas.x , armazem.coordenadas.y, armazem.coordenadas.z -2);

                this.scene.add(newRoot);

            });

        });

    }

    update() {
        this.controls.update();
        this.renderer.render(this.scene, this.camera);
    }

    windowResize() {

        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }



}