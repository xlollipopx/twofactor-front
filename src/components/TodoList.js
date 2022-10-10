import React, { useState,useEffect } from 'react';
import TodoForm from './TodoForm';
import Todo from './Todo';
import Axios from 'axios';

function TodoList() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    getTodos();
  }, []);

  const addTodo = todo => {
    if (!todo.description || /^\s*$/.test(todo.description)) {
      return;
    }

    createTodo(todo.description);

    console.log(...todos);
  };

  const getTodos = () => Axios.get('/home', 

    {
     headers: {
       Accept: '*/*',
       'Content-Type': 'application/json',
   },
    })
       .then(res => {
         setTodos(res.data.data.notes);

       });


   const createTodo = details => {
    const url = '/home/createNote';
    Axios.post(url,
      {
        description: details
      },
       {
      headers: {
        Accept: '*/*',
        'Content-Type': 'application/json',
    }
    })
        .then(res => {
            const todo = {note_id: res.data.data.note_id, description: res.data.data.description};

            const newTodos = [todo, ...todos];
            setTodos(newTodos);
        })
      
  }  
       
  const deleteTodo = details => {
    const url = '/home/deleteNote';
    Axios.post(url,
      {
        note_id: details,
        description: 'none'
      },
       {
      headers: {
        Accept: '*/*',
        'Content-Type': 'application/json',
    }
    })
        .then(res => {
           
        })
      
  }  
       
  const updateTodo = (todoId, newValue) => {
    if (!newValue.description || /^\s*$/.test(newValue.description)) {
      return;
    }

    setTodos(prev => prev.map(item => (item.note_id === todoId ? newValue : item)));
  };

  const removeTodo = id => {
    const removedArr = [...todos].filter(todo => todo.note_id !== id);
    deleteTodo(id);
    setTodos(removedArr);
  };

  const completeTodo = id => {
    let updatedTodos = todos.map(todo => {
      if (todo.note_id === id) {
        todo.isComplete = !todo.isComplete;
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  return (
    <>
      <h1>What's the Plan for Today?</h1>
      <TodoForm onSubmit={addTodo} />
      <Todo
        todos={todos}
        completeTodo={completeTodo}
        removeTodo={removeTodo}
        updateTodo={updateTodo}
      />
    </>
  );
}

export default TodoList;