import React, { useState } from 'react';
import './App.css';

function App() {
  const [toDos, setToDos] = useState([]);
  const [toDo, setToDo] = useState("");
  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState("");

  const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const currentDay = daysOfWeek[new Date().getDay()];

  const addToDo = () => {
    if (toDo.trim()) {
      setToDos([...toDos, { id: Date.now(), text: toDo, status: false }]);
      setToDo("");
    }
  };

  const deleteToDo = (id) => {
    setToDos(toDos.filter(todo => todo.id !== id));
  };

  const toggleStatus = (id) => {
    setToDos(toDos.map(todo => {
      if (todo.id === id) {
        return { ...todo, status: !todo.status };
      }
      return todo;
    }));
  };

  const startEdit = (id, text) => {
    setEditId(id);
    setEditText(text);
  };

  const saveEdit = () => {
    if (editText.trim()) {
      setToDos(toDos.map(todo => {
        if (todo.id === editId) {
          return { ...todo, text: editText };
        }
        return todo;
      }));
      setEditId(null);
      setEditText("");
    }
  };

  return (
    <div className="app">
      <div className="mainHeading">
        <h1>ToDo List</h1>
      </div>
      <div className="subHeading">
        <br />
        <h2>Whoop, it's {currentDay} 🌝 ☕ </h2>
      </div>
      <div className="input">
        <input
          value={toDo}
          onChange={(e) => setToDo(e.target.value)}
          type="text"
          placeholder="🖊️ Add item..."
        />
        <i onClick={addToDo} className="fas fa-plus"></i>
      </div>
      <div className="todos">
        {toDos.map((obj) => (
          <div className="todo" key={obj.id}>
            <div className="left">
              <input
                onChange={() => toggleStatus(obj.id)}
                checked={obj.status}
                type="checkbox"
              />
              {editId === obj.id ? (
                <input
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  type="text"
                />
              ) : (
                <p>{obj.text}</p>
              )}
            </div>
            <div className="right">
              {editId === obj.id ? (
                <i onClick={saveEdit} className="fas fa-save"></i>
              ) : (
                <i onClick={() => startEdit(obj.id, obj.text)} className="fas fa-edit"></i>
              )}
              <i onClick={() => deleteToDo(obj.id)} className="fas fa-times"></i>
            </div>
          </div>
        ))}
        {toDos
          .filter(obj => obj.status)
          .map(obj => (
            <h1 key={obj.id}>{obj.text}</h1>
          ))}
      </div>
    </div>
  );
}

export default App;
