import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./Components/Header";
import Coins from "./pages/Coins";
import SingleCoin from "./pages/SingleCoins"; 

function App() {
  return (
    <div className="bg-[#14161A] max-w-[1920px] mx-auto">
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Coins />} />
          <Route path="/coins/:id" element={<div><SingleCoin /></div>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
