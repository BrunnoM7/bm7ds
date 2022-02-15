import React from "react";
import Select from "./Select";

import { render, fireEvent } from '@testing-library/react';

const options = [
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

test('renders all options passed to it', () => {
  const { getAllByRole, getByTestId } = render(<Select options={options} />);

  fireEvent.click(getByTestId('BmdsSelectButton'));

  expect(getAllByRole('menuitemradio')).toHaveLength(options.length);
})

test('renders options using custom renderOption method if passed as prop', () => {
  // TODO
})

test('calls the onOptionSelected prop with the selected option and its index if passed', () => {
  // TODO
})

test('the button label changes to the selected option label', () => {
  // TODO
})

test('snapshot of the selected option state', () => {
  // TODO
})

test('snapshot of the options menu open state', () => {
  // TODO
})