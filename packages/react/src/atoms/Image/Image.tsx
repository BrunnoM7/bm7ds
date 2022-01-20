import React from 'react'

import { Spacing } from'@bmds/foundation'

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

  return <img className={className} src={src} alt={alt} />;

}

export default Image
