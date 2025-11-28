import React from 'react'
import { SketchPicker } from 'react-color'
import { useSnapshot } from 'valtio'

import state from '../store'

function ColorPicker() {
   const snap = useSnapshot(state);

   return (
      <div className='absolute left-full ml-3'>
         <SketchPicker
            color={snap.color}
            disableAlpha
            onChange={(color) => (state.color = color.hex)}
            presetColors={['#000000', '#FFFFFF', '#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#00FFFF', '#FF00FF', '#C0C0C0', '#808080', '#800000', '#808000', '#008000', '#800080', '#008080', '#000080', '#FFA500', '#A52A2A', '#8A2BE2', '#DEB887']}
         />
      </div>
   )
}

export default ColorPicker