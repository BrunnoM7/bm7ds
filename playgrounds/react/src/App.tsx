import React from "react";

import { Spacing, Button, Color, Image } from '@bmds/react'
import '@bmds/scss/lib/Button.css'
import '@bmds/scss/lib/Utilities.css'


const App = () => {

  const { sm, xl, xxxxl } = Spacing;

  return (
    <div>
      <Image src={"https://picsum.photos/200"} alt="place holder image" width={sm} />
      <Color hexCode='#000' width={sm} height={xl} />
      <Button label='Example Button' />
    </div>
  )
}

export default App
