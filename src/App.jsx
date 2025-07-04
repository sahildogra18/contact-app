import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Read from "./components/Read";
import Create from "./components/Create";
import Edit from "./components/Edit";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Read />} />
        <Route path="/read" element={<Read />} /> {/* Optional */}
        <Route path="/create" element={<Create />} />
        <Route path="/edit" element={<Edit />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
