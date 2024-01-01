import type { GridInfo2D } from '@/types/grid';
import * as THREE from 'three';

export const createVertexGrid = (
  gridInfo: GridInfo2D<number>,
): THREE.BufferGeometry => {
  const geometry = new THREE.BufferGeometry();

  const vertexBuffer: number[] = [];
  // Create vertices and link them together to a mesh

  // We're looking at the grid faces as two triangles, so we need 6 vertices per grid square
  // Hence we start at 0, y, 0, and link it with 1, y, 0, and 0, y, 1, and then 1, y, 0, 1, y, 1, 0, y, 1
  for (let x = 0; x < gridInfo.metadata.width - 1; x++) {
    for (let z = 0; z < gridInfo.metadata.height - 1; z++) {
      // Coordinates x, y, z, where y is the height of the vertex
      // We will draw two triangles in the following fashion where the + symbol marks a generic vertex and the * symbol the root vertex
      // Anchoring doesn't matter, but we'll use the top left corner as the root vertex, meaning we will add the triangle vertices in the order:
      // Anchor, left arm vertex, right arm vertex (imagining we stand at the anchor and look at the triangle)

      /*
        Triangle1 --->  * --  +
                        |   / |
                        |  /  |
                        | /   |
                        + --- *  <--- Triangle2
       */

      // Top left
      const xTopLeft = x;
      const zTopLeft = z;
      const yTopLeft = gridInfo.functions.getElement(xTopLeft, zTopLeft);

      // Top right
      const xTopRight = x + 1;
      const zTopRight = z;
      const yTopRight = gridInfo.functions.getElement(xTopRight, zTopRight);

      // Bottom left
      const xBottomLeft = x;
      const zBottomLeft = z + 1;
      const yBottomLeft = gridInfo.functions.getElement(
        xBottomLeft,
        zBottomLeft,
      );

      // Top right
      const xBottomRight = x + 1;
      const zBottomRight = z + 1;
      const yBottomRight = gridInfo.functions.getElement(
        xBottomRight,
        zBottomRight,
      );

      vertexBuffer.push(
        // Triangle 1
        xTopLeft,
        yTopLeft,
        zTopLeft, //anchor1

        xTopRight,
        yTopRight,
        zTopRight, //leftArm1

        xBottomLeft,
        yBottomLeft,
        zBottomLeft, //rightArm1

        // Triangle 2
        xBottomRight,
        yBottomRight,
        zBottomRight, //anchor2

        xBottomLeft,
        yBottomLeft,
        zBottomLeft, //leftArm2

        xTopRight,
        yTopRight,
        zTopRight, //rightArm2
      );
    }
  }

  const vertices = new Float32Array(vertexBuffer);

  // Create faces and link them together to a mesh

  // Create mesh and add to scene, with itemsize of 3 because each vertex has 3 coordinates
  geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));

  return geometry;
};
