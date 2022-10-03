import React from 'react'
import  {useState} from 'react'  

function Home({info}) {



    return (
        <div className="App">
           {info.email}
        </div>
    )
}

export default Home;