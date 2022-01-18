import React from 'react'

import Spacing from '../../foundation/Spacing'

interface ImageProps {
  src: string,
  alt: string,
  width?: keyof typeof Spacing,
  height?: keyof typeof Spacing
}

const Image: React.FC<ImageProps> = ({ src, alt, width=Spacing.xxxl, height }) => {
  const className = `
    bmds-width-${width} 
    ${height ? `bmds-height-${height}` : ''}
  `;

  return (
    <div>
      <img className={className} src={src} alt={alt} />
    </div>
  )
}

export default Image
