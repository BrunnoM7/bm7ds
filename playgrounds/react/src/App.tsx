import React from "react";
import { Spacing } from "@bmds/foundation";

import { Button, Color, Image, Text } from '@bmds/react'
import '@bmds/scss/lib/Button.css'
import '@bmds/scss/lib/Utilities.css'
import '@bmds/scss/lib/Text.css'


const App = () => {

  const { sm, xl, xxxxl } = Spacing;


  return (
    <div>
      <Image src={"https://picsum.photos/200"} alt="place holder image" width={xxxxl} />
      <Color hexCode='#f00' width={xl} height={xl} />
      <Button label='Example Button' />
      <Text size='xl'>Olá</Text>
    </div>
  )
}

export default App
