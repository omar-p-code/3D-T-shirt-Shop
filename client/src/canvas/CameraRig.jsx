import React, { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { easing } from 'maath'
import { useSnapshot } from 'valtio'

import state from '../store'

function CameraRig({ children }) {
   const group = useRef();
   const snap = useSnapshot(state);

   useFrame((state, delta) => {
      const isbreakingPoint = window.innerWidth <= 1260;
      const isMobile = window.innerWidth <= 600;

      // set the initial position of the model
      let targetPosition = [-0.4, 0, 2];
      if (snap.intro) {
         if (isbreakingPoint) targetPosition = [0, 0, 2]; // centered for smaller screens
         if (isMobile) targetPosition = [0, 0.2, 2.5]; // slightly higher for mobile
      } else {
         if (isMobile) targetPosition = [0, 0, 2.5]; // slightly higher for mobile  
         else targetPosition = [0, 0, 2]; // centered position
      }

      //set the model camera position
      easing.damp3(state.camera.position, targetPosition, 0.25, delta) // x,y,z

      //set the model rotation smoothly
      easing.dampE(
         group.current.rotation, // current rotation
         [state.pointer.y / 10, -state.pointer.x / 10, 0], // target rotation
         0.25, // smoothing factor
         delta // time delta -> frame rate independent
      ) // x,y,z
   });

   return <group ref={group}>{children}</group>
}

export default CameraRig