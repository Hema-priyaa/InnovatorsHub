import React, { useState } from 'react'
import Spinner from '../../helpers/Spinner';
import {__DB} from "../../backend/FirebaseConfig"
import toast from 'react-hot-toast';
import { setDoc,doc } from 'firebase/firestore';
 
const AddAlbum = () => {
  let [isLoading,setisLoading]=useState(false)
let[album,setAlbum]=useState({
  albumTitle:"",
  albumposter:null,
  releasedate:"",
  language:"",
  albumdescription:""
})

let {albumTitle,albumposter,releasedate,language,albumdescription}=album;

let handleAlbumChange=(e)=>{
  let value=e.target.value
  let key=e.target.name
  setAlbum({...album,[key]:value})
}

let handleAlbumPosterChange=(e)=>{
  let file=e.target.files[0]
  setAlbum({...album,albumposter:file})
}

let initialSongData={
  songName:"",
  songFile:null,
  songThumbnail:null,
  songSingers:"",
  songMood:"",
  songDirector:""

}
let[songs,setSongs]=useState([initialSongData])

let handleSubmit=async(e)=>{
  e.preventDefault()
  setisLoading(true)
  try{
    
    let albumPosterData= new FormData()
    albumPosterData.append("file",albumposter)
    albumPosterData.append("upload_preset","Innovators hub music")
    
    let response= await fetch("https://api.cloudinary.com/v1_1/dvajm4oof/image/upload",{
      method:"POST",
      body:albumPosterData
    })
    let result= await response.json();
    // console.log(result);
    let albumId=result.asset_id;
    let albumPosterURL=result.url;

    let albumData={
      albumId:albumId,
      albumTitle:albumTitle,
      albumposter:albumPosterURL,
      releasedate:releasedate,
      language:language,
      albumdescription:albumdescription
    }
    console.log(albumData);
    // console.log(songs)

    let songData=[]
    await Promise.all(songs.map(async(value,index)=>{
      let songThumbnailData=new FormData()
      songThumbnailData.append("file",value.songThumbnail)
      songThumbnailData.append("upload_preset","Innovators hub music")

      let songThumbnailResponse=await fetch("https://api.cloudinary.com/v1_1/dvajm4oof/image/upload",{
        method:"POST",
        body:songThumbnailData
      })
      let songThumbnailResult=await songThumbnailResponse.json();
    
      let songThumbnailURL=songThumbnailResult.url


      let songFileData=new FormData()
      songFileData.append("file",value.songFile)
      songFileData.append("upload_preset","Innovators hub music")

      let songFileResponse=await fetch("https://api.cloudinary.com/v1_1/dvajm4oof/upload",{
        method:"POST",
        body:songFileData
      })
      let songFileResult=await songFileResponse.json();
      // console.log(songFileResult);
      
    
      let songFileURL=songFileResult.url
      let songFileFormat=songFileResult.format
      let songFileBytes=songFileResult.bytes
      let songFileId=songFileResult.asset_id
      let songFileDuration=songFileResult.duration
      // let songFilelength=songFileResult.length
      // console.log(songThumbnailURL);
      // console.log(songFileURL);
      // console.log(songFileFormat);
      // console.log(songFileBytes);
      // console.log(songFileId);
      // console.log(songFileDuration);
      // console.log(songFileBytes);

      let songPayLoad={
        songId:songFileId,
        songName:value.songName,
        songURL:songFileURL,
        songThumbnailURL:songThumbnailURL,
        songFormat:songFileFormat,
        songBytes:songFileBytes,
        songDuration:songFileDuration,
        songSingers:value.songSingers,
        songMood:value.songMood,
        songDirector:value.songDirector
      }
      songData.push(songPayLoad)

     
      
    }))
    

    let payload={...albumData,songs:songData}
    console.log(payload);
    let album_collection=doc(__DB,"album_collection",albumData.albumId)
    await setDoc(album_collection,payload);
  }
  catch(error){
    console.log(error);
    toast.error(error.message)
    
  }
  finally{
    setisLoading(false)
  }
  
}

let addSong=()=>{
  setSongs([...songs,{...initialSongData}])
}

let removeSong=(ind)=>{
  let newsong=songs.filter((value,index)=>index!==ind)
    setSongs(newsong)
}

let handleSongChange=(e,index)=>{
  let value=e.target.value
  let key=e.target.name
  let copy=[...songs]
  copy[index][key]=value
  setSongs(copy)
}

let handleSongFileChange=(e,index)=>{
  let file=e.target.files[0]
  let key=e.target.name
  let copy=[...songs]
  copy[index][key]=file
  setSongs(copy)
}

  return (
  <section className="h-[100%] w-[100%] bg-gray-400 flex justify-center p-6">
      <article className="min-h-[800px] w-[75%] bg-amber-100 rounded-xl p-4">
        
        <h2 className="text-black text-center text-2xl">Add Album</h2>
        <form className='mt-3' onSubmit={handleSubmit}>
          <h3 className='text-black text-xl'>Album Details</h3>
        <article className='mt-3 flex flex-wrap gap-3'>
        <div className="flex flex-col gap-2 w-[48%]">
              <label htmlFor="albumTitle" className="text-black ">
                Album Title
              </label>
              <input
                type="text"
                id="albumTitle"
                // required
                placeholder="Enter Album Title"
                className="border-black border-2 placeholder-black w-[100%] h-9 rounded-lg px-3 text-black"
               name='albumTitle' value={albumTitle} onChange={handleAlbumChange}
              />
            </div>
            <div className="flex flex-col gap-2 w-[48%]">
              <label htmlFor="albumposter" className="text-black ">
                Album Poster
              </label>
              <input
                type="file"
                id="albumposter"
                // required
                placeholder="Enter Album Poster"
                className="border-black border-2 placeholder-black w-[100%] h-9 rounded-lg px-3 text-black file:bg-blue-300 file:text-black file:border-2 file:mt-0.5 file:px-1 file:rounded-lg file:text-small"
                name='albumposter' onChange={handleAlbumPosterChange}
              />
            </div>
            <div className="flex flex-col gap-2 w-[48%]">
              <label htmlFor="releasedate" className="text-black ">
                Release Date
              </label>
              <input
                type="date"
                id="releasedate"
                // required
                placeholder="Enter Album Title"
                className="border-black border-2 placeholder-black w-[100%] h-9 rounded-lg px-3 text-black"
                name='releasedate' value={releasedate} onChange={handleAlbumChange}
              />
            </div>
            <div className="flex flex-col gap-2 w-[48%]">
              <label htmlFor="language" className="text-black ">
                Language
              </label>
              <input
                type="text"
                id="language"
                // required
                placeholder="Enter Album Language"
                className="border-black border-2 placeholder-black w-[100%] h-9 rounded-lg px-3 text-black"
                name='language' value={language} onChange={handleAlbumChange}
              />
            </div>
            <div className="flex flex-col gap-2 w-[98%]">
              <label htmlFor="albumdescription" className="text-black ">
                Album Description
              </label>
              <textarea
               
                id="albumdescription"
                // required
                placeholder="Enter Album Descriptiom"
                className="border-black border-2 placeholder-black w-[100%] h-[60px] rounded-lg px-3 text-black"
                name='albumdescription' value={albumdescription} onChange={handleAlbumChange}
              />
            </div>
        </article>
        <h3 className='mt-3 text-black'>Song Details</h3>
        <article className='mt-3 flex flex-col gap-4'>
          {songs.map((value,index)=>{
            return(
              <section className='bg-slate-500 rounded-lg p-4 w-[98%]' key={index}>
                <h4 className='text-center'> Song{index+1}</h4>
                <main className='flex flex-wrap gap-3'>
                <div className="flex flex-col gap-2 w-[32%]">
              <label htmlFor="songName" className="text-black ">
                Song Name
              </label>
              <input
                type="text"
                id="songName"
                required
                placeholder="Enter Song Name"
                className="border-black border-2 placeholder-black w-[100%] h-10 rounded-lg px-3 text-black"
               value={value.songName} name='songName' onChange={(e)=>handleSongChange(e,index)}
              />
            </div>
            <div className="flex flex-col gap-2 w-[32%]">
              <label htmlFor="songFile" className="text-black ">
                Song File
              </label>
              <input
                type="file"
                id="songFile"
                required
                // placeholder="Enter Album Title"
                className="border-black border-2 placeholder-black w-[100%] h-10 rounded-lg px-3 text-black file:bg-white file:border-2 file:border-black file:mt-1 file:rounded-lg file:px-3"
               name='songFile'  onChange={(e)=>handleSongFileChange(e,index)}
              />
            </div>
            <div className="flex flex-col gap-2 w-[32%]">
              <label htmlFor="songThumbnail" className="text-black ">
                Thumbnail
              </label>
              <input
                type="file"
                id="songThumbnail"
                required
                // placeholder="Enter Album Title"
                className="border-black border-2 placeholder-black w-[100%] h-10 rounded-lg px-3 text-black  file:bg-white file:border-2 file:border-black file:mt-1 file:rounded-lg file:px-3"
                name='songThumbnail'  onChange={(e)=>handleSongFileChange(e,index)}
              />
            </div>
            <div className="flex flex-col gap-2 w-[32%]">
              <label htmlFor="songSingers" className="text-black ">
                Song Singers
              </label>
              <input
                type="text"
                id="songSingers"
                required
                placeholder="Enter singers"
                className="border-black border-2 placeholder-black w-[100%] h-10 rounded-lg px-3 text-black"
               name='songSingers' value={value.songSingers} onChange={(e)=>handleSongChange(e,index)}
              />
            </div>
            <div className="flex flex-col gap-2 w-[32%]">
              <label htmlFor="songMood" className="text-black ">
                Song Mood
              </label>
              <input
                type="text"
                id="songMood"
                required
                placeholder="Enter song mood"
                className="border-black border-2 placeholder-black w-[100%] h-10 rounded-lg px-3 text-black"
               name='songMood' value={value.songMood} onChange={(e)=>handleSongChange(e,index)}
              />
            </div>
            <div className="flex flex-col gap-2 w-[32%]" >
              <label htmlFor="songDirector" className="text-black ">
                Director
              </label>
              <input
                type="text"
                id="songDirector"
                required
                placeholder="Enter Director"
                className="border-black border-2 placeholder-black w-[100%] h-10 rounded-lg px-3 text-black"
               name='songDirector' value={value.songDirector} onChange={(e)=>handleSongChange(e,index)}
              />
            </div>
            <div className='flex justify-between w-[98%]'>
              <div>
                {songs.length-1===index && (
                <input type="button" value="Add Song" className='py-2 px-4 bg-blue-200 rounded-lg border-black border-2 text-black cursor-pointer' onClick={addSong} />)}
              </div>
              <div>
                
              {songs.length > 1 && (
  <input
    type="button"
    value="Remove Song"
    className="py-2 px-4 bg-blue-200 rounded-lg border-black border-2 text-black cursor-pointer"
    onClick={() => removeSong(index)}
  />
)}
              </div>
            </div>
                </main>
              </section>
            )
          })}
        </article>
        <button className='w-[98%] bg-blue-600 h-9 rounded-lg mt-3 border-3 border-black cursor-pointer' >Upload</button>
        </form>
      </article>
      {isLoading && <Spinner/>}
      </section>
  )
}

export default AddAlbum
