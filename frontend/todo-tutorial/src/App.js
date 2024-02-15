import './App.css';
import  {AiOutlineEdit, AiOutlineDelete} from 'react-icons/ai'
import { useEffect, useState } from 'react';
import axios from "axios";


function App() {

  async function handleWidthNewButton(){
    setInputVisibility(!inputVisibility);
  }

  async function createTodo(){
    const res  = await axios.post("http://localhost:3333/todos", {
      name: inputValue,
    });
    getTodos();
    setInputVisibility(!inputVisibility);
    SetInputValue("");
  }

  async function deleteTodo(todo) {
    const res = await axios.delete(
      `http://localhost:3333/apagar/${todo.id}`
    );
    getTodos();
  }

  async function modifyStatusTodo(todo) {
    const response = await axios.put("http://localhost:3333/atualizar", {
      id: todo.id,
      status: !todo.status,
    });
    getTodos();
  }

  async function handleWithEditButtonClick(todo) {
    setSelectedTodo(todo);
    setInputVisibility(true);
  }

  async function editTodo() {
    const res = await axios.put("http://localhost:3333/atualizar", {
      id: selectedTodo.id,
      name: inputValue,
    });
    setSelectedTodo();
    setInputVisibility(false);
    getTodos();
    SetInputValue("");
  }


const Todos = ({ todos }) => {
   return (
     <div className='todos'>
        {todos.map((todo)=> {
          return (
            <div className='todo'>
               <button
                 onClick={() => modifyStatusTodo(todo)} 
                 className='checkbox'
                 style={{ backgroundColor: todo.status ? "#A879E6" : "white" }}>
               </button>
               <p>{todo.name}</p>
              <button>
              <AiOutlineEdit onClick={() => handleWithEditButtonClick(todo)} size={20} color={"#64697b"}></AiOutlineEdit>
              </button>
              <button onClick={()=> deleteTodo(todo)}>
                <AiOutlineDelete size={20} color={"#64697b"}></AiOutlineDelete>
              </button>
            </div>
          );
        })}
     </div>
   );
};

  async function getTodos() {
    const res = await axios.get("http://localhost:3333/ver");
    setTodos(res.data);
    console.log(res.data);
  }


  const [todos, setTodos] = useState([]);
  const [inputValue, SetInputValue] = useState("");
  const [inputVisibility, setInputVisibility] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState();

  useEffect(() => {
    getTodos();
  }, []);

  return (
    <div>
      <h1><marquee>Bem Vindo!!! Hello <span style={{color: 'red'}}>World!!!</span></marquee></h1>
      <hr/>
      <header className='container'>
         <div className='header'>
           <h1>Dont be lazzy</h1>
         </div>
         <Todos todos={todos}></Todos>
         <input value={inputValue}
         style={{display: inputVisibility ? "block" : "none"}} 
         onChange={(event) =>{
           SetInputValue(event.target.value);
         }}
         className='inputName'></input>
         <button onClick={
          inputVisibility ? selectedTodo ? editTodo 
          : createTodo : handleWidthNewButton}
          className='newTaskButton'>
          {inputVisibility ? "Confirm": "+ New Task"}
         </button>
      </header>
    </div>
  );
}

export default App;
