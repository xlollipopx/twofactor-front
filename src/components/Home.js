import React from 'react'
import  {useState} from 'react'  

function Home({info, notes}) {



    return (
        <div className="App">
           {info.email}
           {notes}
        </div>
    )
}

export default Home;