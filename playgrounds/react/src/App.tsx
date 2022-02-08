import React from "react";
import { Spacing } from "@bmds/foundation";

import { Button, Color, Image, Text, Margin, Select } from '@bmds/react'
import '@bmds/scss/lib/Button.css'
import '@bmds/scss/lib/Utilities.css'
import '@bmds/scss/lib/Text.css'
import '@bmds/scss/lib/Margin.css'


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

const App = () => {

  const { xl, xxxxl } = Spacing;


  return (
    <div>
      <Image src={"https://picsum.photos/200"} alt="place holder image" width={xxxxl} />
      <Color hexCode='#f00' width={xl} height={xl} />
      <Button label='Example Button' />
      <Margin space='xl' left>
        <Text size='xl'>Olá</Text>
      </Margin>
      <Select options={options} />
    </div>
  )
}

export default App
