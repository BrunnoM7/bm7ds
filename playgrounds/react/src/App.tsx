import React from "react";
import { Spacing } from "@bm7ds/foundation";

import { Button, Color, Image, Text, Margin, Select } from '@bm7ds/react'
import '@bm7ds/scss/lib/Button.css'
import '@bm7ds/scss/lib/Utilities.css'
import '@bm7ds/scss/lib/Text.css'
import '@bm7ds/scss/lib/Margin.css'
import '@bm7ds/scss/lib/Select.css'



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
      <div style={{width: '500px', padding: '50px'}}>
        {/* TODO: Write better documentation of getOptionRecommendedProps usage */}
        <Select options={options} renderOption={({option, getOptionRecommendedProps}) => <p {...getOptionRecommendedProps({className: 'custom'})} >{option.label}</p>} />
      </div>
      <div style={{width: '500px', padding: '50px'}}>
        <Select options={options} />
      </div>
      
    </div>
  )
}

export default App
