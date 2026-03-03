import React, { useContext,useState } from 'react'
import { useLocation } from 'react-router-dom'
import { AlbumContextAPI } from '../../context/AlbumContext'
import { LuCirclePlay } from "react-icons/lu";

const AlbumDetails = () => {

    let data=useLocation()
    // console.log(data);
    
    
    let{state:{album}}=data

    const [hoveredIndex, setHoveredIndex] = useState(null);
    // console.log(album);
    let {songs,setSongs,isPlaying,setIsPlaying,currentSongIndex,setCurrentSongIndex}=useContext(AlbumContextAPI)

    let handleClick=(index)=>{
        setSongs(album.songs)
        setCurrentSongIndex(index)
        if(currentSongIndex==index){
            setIsPlaying(!isPlaying)
        }
        else{
            setIsPlaying(true)
        }
    }

    
  return (
    <section className='p-6 text-black'>
        <article className='flex gap-8'>
            <aside className='shrink-0 bg-amber-100  flex justify-center items-center rounded-lg'> 
                <img src={album.albumposter} alt=""  className='h-[370px] w=[320px] rounded-md'/>
            </aside>
            <aside className='mt-8'>
            <h2 className='text-3xl font-semibold'>{album.albumTitle}</h2>
            <ul className="mt-4 flex flex-col gap-3 text-lg">
            <li className="flex">
                 <span className="w-[160px]">Title</span>
                 <span>{album.albumTitle}</span>
             </li>
             <li className="flex">
                 <span className="w-[160px]">Number of Tracks</span>
               <span>{album.songs.length}</span>
             </li>
             <li className="flex">
                 <span className="w-[160px]">Release Date</span>
               <span>{album.releasedate}</span>
             </li>
             <li className="flex">
                 <span className="w-[160px]">Languages</span>
               <span>{album.language}</span>
             </li>
             <li className="flex">
                 <span className="w-[160px] shrink-0">Description:</span>
               <span>{album.albumdescription}</span>
             </li>
           </ul>
            </aside>
        </article>
        <main className={`p-2 mt-4 bg-slate-500 rounded-lg ${currentSongIndex!==null && "mb-[120px]"}`}>
            <h3 className='text-xl px-4 '>Songs List</h3>
            <table className='w-full mt-4 text-left rounded-lg overflow-hidden'>
                <thead className='bg-slate-700 uppercase w-full'>
                    <tr className='text-amber-100'>
                        <th className='px-4 py-3'></th>
                        <th className='px-3 py-2'>Track</th>
                        <th className='px-3 py-2'>Song Name</th>
                        <th className='px-3 py-2'>Singers</th>
                        <th className='px-3 py-2'>Director</th>
                        <th className='px-3 py-2'>Mood</th>
                        <th className='px-3 py-2'>Duration</th>
                    </tr>
                </thead>
                <tbody className='w-full'>
                    {album.songs.map((song,index)=>{
                        return (
                        <tr className='border-y-2 border-slate-700 hover:border-white cursor pointer' key={song.songId}
                        onMouseEnter={() => setHoveredIndex(index)}
                        onMouseLeave={() => setHoveredIndex(null)}>
                            <td className='py-2 text-center cursor-pointer' onClick={()=>handleClick(index)}><span className="flex justify-center items-center">
                      {hoveredIndex === index ? (
                        <LuCirclePlay size={20} />
                      ) : (
                        index + 1
                      )}
                    </span></td>
                            <td className='py-2 text-center'>
                                <img src={song.songThumbnailURL} alt="" className='h-[80px] w-[80px]'/>
                            </td>
                            <td className='py-2 '>{song.songName}</td>
                            <td className='py-2'>{song.songSingers}</td>
                            <td className='py-2'>{song.songDirector}</td>
                            <td className='py-2'>{song.songMood}</td>
                            <td className="py-2 text-center">
                            {Math.floor(song.songDuration / 60)}:
                            {String(Math.floor(song.songDuration % 60)).padStart(2,"0")}
                            </td>
                        </tr>)
                        
                    })}

                </tbody>
            </table>
        </main>
    </section>
  )
}

export default AlbumDetails


