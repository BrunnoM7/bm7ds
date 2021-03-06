import React from 'react'

import { Spacing } from'@bm7ds/foundation'

export interface ColorProps {
  hexCode: string,
  width?: keyof typeof Spacing,
  height?: keyof typeof Spacing
}

const Color: React.FC<ColorProps> = ({ hexCode, width = Spacing.md, height = Spacing.md  }) => {

  const className = `bmds-width-${width} bmds-height-${height}`;
  return (
    <div
      className={className} 
      style={{
        backgroundColor: hexCode
      }}
    >
      
    </div>
  )
}

export default Color
