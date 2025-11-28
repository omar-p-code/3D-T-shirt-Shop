import React from 'react'
import { easing } from 'maath'
import { useSnapshot } from 'valtio'
import { useFrame } from '@react-three/fiber'
import { Decal, useGLTF, useTexture } from '@react-three/drei'

import state from '../store'

function Shirt() {
   const snap = useSnapshot(state)
   const { nodes, materials } = useGLTF('/shirt_baked.glb');

   const logoTexture = useTexture(snap.logoDecal)
   const fullTexture = useTexture(snap.fullDecal)

   useFrame((state, delta) => easing.dampC(materials.lambert1.color, snap.color, 0.25, delta));

   const stateString = JSON.stringify(snap) // to trigger re-render on state change

   return (
      <group // group to hold the shirt mesh
         key={stateString}
      >
         <mesh // shirt mesh
            castShadow // enable shadows
            geometry={nodes.T_Shirt_male.geometry} // shirt geometry
            material={materials.lambert1} // shirt material
            material-roughness={1} // set roughness
            dispose={null} // prevent automatic disposal
         >
            {snap.isFullTexture && (
               <Decal
                  position={[0, 0, 0]}
                  rotation={[0, 0, 0]}
                  scale={1}
                  map={fullTexture} // apply full texture
               />
            )}

            {snap.isLogoTexture && (
               <Decal
                  position={[0, 0.04, 0.15]}
                  rotation={[0, 0, 0]}
                  scale={.15}
                  map={logoTexture}
                  map-anisotropy={16} // improve texture quality
                  depthTest={false} // ensure decal renders on top
                  depthWrite={true} // ensure decal writes to depth buffer
               />
            )}
         </mesh>
      </group>
   )
}

export default Shirt