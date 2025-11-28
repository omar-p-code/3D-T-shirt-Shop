import React, { useRef } from 'react'
import { useSnapshot } from 'valtio'
import { easing } from 'maath'
import { useFrame } from '@react-three/fiber'
import { AccumulativeShadows, RandomizedLight } from '@react-three/drei'

function Backdrop() {
   const shadow = useRef();

   return (
      <AccumulativeShadows // shadow catcher
         ref={shadow} // reference to access shadow methods
         temporal // enables temporal accumulation
         frames={60} // number of frames to accumulate
         alphaTest={0.35} // threshold for transparency
         scale={10} // size of the shadow plane
         rotation={[Math.PI / 2, 0, 0]} // rotate to lie flat
         position={[0, 0, -0.15]} // slight offset to avoid z-fighting
      >
         <RandomizedLight
            amount={4} // number of lights
            radius={9} // radius of light distribution
            intensity={0.55} // brightness of lights
            ambient={0.25} // ambient light contribution
            position={[5, 5, -10]} // position of lights


         />

         <RandomizedLight
            amount={4}
            radius={5}
            intensity={0.25}
            ambient={0.55}
            position={[-5, 5, -9]}


         />
      </AccumulativeShadows>
   )
}

export default Backdrop