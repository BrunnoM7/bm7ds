import React from "react";
import Select from "../Select";

import '@bmds/scss/lib/global.css'
import '@bmds/scss/lib/Select.css'

export default {
  title: 'Select'
}

export const Common = () => <Select options={options} />

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