import React from 'react'
import Uiltwi from "@iconscout/react-unicons/icons/uil-twitter";
import Uilins from "@iconscout/react-unicons/icons/uil-instagram";
import Uilfb from "@iconscout/react-unicons/icons/uil-facebook";
import Uilphone from "@iconscout/react-unicons/icons/uil-phone";


export default function 
() {
  return (
    <div className='bg-gray-900 flex flex-col md:flex-row py-5 text-white items-center md:justify-evenly overflow-hidden ml-4 md:ml-0'>
        <div className='flex flex-col md:space-y-5 py-4 md:space-x-4'>
            <span className='w-[250px] flex flex-row'>
            <Uilphone size="20" color="#FFF" />
                Call Us: 987-987-678
            </span>
            <span>www.mail@gmail.com</span>
        </div>
        <div className='flex flex-col space-y-5 mt-5'>
            <span>Follow Us: </span>
            <div className='flex flex-row space-x-5 '>
            <Uiltwi size="25" color="#FFF" />
            <Uilins size="25" color="#FFF" />
            <Uilfb size="25" color="#FFF" />
            </div>
        </div>
    </div>
  )
}
