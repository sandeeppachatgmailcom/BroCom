import  {  useEffect  } from 'react'; 
 
const GeneralTask = (props:any) => {
   useEffect(()=>{
    console.log(props,'props')
   },[props])
   
   
  const handleChange = (e:HTMLTextAreaElement)=>{
    props.onChange(e)
  }



   return (
    <div className=" w-full border-4 border-gray-200 border-opacity-10  rounded-xl overflow-hidden">
          <div className=" top-4 left-4">
            <textarea value={props.value}  name={props.name} onChange={(e:any)=>handleChange(e)} className=' p-3 w-full h-[250px] bg-gray-500 text-white focus:outline-none  '   >  </textarea>
              <div className='flex justify-end'>
              {!props.verified ?
              <button onClick={() => props.onSaveClick()} className="bg-blue-500 text-white rounded-md   shadow-sm m-2 p-4 w-20  " >
                SAVE
              </button>:<div className='w-full p-1'>
                <h1 className='font-semibold ' >Trainer Remarks</h1>
              <textarea value={props.data.comment} readOnly  className=' p-3 w-full h-[250px] bg-gray-500 text-white focus:outline-none  '   >  </textarea>
                  </div>}
              </div>
          </div>
      </div>
  );
};

export default GeneralTask;
