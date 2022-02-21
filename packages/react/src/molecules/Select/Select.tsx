import React, { useState, useRef, useEffect, KeyboardEventHandler, createRef } from 'react';
import Text from '../../atoms/Text';

const KEYS = {
  ENTER: "Enter",
  SPACE_BAR: " ",
  DOWN_ARROW: "ArrowDown",
  UP_ARROW: "ArrowUp",
  ESC: "Escape"
}

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

const getNextOptionIndex = (currentIndex: number|null, options: Array<SelectOption>) => {
  if (currentIndex === null) {
    return 0;
  }
  if (currentIndex === options.length - 1) {
    return 0;
  }
  return currentIndex + 1;
}

const getPreviousOptionIndex = (currentIndex: number|null, options: Array<SelectOption>) => {
  if (currentIndex === null) {
    return 0;
  }
  if (currentIndex === 0) {
    return options.length - 1;
  }
  return currentIndex - 1;
}

const Select: React.FunctionComponent<SelectProps> = ({ options = [], label = 'Select an option...', onOptionSelected: handler, renderOption }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedIndex, setSelectedIndex] = useState<number|null>(null);
  const [highlightedIndex, setHighlightedIndex] = useState<number|null>(null);
  const [overlayTop, setOverlayTop] = useState<number>(0);
  const [optionRefs, setOptionRefs] = useState<React.RefObject<HTMLLIElement>[]>([])
  const labelRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setOverlayTop((labelRef.current?.offsetHeight || 0) + 10)
  }, [labelRef.current?.offsetHeight]);

  useEffect(() => {
    setOptionRefs(options.map(_ => createRef<HTMLLIElement>()))
  }, [options.length]);
  
  useEffect(() => {
    if(highlightedIndex !== null && isOpen) {
      const ref = optionRefs[highlightedIndex];

      if(ref && ref.current) {
        ref.current.focus();
      }
    }
  }, [isOpen, highlightedIndex])

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

  const highlightOption = (optionIndex: number|null) => {
    setHighlightedIndex(optionIndex);
  }

  const onButtonKeyDown: KeyboardEventHandler = (event) => {
    event.preventDefault();

    if([KEYS.ENTER, KEYS.SPACE_BAR, KEYS.DOWN_ARROW].includes(event.key)) {
      setIsOpen(true);

      // set focus on the list item
      highlightOption(0);
    }
  }

  const onOptionKeyDown: KeyboardEventHandler = (event) => {
    if(event.key === KEYS.ESC) {
      setIsOpen(false);

      return
    }

    if(event.key === KEYS.DOWN_ARROW) {
      highlightOption(getNextOptionIndex(highlightedIndex, options));
    }
    if(event.key === KEYS.UP_ARROW) {
      highlightOption(getPreviousOptionIndex(highlightedIndex, options));
    }
    if(event.key === KEYS.ENTER) {
      onOptionSelected(options[highlightedIndex!], highlightedIndex!);
    }
  }

  let selectedOption = null;
  if(selectedIndex !== null) {
    selectedOption = options[selectedIndex];
  }

  return <div className='bmds-select'>
    <button 
      className='bmds-select__label' 
      ref={labelRef} 
      aria-haspopup={true} 
      aria-expanded={isOpen? true : undefined} 
      aria-controls='bmds-select-list'
      onClick={() => onLabelClick()}
      onKeyDown={onButtonKeyDown}
      tabIndex={0}
      data-testid="BmdsSelectButton"
    >
      <Text>{selectedOption === null ? label : selectedOption.label }</Text>
      
      {/* 
        THIS ICON IS FROM HEROICONS LIBRARY PASTED DIRECTLY INTO THIS CODE 
        A BETTER ICON IMPLEMENTATION IS NEEDED
      */}
      <svg className={`bmds-select__caret ${ isOpen ? 'bmds-select__caret--open' : 'bmds-select__caret--closed' }`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
      </svg>
    </button>

    {
      <ul 
        role='menu' 
        id='bmds-select-list' 
        style={{ top: overlayTop }} 
        className={`bmds-select__overlay ${ isOpen ? 'bmds-select__overlay--open' : '' }`}

      >
        {options.map((option, optionIndex) => {
          const isSelected = selectedIndex === optionIndex;
          const isHighlighted = highlightedIndex === optionIndex;

          const ref = optionRefs[optionIndex];

          const renderOptionProps = {
            option,
            isSelected,
            getOptionRecommendedProps: (overrideProps = {}) => {
              return {
                ref,
                role: 'menuitemradio',
                'aria-label': option.label,
                'aria-checked': isSelected ? true : undefined,
                tabIndex: isHighlighted ? -1 : 0,
                className: `bmds-select__option
                  ${isSelected ? 'bmds-select__option--selected' : ''}
                  ${isHighlighted ? 'bmds-select__option--highlighted' : ''}
                `,
                key: option.value,
                onClick: () => onOptionSelected(option, optionIndex),
                onMouseEnter: () => highlightOption(optionIndex),
                onMouseLeave: () => highlightOption(null),
                onKeyDown: onOptionKeyDown,
                ...overrideProps
              }
            }
          }

          if (renderOption) {
            return renderOption(renderOptionProps)
          }
          return (
            <li 
              {...renderOptionProps.getOptionRecommendedProps()}
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
    }
  </div>;
};

export default Select;
