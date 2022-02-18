import React from "react";
import Select from "./Select";

import { render, fireEvent } from '@testing-library/react';

const options = [
  {
    label: 'Strict Black',
    value: "strict-black"
  },
  {
    label: 'Black Lagoon',
    value: "black-lagoon"
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

test('can customize select label', () => {
  const { getByText } = render(<Select options={options} label='CUSTOM LABEL'/>);

  expect(getByText('CUSTOM LABEL')).toBeInTheDocument()
})

test('renders options using custom renderOption method if passed as prop', () => {
  const { getAllByTestId, getByTestId } = render(<Select options={options} renderOption={({ option, getOptionRecommendedProps }) => {
    return <li data-testid='CustomRenderOption' { ...getOptionRecommendedProps() }>{option.label}</li>
  }} />)

  fireEvent.click(getByTestId('BmdsSelectButton'));

  expect(getAllByTestId('CustomRenderOption')).toHaveLength(options.length)
})

test('calls the onOptionSelected prop with the selected option and its index if passed', () => {
  const onOptionSelected = jest.fn();
  const { getAllByRole, getByTestId } = render(<Select options={options} onOptionSelected={onOptionSelected}/>);
  
  fireEvent.click(getByTestId('BmdsSelectButton'));
  fireEvent.click(getAllByRole('menuitemradio')[0]);

  expect(onOptionSelected).toHaveBeenCalledWith(options[0], 0);
})

test('the button label changes to the selected option label', () => {
  const { getAllByRole, getByTestId } = render(<Select options={options} />);
  
  fireEvent.click(getByTestId('BmdsSelectButton'));
  fireEvent.click(getAllByRole('menuitemradio')[0]);

  expect(getByTestId('BmdsSelectButton')).toHaveTextContent(options[0].label);
  
})

test('snapshot of the selected option state', () => {
  const { getAllByRole, getByTestId, asFragment } = render(<Select options={options} />);
  
  fireEvent.click(getByTestId('BmdsSelectButton'));
  fireEvent.click(getAllByRole('menuitemradio')[0]);

  expect(asFragment()).toMatchSnapshot();
})

test('snapshot of the base state', () => {
  const { asFragment } = render(<Select options={options} />);

  expect(asFragment()).toMatchSnapshot();
})

test('snapshot of the options menu open state', () => {
  const { getByTestId, asFragment } = render(<Select options={options} />);
  
  fireEvent.click(getByTestId('BmdsSelectButton'));

  expect(asFragment()).toMatchSnapshot();
})