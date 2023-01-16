import React from 'react'
import { v4 as uuidv4 } from 'uuid';

const FormTodo = ({ addTodo }) => {
    const [value, setValue] = React.useState("");
     /*handleSubmit helps to add a new todo item to the current list of items */
    const handleSubmit = e => {
      e.preventDefault();
      if (!value) return;
          addTodo({
            text: value,
            id: uuidv4()
          }
        );
      setValue("");
    };
    return (
      <form onSubmit={handleSubmit}> 
        <input type="text" className="input" value={value} onChange={e => setValue(e.target.value)} placeholder="Type todo" />
      </form>
    );
  }
  
  export default FormTodo