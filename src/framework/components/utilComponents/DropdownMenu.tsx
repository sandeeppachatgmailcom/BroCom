import React from 'react';
import { useSelector } from 'react-redux';
import { DropdownMenuComponent } from '../../../entity/components/utilComponents/DropdownMenu';

const DropdownMenu: React.FC<DropdownMenuComponent | any > = (props) => {
    const { items, name, value, onChange } = props;
     
    const dartText = useSelector((state:any) => state.theme.inputtext);
    
    return (
        <div className=" border-none border-gray-200 bg-transparent  rounded h-[50px] align-middle block dropdown w-full">
            <select   name={name} value={value} className={`${dartText} bg-transparent h-full focus:outline-none focus:border-blue-500  w-full`} onChange={onChange}>
                <option selected  key={'select'} className='flex h-10 bg-transparent text-gray-600  '  > Select </option>   
                {items.map((item: any,index) => {
                 
                  return  <option className=' h-[100px] border m-1 bg-blue-500 bg-transparent text-gray-600 ' key={index} value={item.id} selected={item.id === value}> {item.name.split('')[0]?.toUpperCase() +item.name.split('').splice(1,item.name.length).join('') } </option>
                })}
            </select>
        </div>
    );
};

export default DropdownMenu;
