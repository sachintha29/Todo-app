import React, {useState , useEffect} from 'react';
import './App.css';
import {Button, FormControl, Input, InputLabel} from '@material-ui/core';
import Todo from './Todo'; // Import a component from another file
import  db from './firebase';
import firebase from 'firebase'



function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput]  =  useState('');

  //when tha app loads, we needs to listen to the database and fetch new todos as thet get added/removed

  useEffect(() => {
    //this code  here.... fires when the app.js  loads
   db.collection('todos').orderBy('timestamp', 'desc').onSnapshot(snapshot =>{ 
      // console.log(snapshot.docs.map(doc => doc.data()));
        setTodos(snapshot.docs.map(doc => ({id: doc.id,todo: doc.data().todo})))
   })
  }, []);

  // console.log('😀', input);

  const addTodo = (event) =>{
    //this will fire off when we click the button
    event.preventDefault();  // will  stop the refresh

    db.collection('todos').add({
      todo: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    })
    // console.log('👽','Im working!!!')
    setTodos([...todos, input]);
    setInput(''); //clear up the input after Clicking add todo button.
    // console.log(todos)
  }

  return (
    <div className="App">
     <h1> To Do App -React Learning 🚀!!</h1>
     <form>
     {/* <input value={input} onChange={event => setInput(event.target.value)}/> */}
     <FormControl>
      <InputLabel htmlFor="my-input"> Write a Todo</InputLabel>
      <Input value={input} onChange={event => setInput(event.target.value)}  id="my-input" aria-describedby="my-helper-text" />
     </FormControl>
     <Button  disabled={!input} type="submit" onClick={addTodo}  variant="contained" color="primary">
          Add todo
     </Button>
     {/* <button  disabled={!input} type="submit" onClick={addTodo}>Add Todo</button> */}
     </form>
    
     <ul>
      {todos.map(todo =>(
        <Todo todo={todo}/>
        //<li>{todo}</li>
      ))}
      
     </ul>
    </div>
  );
}

export default App;
