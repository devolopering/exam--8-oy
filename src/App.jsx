import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./Components/Header";
import Coins from "./pages/Coins";
import SingleCoin from "./pages/SingleCoins"; 

function App() {
  return (
    <div className="bg-[#14161A]">
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Coins />} />
          <Route path="/coins/:id" element={<div className="max-w-[1140px] mx-auto"><SingleCoin /></div>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
