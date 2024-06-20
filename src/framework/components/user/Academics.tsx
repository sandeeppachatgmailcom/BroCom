import   { useState } from 'react';
import { CiEdit } from 'react-icons/ci';
import { useSelector } from 'react-redux';
import EditAcademicModal from './EditAcademicModal';

const Academics = ({ course,arrayindex }:{course :any, arrayindex?:number}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const theme = useSelector((state:any)=>state.theme.theme)
    

    // Function to toggle the modal state
    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };
    const handleClose = () => { setIsModalOpen(false) }

    return (
        <div className= {`${theme} h-[200px]     xl:w-1/4 md:w-1/4 sm:w-full rounded-lg shadow-lg p-4 me-1 flex flex-col justify-between `}>
            <div className="block w-full">
                <div className="block ">
                    <h5 className="text-lg font-semibold mb-2">Course: {course.course}</h5>
                </div>
                <p className="text-sm mb-2">Institution: {course.institute}</p>
                <p className="text-sm mb-2">period: {course.startYear}-{course.endYear}</p>
                <p className="text-sm mb-4">Mark %: {course.mark}</p>
            </div>
            <button onClick={toggleModal} className="text-white-600 hover:text-blue-700 self-end">
                <CiEdit className="w-5 h-5" />
            </button>
            {isModalOpen ? <EditAcademicModal arrayindex={arrayindex} course={course} onClose={handleClose} /> : ''}

        </div>
    );
};

export default Academics;
