import React from 'react';
import { Spacing } from '@bm7ds/foundation'

interface MarginProps {
  space?: keyof typeof Spacing,
  left?: boolean
  right?: boolean
  top?: boolean
  bottom?: boolean,
}

const Margin: React.FC<MarginProps> = ({ 
  space = 'xxxxs', 
  left = false, 
  right = false, 
  top = false, 
  bottom = false, 
  children 
}) => {

  let className = '';
  const specificMargin = left || right || top || bottom;


  if(!specificMargin) { className = `bmds-margin-${space}` }
  
  if(left) { className = `${className} bmds-margin-left-${space}` }
  if(right) { className = `${className} bmds-margin-right-${space}` }
  if(top) { className = `${className} bmds-margin-top-${space}` }
  if(bottom) { className = `${className} bmds-margin-bottom-${space}` }

  return (
    <div className={className}>
      {children}
    </div>
  );
};

export default Margin;
