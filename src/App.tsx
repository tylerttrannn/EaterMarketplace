import { useNavigate } from "react-router-dom";

import { FlipWords } from "./components/ui/flip-words";



const words = ["clothing", "furniture", "electronic", "free"];


function App() {
  const navigate = useNavigate();

  return (
    <div>
      {/* header part  */}
      <div>
        <button onClick = {() => navigate('/login')}> Login</button>

      </div>

      <div className="flex-col h-[50rem] justify-center items-center px-4">
        <div className="text-7xl text-center font-normal text-neutral-600 dark:text-neutral-400">
          List your 
          <FlipWords className = "px-4" words={words} /> <br />
          items with ZotMarketplace
        </div>
        
        {/* mini text section */}
        <div className = "text-2xl text-neutral-500 dark:text-neutral-400 justify-center text-center">
          <h1> Lorem ipsum dolor sit amet consectetur adipisicing elit. </h1>
        </div>
      </div>

    </div>

  );
}

export default App;
