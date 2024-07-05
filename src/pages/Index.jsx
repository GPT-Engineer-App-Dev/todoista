import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { format } from "date-fns";

const Index = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    dueDate: "",
    priority: "Low",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTask({ ...newTask, [name]: value });
  };

  const addTask = () => {
    setTasks([...tasks, { ...newTask, id: Date.now() }]);
    setNewTask({ title: "", description: "", dueDate: "", priority: "Low" });
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl mb-4">Todo Application</h1>
      <div className="mb-4">
        <Input
          name="title"
          placeholder="Task Title"
          value={newTask.title}
          onChange={handleInputChange}
          className="mb-2"
        />
        <Textarea
          name="description"
          placeholder="Task Description"
          value={newTask.description}
          onChange={handleInputChange}
          className="mb-2"
        />
        <Input
          name="dueDate"
          type="date"
          value={newTask.dueDate}
          onChange={handleInputChange}
          className="mb-2"
        />
        <select
          name="priority"
          value={newTask.priority}
          onChange={handleInputChange}
          className="mb-2"
        >
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
        <Button onClick={addTask}>Add Task</Button>
      </div>
      <div>
        {tasks.map((task) => (
          <Card key={task.id} className="mb-2">
            <CardHeader>
              <CardTitle>{task.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{task.description}</p>
              <p>Due: {format(new Date(task.dueDate), "PPP")}</p>
              <p>Priority: {task.priority}</p>
              <Button variant="destructive" onClick={() => deleteTask(task.id)}>
                Delete
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Index;