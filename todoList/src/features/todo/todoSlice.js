import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState ={
  todoList: [{
    id: nanoid(),
    task: "No Task Assigned",
    completed: false,
    startTime: Date.now(),
    lastUpdated: Date.now(),
    completedTime: null
  }]
}

export const todoSlice=createSlice({
  name: "todo",
  initialState,
  reducers: {
    initializeTheList: (state,action)=>{
      state.todoList=action.payload
    },
    addToTheList: (state,action)=>{
      const task= {
        id: nanoid(),
        task: action.payload,
        completed: false,
        startTime: Date.now(),
        lastUpdated: Date.now(),
        completedTime: null
      }
      state.todoList.push(task)
    },
    updateATask: (state,action)=>{
      state.todoList=state.todoList.map((indTask)=>(indTask.id === action.payload.id ? {...indTask,task: action.payload.task,lastUpdated:action.payload.lastUpdated}:indTask))
    },
    deleteATask: (state,action)=>{
      state.todoList=state.todoList.filter((indTask)=> (indTask.id !== action.payload))
    },
    toggleStatusOfATask: (state,action)=>{
      state.todoList=state.todoList.map((indTask)=>(indTask.id === action.payload.id ? {...indTask,completed: !indTask.completed, completedTime: action.payload.completedTime} : indTask))
    }
  }
})

export const {initializeTheList,addToTheList,updateATask,deleteATask,toggleStatusOfATask}=todoSlice.actions;

export default todoSlice.reducer