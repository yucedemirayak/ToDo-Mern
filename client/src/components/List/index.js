import React from "react";
import { Button, Form, ListGroup } from "react-bootstrap";

const List = ({ todoList , getTodoList }) => {

  const completeTodo = async (taskId) => {
    await fetch("http://localhost:8000/completeTodo?id=" + taskId, {
      method: "PATCH",      
    }).then(res => {
      console.log(res);
      getTodoList();
    }).catch(err => {
      console.log(err);
    });
  }

  const deleteTodo = async (taskId) => {
    await fetch("http://localhost:8000/deleteTodoById?id=" + taskId, {
      method: "DELETE",      
    }).then(res => {
      console.log(res);
      getTodoList();
    }).catch(err => {
      console.log(err);
    });
  }

  return (
    <ListGroup>
      {todoList?.map((todo) => {
        return (
          <ListGroup.Item key={todo._id} active={todo.isCompleted} className="d-flex">
            <Form.Check className="me-3" type="checkbox" defaultChecked={todo.isCompleted} onChange={() => {completeTodo(todo._id)}}/>
            {todo.title}
            <Button className="ms-auto" variant="danger" size="sm" onClick={() => {deleteTodo(todo._id)}}>
              Delete
            </Button>
          </ListGroup.Item>
        );
      })}
    </ListGroup>
  );
};

export default List;
