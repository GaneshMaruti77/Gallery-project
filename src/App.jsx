import React, { useEffect, useState } from 'react'
import axios from 'axios'

function App() {
  const [UserData, setUserData] = useState([])
  const [index, setindex] = useState(0)
  function previous(){
    if(index>0){
      setindex(index-1)
    }
    console.log(index)
  }
  function next(){
    setindex(index+1)
    console.log(index)
  } 
  const getData = async () =>{
    const response = await axios.get(`https://picsum.photos/v2/list?page=${index}&limit=30`);
    setUserData(response.data)
  }
  useEffect(function(){
    getData()
  },[index])
  let printUserData = 'no user available'
  if(UserData.length>0){
    printUserData = UserData.map((elem,idx)=>{
      return (
      <div key={idx}>
        <a href={elem.url} target="_blank">
          <div className='h-40 w-44 bg-white overflow-hidden rounded-2xl'>
          <img className ='h-full object-cover' src={elem.download_url} alt={elem.title} />
          </div>
        </a>
        <h2 className='font-bold text-lg'>{elem.author}</h2>
      </div>
      )
    })
  }
  return (
    <div className = 'bg-black overflow-auto h-screen p-4 text-white'>

      <div className='flex flex-wrap gap-4'>
        {printUserData}
      </div>
      <div className='flex justify-center gap-6 items-center p-4 '>
        <button 
          className='bg-amber-400 text-sm cursor-pointer activate:scale-95 text-black rounded px-4 py-2 font-semibold'onClick={previous}>prev</button>
        <button 
          className='bg-amber-400 text-sm cursor-pointer activate:scale-95 text-black rounded px-4 py-2 font-semibold'
          onClick={next}>next</button>
      </div>
    </div>
  )
}

export default App
