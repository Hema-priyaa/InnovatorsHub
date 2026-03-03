import React, { useContext } from 'react'
import Spinner from '../../helpers/Spinner'
import { AlbumContextAPI } from '../../context/AlbumContext'
import { NavLink } from 'react-router-dom'

const Dashboard = () => {
let{albums,isLoading}=useContext(AlbumContextAPI)
console.log(albums);


  return (
    <div className='p-8 w-[80%]'>
        <h2 className='text-3xl font-semibold font-serif text-black'>Album</h2>
        <section className='mt-4 flex gap-4 overflow-x-auto scrollbar-hide'>
            {albums.map((album)=>{
                return(
                    <NavLink to="/album-details" state={{album}}key={album.albumId} className='bg-gray-500 rounded-lg h-[320px] w-[320px] flex flex-col items-center shrink-0 hover:h-[350px] hover:bg-slate-900'>
                <img src={album.albumposter} alt=""  className='h-[230px] w-[230px] rounded-lg mt-6 mb-1 hover:h-[300px] hover:w-[300px] hover:mt-2'/>
                <h3 className='text-center font-medium text-xl  font-serif'>{album.albumTitle}</h3>
            </NavLink >
                )
            })}
            
        </section>
      {isLoading && <Spinner/>}
    </div>
  )
}

export default Dashboard
