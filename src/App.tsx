import React from "react";
import { Layout, Typography } from "antd";
import { TaskForm } from "./components/TaskForm";
import { TaskFilter } from "./components/TaskFilter";
import { TaskList } from "./components/TaskList";
import { useTasks } from "./hooks/useTasks";

const { Header, Content, Footer } = Layout;
const { Title } = Typography;

function App() {
  const { tasks, addTask, toggleTask, filter, setFilter } = useTasks();
  return (
    <Layout style={{ height: "100vh" }}>
      <Header style={{ alignContent: "center" }}>
        <Title level={2} style={{ color: "white", margin: 0 }}>
          Task Manager
        </Title>
      </Header>
      <Content
        style={{
          padding: "20px",
          maxWidth: 600,
          margin: "auto",
          width: "100%",
        }}
      >
        <TaskForm onAddTask={addTask} />
        <TaskFilter filter={filter} onFilterChange={setFilter} />
        <TaskList tasks={tasks} onToggleTask={toggleTask} />
      </Content>
      <Footer
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <p>Author: Le Van Quang</p>
        <span>levanquang3112@gmail.com</span>
      </Footer>
    </Layout>
  );
}

export default App;
