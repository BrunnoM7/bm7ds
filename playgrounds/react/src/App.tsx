import React from "react";

import { Spacing, Button, Color } from '@bmds/react'
import '@bmds/scss/lib/Button.css'
import '@bmds/scss/lib/Utilities.css'


const App = () => {

  const { sm, xl } = Spacing;

  return (
    <div>
      <Color hexCode='#000' width={sm} height={xl} />
      <Button label='Example Button' />
    </div>
  )
}

export default App
