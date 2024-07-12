import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { deleteATask, toggleStatusOfATask, updateATask } from '../features/todo/todoSlice'


function TodoDisplay({task}) {

  const [taskTask,setTaskTask]=useState(task.task)
  const [isTaskEditable,setIsTaskEditable]=useState(false)

  const dispatch=useDispatch()
  const taskRef=useRef()

  const toggleStatus=()=>{
    if(!task.completed) dispatch(toggleStatusOfATask({id:task.id,completedTime:Date.now()}))
    else dispatch(toggleStatusOfATask({id:task.id,completedTime:null}))
  }
  const handleEditBtn=()=>{
    if(isTaskEditable){
      dispatch(updateATask({id:task.id,task:taskTask,lastUpdated:Date.now()}))
    }
    setIsTaskEditable((prev)=>!prev)
  }

  const formatDate=(timeElapsed,label)=>{
    const optionsdate={
      day: '2-digit',
      month: '2-digit',
      year: '2-digit'
    }
    const optionstime={
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    }
    const timeRequired=new Date(timeElapsed)

    const dateFound = new Intl.DateTimeFormat('en', optionsdate).format(timeRequired);
    const timeFound = new Intl.DateTimeFormat('en', optionstime).format(timeRequired);
    return (
      <div className="w-1/4 flex justify-evenly items-center py-1">
        <p className="text-sm text-gray-600">{label}</p>
        <h1 className="text-md font-semibold">{dateFound}
          <span className="text-md border-l-2 border-black ml-1 pl-1">{timeFound}</span>
        </h1>
      </div>      
    )
  }

  const copyTask=useCallback(()=>{
    taskRef.current?.select();
    window.navigator.clipboard.writeText(taskTask)
  },[task])

  return (
    <div className={`w-full flex justify-evenly items-center my-3 border rounded-md p-3 ${task.completed ? "bg-green-400":"bg-red-400"}`}>
      <div
        className='w-11/12 flex flex-col justify-evenly items-center border-r-2 pr-1'
      >
        <div className='w-full flex justify-evenly items-center'>
          <input 
            className={`w-5 h-5 flex  accent-green-800`}
            type='checkbox'
            checked={task.completed}
            onChange={toggleStatus}
            disabled={isTaskEditable}
          />
          <input
            className={`flex w-10/12 rounded-md border ${isTaskEditable? "border-black/30":"border-none"} ${task.completed?"line-through":""} bg-transparent px-2 py-3 text-lg placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50`}
            type='text'
            value={taskTask}
            readOnly={!isTaskEditable}
            id={task.id}
            onChange={(e)=>setTaskTask(e.target.value)}
            ref={taskRef}
          />
          <button
            className="rounded-full bg-gray-500 px-3 py-3 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
            onClick={copyTask}
          >
            📋
          </button>
        </div>
        <div
          className='w-full flex flex-wrap justify-around py-1 px-1'
        >        
          {formatDate(task.startTime, "Created")}
          {formatDate(task.lastUpdated, "Mod.")}
          {task.completedTime ? formatDate(task.completedTime, "Done") : <div className="flex justify-evenly w-1/4 py-1">
                                                                  <h1 className="mb-[0px] text-md font-semibold">Ongoing</h1>
                                                                </div>}
        </div>
      </div>
      <div
        className='w-1/12 flex flex-col justify-evenly items-center gap-2'
      >
        <button
          className="rounded-full bg-black px-3 py-3 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
          onClick={handleEditBtn}
          disabled={task.completed}
        >
          {isTaskEditable ? "💾" : "📝"}
        </button>
        <button
          className="rounded-full bg-black px-3 py-3 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
          onClick={(e)=>dispatch(deleteATask(task.id))}
        >
          🗑️
        </button>
      </div>
    </div>
  )
}

export default TodoDisplay