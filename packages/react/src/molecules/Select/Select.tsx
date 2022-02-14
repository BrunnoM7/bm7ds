import React, { useState, useRef, useEffect } from 'react';
import Text from '../../atoms/Text';

interface SelectOption {
  label: string
  value: string
}

interface RenderOptionProps {
  isSelected: boolean
  option: SelectOption
  getOptionRecommendedProps: (overrideProps?: Object) => Object
}

interface SelectProps {
  onOptionSelected?: (option: SelectOption, optionIndex: number) => void
  options?: SelectOption[]
  label?: string
  renderOption?: (props: RenderOptionProps) => React.ReactNode
}

const Select: React.FunctionComponent<SelectProps> = ({ options = [], label = 'Select an option...', onOptionSelected: handler, renderOption }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedIndex, setSelectedIndex] = useState<number|null>(null);
  const [overlayTop, setOverlayTop] = useState<number>(0);
  const labelRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setOverlayTop((labelRef.current?.offsetHeight || 0) + 10)
  }, [labelRef.current?.offsetHeight])
  

  const onOptionSelected = (option: SelectOption, optionIndex: number) => {
    setIsOpen(!isOpen);
    if(handler) {
      handler(option, optionIndex)
    }
    setSelectedIndex(optionIndex)
  }

  const onLabelClick = () => {
    setIsOpen(!isOpen);
  }

  let selectedOption = null;
  if(selectedIndex !== null) {
    selectedOption = options[selectedIndex];
  }

  return <div className='bmds-select'>
    <button ref={labelRef} className='bmds-select__label' onClick={() => onLabelClick()}>
      <Text>{selectedOption === null ? label : selectedOption.label }</Text>
      
      {/* 
        THIS ICON IS FROM HEROICONS LIBRARY PASTED DIRECTLY INTO THIS CODE 
        A BETTER ICON IMPLEMENTATION IS NEEDED
      */}
      <svg className={`bmds-select__caret ${ isOpen ? 'bmds-select__caret--open' : 'bmds-select__caret--closed' }`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
      </svg>
    </button>

    {isOpen ? 
      <ul style={{ top: overlayTop }} className='bmds-select__overlay'>
        {options.map((option, optionIndex) => {
          const isSelected = selectedIndex === optionIndex;

          const renderOptionProps = {
            option,
            isSelected,
            getOptionRecommendedProps: (overrideProps = {}) => {
              return {
                className: `bmds-select__option
                  ${isSelected ? 'bmds-select__option--selected' : ''}
                `,
                key: option.value,
                onClick: () => onOptionSelected(option, optionIndex),
                ...overrideProps
              }
            }
          }

          if (renderOption) {
            return renderOption(renderOptionProps)
          }
          return (
            <li 
              className={`bmds-select__option
                ${isSelected ? 'bmds-select__option--selected' : ''}
              `}
              onClick={() => onOptionSelected(option, optionIndex)} 
              value={option.value} 
              key={option.value}
            >
              <Text>
                {option.label}
              </Text>

              {/* 
                THIS ICON IS FROM HEROICONS LIBRARY PASTED DIRECTLY INTO THIS CODE 
                A BETTER ICON IMPLEMENTATION IS NEEDED
              */}

              {isSelected ? (
                <svg className={`bmds-select__caret`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              ) : null}
            </li>)
        })}
      </ul>
    : null}
  </div>;
};

export default Select;
