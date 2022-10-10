import React from 'react'
import  {useState, useEffect} from 'react'  
import Axios from 'axios';
import TodoForm from './TodoForm';
import TodoList from './TodoList';

function Home() {

    const url = '/home';
    const [info, setInfo] = useState({email: "", username: "", description: ""});
    const [notes, setNotes] = useState([{note_id: "", person_id: "", description: ""}]);

    useEffect(() => {
        getInfo();
      }, []);

      const getInfo = () => Axios.get(url, 

     {
      headers: {
        Accept: '*/*',
        'Content-Type': 'application/json',
    },
     })
        .then(res => {
          
          setInfo({...info, username: res.data.data.username, email: res.data.data.email, description: res.data.data.description});
          setNotes(res.data.data.notes);

        });
    
        return (
            <div className="app-home">
                 <h1>Hi {info.email}</h1>
                <TodoList/>
               
            </div>
        )
        
}

export default Home;