import * as THREE from 'three';
//import { GLTFLoader } from 'GLTFLoader.js';
//import { GLTFLoader } from "https://cdn.jsdelivr.net/npm/three@0.121.1/examples/jsm/loaders/GLTFLoader.js";

export default class Armazem {
    constructor(armazem) {
        //this.url = "./armazem3D/scene.gltf";
        
        this.name = armazem.name;
        this.links = armazem.links;
        this.raio = 0.5 + this.links.length * 0.15;
        
        this.object = new THREE.Group();

        this.coordenadas = this.transformarCoordenadas(armazem);



        let geometry, material, mesh;
        geometry = new THREE.CylinderGeometry(this.raio, this.raio, 0.1, 32);
        material = new THREE.MeshBasicMaterial({ color: 0x3ac9ad });
        mesh = new THREE.Mesh(geometry, material);
        mesh.position.y = 0.1;
        this.object.add(mesh);
        //console.log(this.coordenadas);
        this.object.position.set(this.coordenadas.x, this.coordenadas.y, this.coordenadas.z);
        /*
        const gltfLoader = new THREE.GLTFLoader();
        const url = './armazem3D/scene.gltf';
        gltfLoader.load(url, function(gltf){
            const root = gltf.scene;
            
            this.object.add(root);
        
          });

    */
    }


    transformarCoordenadas(armazem) {
        return {
            x: (100 / (8.7613 - 8.2451)) * (armazem.lon - 8.2451) - 50,
            z: (100 / (42.1115 - 40.8387)) * (armazem.lat - 40.8387) - 50,
            y: ((50 / 800) * armazem.alt) /10
        };


    }
}