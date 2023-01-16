import React, { useEffect } from "react";
import "./App.css";
import Todo from "./Todo";
import FormTodo from "./FormToDo";
import { useState } from "react";
import axios from "axios";
function App() {
  const [todos, setTodos] = useState([]);
  const [toshowCount,setToShowCount] = useState(0);
  const [isRefreshNeeded,setIsRefreshNeeded] = useState("");

  /*addToDo is used to add a new todoitem*/
  const addTodo = text => {
    document.getElementsByClassName("loader-container-parent")[0].style.display = "block";
    axios.post('http://localhost:3000/tasks', {
      taskName: text,
      completed: false
    })
    .then(function (response) {
      console.log("Task Added Successfully");
      document.getElementsByClassName("loader-container-parent")[0].style.display = "none";
      setIsRefreshNeeded(text)
    })
    .catch(function (error) {
      console.log(error);
    });
  };

  /*markToDo is used to mark a todoitem as active*/
  const markTodo = (task,index) => {
    axios.put(`http://localhost:3000/tasks/${index}`, {
      taskName: task,
      completed: true
    })
    .then(function (response) {
      console.log("Task Updated Successfully");
      setIsRefreshNeeded(index)
    })
    .catch(function (error) {
      console.log(error);
    });
  };


  

  /*removeToDo is used to remove a todoitem*/
  const removeTodo = index => {
    axios.delete(`http://localhost:3000/tasks/${index}`)
    .then(function (response) {
      console.log("Task Removed Successfully");
      setIsRefreshNeeded(index)
    })
    .catch(function (error) {
      console.log(error);
    });
  };

  /*showActiveResults function is used to display the list of all active todoitem*/
  const showActiveResults = () =>{
    showAllResults();
    var counter =0;
    var actEle = document.getElementsByClassName('isList');
    for(var i=0; i< actEle.length; i++){
      if(actEle[i].className.indexOf("active") >=0){
        actEle[i].classList.add("show")
        counter++;
      }
      else{
        if(!(actEle[i].className.indexOf("hide") >=0)){
          actEle[i].classList.add("hide")
        }
      }
    }
    setToShowCount(counter);
    if(!(document.getElementsByClassName("listCount")[0].className.indexOf("hide") >=0 )){
      document.getElementsByClassName("listCount")[0].classList.add("hide")
    }
    document.getElementsByClassName("subListCount")[0].classList.remove("hide")

  }

  /*showCompletedResults function is used to display the list of all completed todoitem*/
  const showCompletedResults = () => {  
    showAllResults();
    let checkParent = document.getElementsByClassName('checkTask')
    var counter =0;
    for(var i =0; i < checkParent.length; i ++){
      if(checkParent[i].checked === false){
        if(!(checkParent[i].parentElement.className.indexOf('hide') >=0)){
          checkParent[i].parentElement.classList.add('hide')
        }
      }
      else{
        counter++;
      }
    }
    setToShowCount(counter);
    if(!(document.getElementsByClassName("listCount")[0].className.indexOf("hide") >=0)){
      document.getElementsByClassName("listCount")[0].classList.add("hide")
    }
    document.getElementsByClassName("subListCount")[0].classList.remove("hide")
  }

  /*showAllResults function is used to display the list of all todoitem*/
  const showAllResults = () => {
    document.getElementsByClassName("listCount")[0].classList.remove("hide")
    document.getElementsByClassName("subListCount")[0].classList.add("hide")
    var actEle = document.getElementsByClassName('isList');
    for(var i=0; i< actEle.length; i++){
      actEle[i].classList.remove("hide")
    }
  }

  useEffect(()=>{
    axios.get('http://localhost:3000/tasks').then(function (response) {
      console.log(response.data.data)
      setTodos(response.data.data)
    })
    .catch(function (error) {
      console.log(error);
    });
  },[isRefreshNeeded])

  useEffect(()=>{
    axios.get('http://localhost:3000/tasks').then(function (response) {
      console.log(response.data.data)
      setTodos(response.data.data)
    })
    .catch(function (error) {
      console.log(error);
    });
  },[])

  return (
    <div className="app">
      <div className="loader-container-parent" style={{display:"none"}}>
      <div className="loader-container">
        <div className="spinner"></div>
      </div>
      </div>
      <div className="container">
        <h1>Todo List - Using React & Node JS</h1>
        <FormTodo addTodo={addTodo} />
        <div className="listsParent">
          {todos.map((todo, index) => (
            <div>
                <Todo
                  key={index}
                  index={index}
                  todo={todo}
                  markTodo={markTodo}
                  removeTodo={removeTodo}
                />
            </div>
          ))}
        </div>
        <p className="listCount">Total {todos.length} items</p>
        <p className="subListCount hide">Total {toshowCount} items</p>
        {todos.length > 0 && 
          <>
          <p>Filter Options :</p>
          <button className="filterButtons activeButton" onClick={showActiveResults}>Active</button>
          <button className="filterButtons completedButton" onClick={showCompletedResults}>Completed</button>
          <button className="filterButtons allButton" onClick={showAllResults}>All</button>
          <ul>
            <li>Active Button shows the list of tasks that are marked as active</li>
            <li>Completed Button shows the list of tasks for which the checkbox is checked</li>
            <li>All Button shows the list of all tasks</li>
          </ul>
          
          </>
        }
      </div>
    </div>
  );
}

export default App;