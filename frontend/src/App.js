import './App.css';
import TodoBasic from './components/TodoBasic';
import { Route, Routes } from "react-router-dom";
import TodoSingle from './components/TodoSingle';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<TodoBasic />} />
        <Route path="/todo/:id" element={<TodoSingle />} />
        <Route path="*" element={<div>Page not found</div>} />
      </Routes>
    </div>
  );
}

export default App;
