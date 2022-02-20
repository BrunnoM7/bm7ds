import React from 'react'
import Color from '../Color'
import { text, select } from '@storybook/addon-knobs';

import { Spacing } from '@bmds/foundation'

// css
import '@bmds/scss/lib/Utilities.css';

export default {
  title: 'Atoms/Color',
  component: Color
}

const dimensions = Object.values(Spacing);

export const Common = () => <Color hexCode={text('hexCode', '#000')} />

export const CustomDimensions = () => <Color hexCode={text('hexCode', 'pink')} width={select('width', dimensions,'xxl')} height={select('height', dimensions,'xxl') }/>