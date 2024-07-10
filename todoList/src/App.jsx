import { useEffect, useState } from 'react'
import { TodoProvider } from './contexts'
import { TodoDisplay, TodoInput } from './components'

function App() {
  const [todoList,setTodoList]=useState([])

  const addToTheList=(newTask)=>{

    setTodoList((prev)=>[{
      id: Date.now(),
      completed: false,
      startTime: Date.now(),
      lastUpdated: Date.now(),
      completedTime: null,
      ...newTask
    },...prev])
  }

  const updateATask=(id,task)=>{
    setTodoList((prev)=>prev.map((indTask)=>(indTask.id === id ? task:indTask)))
  }

  const deleteATask=(id)=>{
    setTodoList((prev)=>prev.filter((indTask)=> (indTask.id !== id)))
  }

  const toggleStatusOfATask=(id,completedTime)=>{
    console.log(completedTime)
    setTodoList((prev)=>prev.map((indTask)=>(indTask.id === id ? {...indTask,completed: !indTask.completed, completedTime: completedTime} : indTask)))
  }

  useEffect(()=>{
    const todoList=JSON.parse(localStorage.getItem("todoList"))
    if(todoList && todoList.length > 0)
      setTodoList(todoList);
  },[])

  useEffect(()=>{
    localStorage.setItem("todoList",JSON.stringify(todoList))
  },[todoList])

  return (
    <TodoProvider value={{todoList,addToTheList,updateATask,deleteATask,toggleStatusOfATask}}>
      <div
        className='flex flex-col w-full h-lvh justify-start items-center'
      >
        <div
          className='w-9/12 flex flex-col justify-center items-center p-4 bg-violet-950 sticky top-0'
        >
          <h1 className='text-5xl my-2 py-2 font-mono font-bold text-white'>ToDo List Manager</h1>
          <TodoInput/>
        </div>
        <div className='w-9/12 justify-center items-center'>
          {todoList.map((indTask)=>(
            <div key={indTask.id}>
              <TodoDisplay 
                task={indTask}
              />
            </div>
          ))}
        </div>
      </div>
    </TodoProvider>
  )
}

export default App
