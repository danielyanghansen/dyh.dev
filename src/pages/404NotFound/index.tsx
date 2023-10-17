import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';


type NotFoundPageProps = {
    // props
};

const NotFoundPage: React.FC<NotFoundPageProps> = () => {
    const grid404 = [
        [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
        [' ', 'X', ' ', 'X', ' ', ' ', 'X', ' ', ' ', 'X', ' ', 'X', ' '],
        [' ', 'X', ' ', 'X', ' ', 'X', ' ', 'X', ' ', 'X', ' ', 'X', ' '],
        [' ', 'X', 'X', 'X', ' ', 'X', ' ', 'X', ' ', 'X', 'X', 'X', ' '],
        [' ', ' ', ' ', 'X', ' ', 'X', ' ', 'X', ' ', ' ', ' ', 'X', ' '],
        [' ', ' ', ' ', 'X', ' ', ' ', 'X', ' ', ' ', ' ', ' ', 'X', ' '],
        [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],

    ]

    const blockSideLength = 1;
    const emptyMaterial = new THREE.MeshBasicMaterial({ color: 0x000000 });
    const filledMaterial = new THREE.MeshBasicMaterial({ color: 0x00ee11 });
    const blockGeometry = new THREE.BoxGeometry(blockSideLength, blockSideLength, blockSideLength);
    const blocks: THREE.Mesh[] = [];

    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {

        if (canvasRef.current) {
            const canvas = canvasRef.current;

            //create blocks
            grid404.forEach((row, i) => {
                return row.forEach((col, j) => {
                    const material = col === 'X' ? filledMaterial : emptyMaterial;
                    const block = new THREE.Mesh(blockGeometry, material);
                    block.position.x = j * blockSideLength;
                    block.position.y = i * blockSideLength;
                    blocks.push(block);
                })
            }
            );
            // ============================================================================================
            //create scene and camera
            const scene = new THREE.Scene();
            const camera = new THREE.PerspectiveCamera(
                75,
                canvas.clientWidth / canvas.clientHeight,
                0.1,
                100);
            camera.position.z = 10;
            camera.lookAt(0, 0, 0)

            //create renderer
            const renderer = new THREE.WebGLRenderer({ canvas });
            renderer.setSize(window.innerWidth, window.innerHeight);

            //================================================================================================
            //add objects to scene
            blocks.forEach(block => scene.add(block));
            //Set background to black
            scene.background = new THREE.Color(0x000000);
            //Add light
            // const light = new THREE.PointLight(0xffffff, 1);
            // light.position.set(5, 5, 5);
            // scene.add(light);


        }

    })


    
    return ( //canvas not working
        <div>
            <h1>404</h1>
            <canvas ref={canvasRef}></canvas>
        </div>
    );
    
}

const NoPage = () => {
    return <h1>404</h1>;
};
export default NotFoundPage;