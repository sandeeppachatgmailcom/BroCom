import React, { useState } from 'react';
import { Modal_Component } from '../../entity/components/common/Modal';


const Modal:React.FC<Modal_Component>= ({   children }) => {
  const [count,setCount] = useState(0) 

  setInterval(()=>{
    setCount(count)
    if(count==900) setCount(100)
  },1000)
   
  return (
    <div className={`fixed inset-0 z-50 overflow-auto   flex justify-center items-center`}>
      <div className="modal-overlay fixed w-full h-full bg-gray-900 opacity-55"></div>
      <div className="modal-container  w-11/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto">
        <div className="modal-content py-4 text-left px-6">
          <div className="flex justify-between items-center pb-3">
          <div className="flex justify-center items-center h-full">
          <h1 className='text-2xl text-white' >please wait... its loading </h1>
             <div className="animate-spin rounded-full h-20 w-20 border-t-2 border-b-3 border-white">
                
                <div className={`border-green-800 text-orange-400 rounded-full   h-10 w-10`}>
                 
                
                </div>
                
             </div>
          </div>
           
          </div>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
