import { createContext, useContext } from "react";

export const TodoContext=createContext({
  todoList: [{
    id: Date.now(),
    task: "No Task Assigned",
    completed: false,
    startTime: Date.now(),
    lastUpdated: Date.now(),
    completedTime: null
  }],
  addToTheList: (newTask)=>{},
  updateATask: (id,task)=>{},
  deleteATask: (id)=>{},
  toggleStatusOfATask: (id,timeCompleted)=>{}
})

export const TodoProvider=TodoContext.Provider

export const useTodo=()=>{
  return useContext(TodoContext)
}