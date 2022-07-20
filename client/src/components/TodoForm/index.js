import React from "react";
import { Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";

const TodoForm = ({placeholder , getTodoList}) => {
  const addTodoItem = () => {
    const todoInput = document.querySelector("#textInput");

    fetch("http://localhost:8000/newTodo", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: todoInput.value
      })
    }).then(res => {
      console.log(res);
      todoInput.value = "";
      getTodoList();
    }).catch(err => {
      console.log(err);
    });

  };

  return (
    <Form.Group className="mb-3 d-flex">
      <Form.Control id="textInput" type="text" placeholder={placeholder} />
      <Button variant="primary" size="lg" onClick={() => {addTodoItem()}}>+</Button>
    </Form.Group>
  );
};

export default TodoForm;
