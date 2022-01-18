import React from 'react'

interface ButtonProps {
  label: string
}

const Button: React.FunctionComponent<ButtonProps> = ({ label }) => {
  return (
    <button className='bmds-button'>{label || 'Button'}</button>
  )
}

export default Button