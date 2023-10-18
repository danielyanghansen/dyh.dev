import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';


type NotFoundPageProps = {
    // props
};

const NotFoundPage: React.FC<NotFoundPageProps> = () => {
    const grid404reversed = [
        [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ',],
        [' ', 'X', ' ', ' ', 'X', ' ', ' ', 'X', 'X', ' ', ' ', 'X', ' ', ' ', 'X', ' ',],
        [' ', 'X', ' ', ' ', 'X', ' ', 'X', ' ', ' ', 'X', ' ', 'X', ' ', ' ', 'X', ' ',],
        [' ', 'X', 'X', 'X', 'X', ' ', 'X', ' ', ' ', 'X', ' ', 'X', 'X', 'X', 'X', ' ',],
        [' ', ' ', ' ', ' ', 'X', ' ', 'X', ' ', ' ', 'X', ' ', ' ', ' ', ' ', 'X', ' ',],
        [' ', ' ', ' ', ' ', 'X', ' ', ' ', 'X', 'X', ' ', ' ', ' ', ' ', ' ', 'X', ' ',],
        [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ',],

    ]

    const blockVirtualSideLength = 1;
    const blockSideNegativeMargin = 0.08;
    const emptyMaterial = new THREE.MeshBasicMaterial({ color: 0xee1111 });
    const filledMaterial = new THREE.MeshBasicMaterial({ color: 0x00eece });

    const blockActualSideLength = blockVirtualSideLength - 2* blockSideNegativeMargin;

    const blockGeometry = new THREE.BoxGeometry(blockActualSideLength, blockActualSideLength, blockActualSideLength);

    const blocks: THREE.Mesh[] = [];
    const width = grid404reversed[0].length;
    const height = grid404reversed.length;

    const canvasRef = useRef<HTMLCanvasElement>(null);

    const grid404 = grid404reversed.reverse()

    useEffect(() => {

        if (canvasRef.current) {
            const canvas = canvasRef.current;

            //create blocks
            grid404.forEach((row, i) => {
                return row.forEach((col, j) => {
                    const material = col === 'X' ? filledMaterial : emptyMaterial;
                    const block = new THREE.Mesh(blockGeometry, material);
                    block.position.x = j * blockVirtualSideLength - width / 2 * blockVirtualSideLength + blockSideNegativeMargin;
                    block.position.y = i * blockVirtualSideLength - height / 2 * blockVirtualSideLength + blockSideNegativeMargin;
                    block.position.z = 0;
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
            camera.position.z = 8; 
            camera.position.y = 2;
            camera.position.x = 4;
            camera.lookAt(0, 0, 0)

            //create renderer
            const renderer = new THREE.WebGLRenderer({ canvas });
            renderer.setSize(canvas.clientWidth, canvas.clientHeight);

            //================================================================================================
            //add objects to scene
            blocks.forEach(block => scene.add(block));
            //Set background to white
            scene.background = new THREE.Color(0xffffff);
            //Add light
            const light = new THREE.PointLight(0xababab, 1);
            light.position.set(0, 0, 10);
            scene.add(light);

            var t = 1;
            const animate = () => {
                requestAnimationFrame(animate);
                t += 0.01;

                blocks.forEach(block => {
                    block.position.z = Math.sin(t / 2 + block.position.x) /1.5;
                });
                camera.position.x =  Math.sin(t/2) * 3;
                camera.lookAt(0,0,0);
                
                renderer.render(scene, camera);
            }
            animate();


        }

    }, [canvasRef.current, grid404]);



    return (
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