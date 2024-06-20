import   { useEffect, useState } from 'react';
type props = any
const ButtonSwitch = ({name, value, onChange }:props) => {
  const [stateValue, setStateValue] = useState(value);
    useEffect(()=>{
      setStateValue(value)
    },[value])
  const handleClick = () => {
    const newValue = !stateValue;
    setStateValue(newValue);
    onChange && onChange( name,newValue);
  };

  return (
    <button
      className={`w-12 h-6 rounded-full align-middle items-center flex focus:outline-none transition-colors ${stateValue ? 'bg-blue-500' : 'bg-orange-700'}`}
      onClick={handleClick}
    >
      <span className={`flex ali  w-7 h-7 border-spacing-2 border-gray-700 rounded-full bg-white shadow-gray-700  shadow-md transform transition-transform ${stateValue ? 'translate-x-8' : ''}`}></span>
    </button>
  );
};

export default ButtonSwitch;