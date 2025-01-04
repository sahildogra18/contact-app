import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Read from "./components/Read";
import Create from "./components/Create";
import Edit from "./components/Edit";
import NewDesign from "./components/NewDesign";
import Loader from "./components/Loader";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Read />} />
          <Route path="/create" element={<Create />} />
          <Route path="/edit" element={<Edit />} />
          <Route path="/new" element={<NewDesign />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
