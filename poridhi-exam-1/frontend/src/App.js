import {BrowserRouter, Routes, Route} from "react-router-dom"
import Books from "./pages/Books"
import Add from "./pages/Add"
import Update from "./pages/Update"


function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Books/>}/>
        <Route path="/Add" element={<Add/>}/>
        <Route path="/Update" element={<Update/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
