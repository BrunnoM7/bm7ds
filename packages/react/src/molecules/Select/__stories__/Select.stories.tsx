import React from "react";
import Select from "../Select";

import '@bm7ds/scss/lib/global.css'
import '@bm7ds/scss/lib/Select.css'

export default {
  title: 'Molecules/Select',
  component: Select
}

const options =[
  {
    label: 'Strict Black',
    value: "strict-black"
  },
  {
    label: 'Black',
    value: "black"
  },
  {
    label: 'Sirius Black',
    value: "sirius-black"
  },
]

export const Common = () => <Select options={options} />

export const RenderOption = () => <Select renderOption={({ getOptionRecommendedProps, option, isSelected }) => <span {...getOptionRecommendedProps()}>{option.label} {isSelected? 'SELECTED !' : ''}</span>} options={options} />

export const CustomLabel = () => <Select label="Select a color..." options={options} />