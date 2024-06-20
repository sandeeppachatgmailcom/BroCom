 
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
type props=any
const ConfirmationWindow = ({  message, onConfirm }:props) => {
  const handleConfirm = () => {
    onConfirm()
    toast.dismiss(); // Dismiss the toast
    
  };

  const handleCancel = () => {
    toast.dismiss(); // Dismiss the toast
      
  };

  return (
    <div className="block    ">
      <div className=" flex w-full ">{message}</div>
      <div className=" flex justify-end "> 
      <button className="bg-gray-500 m-1  p-2 text-white rounded-md w-[60px] item-center flex justify-center " onClick={handleConfirm}>Yes</button>
      <button className="bg-blue-500 m-1  text-white rounded-md w-[60px] item-center flex justify-center p-2 " onClick={handleCancel}>No</button>
      </div>
    </div>
  );
};

export default ConfirmationWindow
