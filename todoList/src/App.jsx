import { useEffect, useState } from 'react'
import { TodoInput, TodoDisplay } from './components'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { initializeTheList } from './features/todo/todoSlice'

function App() {
  const todoList=useSelector(state=>state.todoList)
  const dispatch=useDispatch()

  useEffect(()=>{
    const localToDoList=JSON.parse(localStorage.getItem("todoList"))
    if(localToDoList && localToDoList.length>0)
      dispatch(initializeTheList(localToDoList))
    else
      dispatch(initializeTheList([]))
  },[])

  useEffect(()=>{
    localStorage.setItem("todoList",JSON.stringify(todoList))
  },[todoList])

  return (
    <>
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
    </>
  )
}

export default App
