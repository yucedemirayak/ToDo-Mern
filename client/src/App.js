import "./App.css";
import React, { useEffect, useState } from "react";
import List from "./components/List";
import MainContainer from "./Containers/Main";
import TodoForm from "./components/TodoForm";
import { Container } from "react-bootstrap";

function App() {
  const [todoList, setTodoList] = useState([]);

  const getTodoList = async () => {
    await fetch("http://localhost:8000/getAllTodos").then(res => {
      return res.json()
    }).then((data) => {
      setTodoList(data)
    }).catch((err) => {
      console.error(err);
    })
  };

  useEffect(() => {
    getTodoList();
  }, []);

  return (
    <Container className="mt-5">
      <h3 className="text-center">Todo List</h3>
      <hr />
      <MainContainer>
        <TodoForm placeholder="Please enter a task" getTodoList={getTodoList} />
      </MainContainer>
      <MainContainer>
        <List todoList={todoList} getTodoList={getTodoList} />
      </MainContainer>
    </Container>
  );
}

export default App;
