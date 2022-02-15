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