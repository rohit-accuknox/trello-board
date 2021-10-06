import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [taskList, setTaskList] = useState([
    { name: "Hire a Good Designer", category: "ideas", bgcolor: "white" },
    {
      name: "Try to make it interactive",
      category: "ideas",
      bgcolor: "white",
    },
    { name: "Hire UI Developer", category: "proposed", bgcolor: "orange" },
    { name: "Create website", category: "assigned", bgcolor: "lightgreen" },
  ]);

  const [newIdeas, setNewIdeas] = useState("");
  const [newProposed, setNewProposed] = useState("");
  const [newAssigned, setNewAssigned] = useState("");
  const [state, setState] = useState(false);

  const [ideas, setIdeas] = useState([]);
  const [proposed, setProposed] = useState([]);
  const [assigned, setAssigned] = useState([]);

  const onDragStart = (e, id, color) => {
    // console.log("dragstart", id);
    // console.log("dragstart", color);
    e.dataTransfer.setData("id", id);
    e.dataTransfer.setData("color", color);
  };

  const onDragOver = (e) => {
    e.preventDefault();
  };

  const onDrop = (e, cat, bg) => {
    let id = e.dataTransfer.getData("id");
    let color = e.dataTransfer.getData("color");
    let tasks = taskList.filter((task) => {
      if (task.name === id && task.bgcolor === color) {
        task.category = cat;
        task.bgcolor = bg;
      }
      return task;
    });

    setTaskList(tasks);
    // console.log(taskList)
    setState(!state);
  };

  const handleIdeas = (e) => {
    e.preventDefault();
    taskList.push({ name: newIdeas, category: "ideas", bgcolor: "white" });
    setState(!state);
    setNewIdeas("");
  };

  const handleProposed = (e) => {
    e.preventDefault();
    taskList.push({
      name: newProposed,
      category: "proposed",
      bgcolor: "orange",
    });
    setState(!state);
    setNewProposed("");
  };

  const handleAssigned = (e) => {
    e.preventDefault();
    taskList.push({
      name: newAssigned,
      category: "assigned",
      bgcolor: "lightgreen",
    });
    setState(!state);
    setNewAssigned("");
  };

  useEffect(() => {
    const filteredIdeas = taskList.filter((t) => t.category === "ideas");
    setIdeas(filteredIdeas);
    const filteredProposed = taskList.filter((t) => t.category === "proposed");
    setProposed(filteredProposed);
    const filteredAssigned = taskList.filter((t) => t.category === "assigned");
    setAssigned(filteredAssigned);
  }, [state, taskList]);

  return (
    <div className="App">
      <h1 className="header">Trello board</h1>
      <main className="content">
        <div className="row">
          <div
            className="droppable"
            onDragOver={(e) => onDragOver(e)}
            onDrop={(e) => {
              onDrop(e, "ideas", "white");
            }}
          >
            <div className="task-header">Ideas</div>
            {ideas.map((i, id) => {
              return (
                <div
                  key={id}
                  onDragStart={(e) => onDragStart(e, i.name, i.bgcolor)}
                  draggable
                  className="draggable"
                  style={{ backgroundColor: i.bgcolor }}
                >
                  {i.name}
                  <img src="https://picsum.photos/100 " alt="img" />
                </div>
              );
            })}
          </div>
          <form onSubmit={handleIdeas}>
            <input
              value={newIdeas}
              placeholder="Add a Card"
              onChange={(e) => setNewIdeas(e.target.value)}
            />
          </form>
        </div>
        <div className="row">
          <div
            className="droppable"
            onDragOver={(e) => onDragOver(e)}
            onDrop={(e) => onDrop(e, "proposed", "orange")}
          >
            <div className="task-header">Tasks Proposed</div>
            {proposed.map((p, id) => {
              return (
                <div
                  key={id}
                  onDragStart={(e) => onDragStart(e, p.name, p.bgcolor)}
                  draggable
                  className="draggable"
                  style={{ backgroundColor: p.bgcolor }}
                >
                  {p.name}
                  <img src="https://picsum.photos/200 " alt="img" />
                </div>
              );
            })}
          </div>
          <form onSubmit={handleProposed}>
            <input
              value={newProposed}
              placeholder="Add a Card"
              onChange={(e) => setNewProposed(e.target.value)}
            />
          </form>
        </div>
        <div className="row">
          <div
            className="droppable"
            onDragOver={(e) => onDragOver(e)}
            onDrop={(e) => onDrop(e, "assigned", "lightgreen")}
          >
            <div className="task-header">Tasks Assigned</div>
            {assigned.map((a, id) => {
              return (
                <div
                  key={id}
                  onDragStart={(e) => onDragStart(e, a.name, a.bgcolor)}
                  draggable
                  className="draggable"
                  style={{ backgroundColor: a.bgcolor }}
                >
                  {a.name}
                  <img src="https://picsum.photos/300 " alt="img" />
                </div>
              );
            })}
          </div>
          <form onSubmit={handleAssigned}>
            <input
              value={newAssigned}
              placeholder="Add a Card"
              onChange={(e) => setNewAssigned(e.target.value)}
            />
          </form>
        </div>
      </main>
    </div>
  );
}

export default App;
