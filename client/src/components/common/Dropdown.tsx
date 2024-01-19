import { useState } from 'react';
import { OptionType } from '../../interfaces';

const Dropdown = ({
  options,
  handleOptionClick,
  selectedOption,
}: {
  options: OptionType[];
  handleOptionClick: (
    option: OptionType,
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
  ) => void;
  selectedOption: string | null;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="w-full relative inline-block text-left z-200 py-1">
      <div>
        <button
          type="button"
          className="w-full inline-flex justify-start items-center px-4 py-2 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-gray-700 hover:bg-gray-700 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-800 transition ease-in-out duration-150"
          id="options-menu"
          aria-haspopup="true"
          aria-expanded="true"
          onClick={toggleDropdown}
        >
          {selectedOption || options[0].option}
        </button>
      </div>

      {isOpen && (
        <div className="z-50 w-full origin-top-right absolute right-0 mt-2 rounded-md shadow-lg bg-gray-700 ring-1 ring-black ring-opacity-5">
          <div
            className="py-1"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            {options.map((option) => (
              <p
                key={option.id}
                className="z-50 w-full block px-4 py-2 text-sm text-white hover:bg-gray-700 cursor-pointer"
                role="menuitem"
                onClick={() => handleOptionClick(option, setIsOpen)}
              >
                {option.option}
              </p>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
