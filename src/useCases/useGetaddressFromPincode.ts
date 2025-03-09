import axios from "axios"
import { publicApi } from "../entity/constants/api"

const useGetAddressFromPincode = ()=>{
    const loadAddress = async (pincode:string|number) => {
        const address = await axios.get(`${publicApi.getPincode}${pincode}`)
        return address.data[0].PostOffice
    }

    return loadAddress
}

export default useGetAddressFromPincode