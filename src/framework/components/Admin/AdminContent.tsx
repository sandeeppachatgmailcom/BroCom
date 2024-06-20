import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Batch from './Batch'
import { BatchComponent } from '../../../entity/response/Batch'
import axiosApi from '../../api/axios'
import { utilityApis } from '../../../entity/constants/api'
import { AdminContent_Component } from '../../../entity/components/admin/adminContentComponent'
const AdminContent :React.FC<{}> = (_props:AdminContent_Component) => {
    const darkTheme = useSelector((state:any ) => state.theme.theme)
    
    const [batch, setBatch] = useState<BatchComponent[]>([])
    const [menu, setMenu] = useState<string>('')
    const [page, setPage] = useState(1)
    const [menuIndex,setMenuIndex] = useState(0)
    const [activebatch, setActiveBatch] = useState<BatchComponent>({
        batchName: '',
        venue: ' ',
        batchId:'',
        active: false,
        deleted: false,
        trainer: '',
        cordinator: '',
        BatchType:'',
        edited:false,
        location:'',
        maxCapacity:0
    })
    const loadActiveBatches =async ()=>{
        const batches = await axiosApi.get(utilityApis.listAllBatches);
        console.log(batches.data,'api called again')
        setBatch(batches.data)
    } 

    
    useEffect(()=>{
        const data = [ 
            ...batch,
        ]
        data[menuIndex]=activebatch   
        setBatch(data)
    },[activebatch])



    useEffect(()=>{
        loadActiveBatches();
    },[])
    

    return (
        <div className={`${darkTheme} xl:flex sm:block bg-blue-500 bg-opacity-10 shadow-md       w-full     rounded-xl`}>
            <div className='xl:w-1/6  m-1 rounded border-r-2 border-gray-500 border-opacity-15  '>
                 
                <div className='w-full xl:block flex   m-1 rounded sm:flex lg:flex md:flex  sm:flex-wrap flex-wrap ' >
                    {Object.keys(batch).length? batch.map((item, index) => {
                        if (index < page * 5 && index >= (page - 1) * 5) return <button onClick={    () =>{  setMenu(item?.batchName as string);   setActiveBatch(item);setMenuIndex(index)}} className={`font-bold h-[60px] flex m-1 p-2 text-start items-center bg-opacity-80 
                        ${menu === item.batchName ? 'bg-blue-200 text-blue-500 shadow-sm shadow-blue-200 ' : 'bg-blue-000  '}
                          xl:w-5/6 rounded-full xl:rounded-s
                      `} key={item.batchName} > {item?.batchName?.toUpperCase()} </button>
                    }):''}
                    
                </div>
                <div className='flex  bottom-0 start-0  ' >
                        {(() => {
                            const count = Math.ceil(batch.length / 5)
                            let outArray = []
                            for (let i = 1; i <= count; i++) {
                                outArray.push(<button  key={i} onClick={() => setPage(i)} className='ms-1  border rounded font-semibold text-blue-400 w-5' >{i}</button>)
                            }
                            return outArray
                        }
                        )()
                        }
                </div>
            </div>
            <div className='w-full    rounded-lg   '>
                { menu==activebatch?.batchName? <Batch setActiveBatch={setActiveBatch} activebatchs ={activebatch } />:''} 
            </div>
        </div>
    )
}


export default AdminContent
