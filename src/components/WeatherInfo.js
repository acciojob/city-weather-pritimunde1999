
import axios from "axios";
import React, { useEffect, useState } from "react";


const WeatherInfo = () => {
    const[data,setData] = useState("");
    const[city,setCity] = useState("");
    const[text,setText] = useState("");
    const API_KEY = "7e304c222e37991f872ba87661078242";

   useEffect(()=>{
         function fetchData(){
          axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`)
          .then((res)=>setData(res.data))
          .catch((err)=>console.log(err.message));
      }
      fetchData()
   },[city])

   

    function handleKeyPress(event){
        if(event.key === 'Enter')
        {
            setCity(text);
            setText("")
        }
        
    }

    

  function convertToFarn(K){
    let F= (K - 273.15) * 9/5 + 32;
    F= F.toFixed(2);
    return F;
  }
    

  return (
    <div className="main">
       <input type="text" value={text}  className="search" onChange={e=>setText(e.target.value)} onKeyPress={handleKeyPress} placeholder="Enter a City" />
       
      {
          data && <div className="weather">
             <b>{data.name}</b>
             <h2>{convertToFarn(data.main.temp)}°F</h2>
             <p>{data.weather[0].description}</p>
             <img src={`https://openweathermap.org/img/wn/${data.weather[0].icon}.png`} alt="img"/>
          </div>
       }
    </div>
  )
}

export default WeatherInfo
