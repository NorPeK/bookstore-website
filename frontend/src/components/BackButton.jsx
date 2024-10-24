import { Link } from "react-router-dom"
<<<<<<< HEAD
import { BsArrowLeft } from "react-icons/bs"


const BackButton = ({ destination = '/'}) => {
  return (
    <div className="flex">
        <Link to = {destination} className='bg-sky-800 text-white px-4 rounded-lg w-fit'>
            <BsArrowLeft className="text-2xl"/>
        </Link>
    </div>
=======

const BackButton = () => {
  return (
    <div>BackButton</div>
>>>>>>> f714f1bc3671b5e249a5fe4c59da20d685e4d28c
  )
}

export default BackButton