import React from 'react';
import { FontSize } from '@bm7ds/foundation'

export interface textProps {
  size?: keyof typeof FontSize
}

const Text: React.FC<textProps> = ({ size = FontSize.md, children }) => {
  const className = `bmds-text bmds-text-${size}`

  return <p className={className}>{children}</p>;
};

export default Text;
