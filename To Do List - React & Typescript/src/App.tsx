import React from "react";
import "./App.css";
import Todo from "./Todo";
import FormTodo from "./FormToDo";
import { useState } from "react";

function App() {

  const [todos, setTodos] = useState<{isDone: boolean; text: string ; id : string}[]>([]);
  const [toshowCount,setToShowCount] = useState(0);

  /*addToDo is used to add a new todoitem*/
  const addTodo = (text : any) => {
    const newTodos = [...todos, text ];
    setTodos(newTodos as never);
  };

  /*markToDo is used to mark a todoitem as active*/
  const markTodo = (index : number) => {
    const newTodos : any = [...todos];
    newTodos[index].isDone = true;
    setTodos(newTodos);
  };

  /*removeToDo is used to remove a todoitem*/
  const removeTodo = (index: number) => {
    const newTodos: any = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
    showAllResults();
  };

  /*showActiveResults function is used to display the list of all active todoitem*/
  const showActiveResults = () =>{
    showAllResults();
    var counter : number = 0;
    var actEle = document.getElementsByClassName('isList') as HTMLCollectionOf<HTMLElement>;
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
    let checkParent = document.getElementsByClassName('checkTask') as HTMLCollectionOf<HTMLElement>
    var counter =0
    for(var i =0; i < checkParent.length; i++){
      if((((checkParent[i] as HTMLInputElement)).checked) === false){
          checkParent[i]?.parentElement?.classList.add('hide')
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


  return (
    <div className="app">
      <div className="container">
        <h1>Todo List - Using React & Type Script </h1>
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