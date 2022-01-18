import React,{ useState,useEffect} from 'react'
import {ACCESS_KEY} from "./Config.js"

import "./img.css"

import axios from 'axios'


const App = () => {

  

  const [imagelist, setimagelist] = useState([]); //filtert state 

  const [tempimgfilter, settempimgfilter] = useState([]); //aal fress to show


 const [isloading, setisloading] = useState(true) //loding toggle state





  useEffect(() => {

    axios.get(`https://api.unsplash.com/photos/?client_id=${ACCESS_KEY}&per_page=30`)
    .then((response)=>{
      
      console.log(response.data)
      setimagelist(response.data)
      settempimgfilter(response.data)

      setisloading(false)
    
    }
    );
   
  }, [])


  const events=(query)=>{
  // console.log(e.target.value);


  console.log(query)
     
  if(query===""){

    setimagelist(tempimgfilter)


  }else{

   const filterimg=imagelist.filter((mug)=>{

  mug.alt_description=mug.alt_description===null?"react" :mug.alt_description;

    return mug.alt_description.includes(query);
 
  })
        setimagelist(filterimg)

         
   } 

  }
  return (
    <div>

      <div className="input">
        
        <input type="text" placeholder='search any images....'  onChange={(e)=> events(e.target.value)} />
        
      </div>
      

     <div className="rap">


     {/* {isloading?(<h1 style={{color:"#fff"}}>loading awiat once again ...</h1>):null} */}

        {imagelist.length>0?imagelist.map((bug,index)=>{

          return (<div key={index}> <img  src={bug.urls.regular} alt={bug.alt_description} />

           
            <br/>
        {bug.alt_description?bug.alt_description.substring(0,20):"react"}
          </div>
          
         
          )

        }):isloading?(<h1 style={{color:"#fff"}}>loading awiat once again ...</h1>):<h1 style={{color:"#fff"}}>image not found babe..</h1>} 

        </div>
      
    </div>
  )
}

export default App;
