import { useEffect, useState } from "react";
import { FiMoon, FiSun } from "react-icons/fi";
import{BiCopy} from "react-icons/bi";
import { FaCheck } from "react-icons/fa6";
import "./App.css";

function App() {
  const [password, setPassword] = useState("");
  const [numberAllow, setNumberAllow] = useState(false);
  const [charaterAllow, setCharacterAllow] = useState(false);
  const [length, setLength] = useState(0);
  const [darkMode, setDarkMode] = useState(false);
  const [copied, setCopied] = useState(false); 



  useEffect(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    let num = "1234567890";
    let char = "!@#$%^&*/{}[]?";

    if (numberAllow) {
      str += num;
    }
    if (charaterAllow) {
      str += char;
    }
    for (let i = 1; i <= length; i++) {
      let random = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(random);
    }
    setPassword(pass);
    
  }, [length, numberAllow, charaterAllow, setPassword]);

  
  const handleCheckboxChange = () => {
    setDarkMode(!darkMode);
  };

  const handleCopy=()=>{
    window.navigator.clipboard.writeText(password);
    
    if(length == 0){
      setCopied(false);
    }else{
 
      setCopied(true);


      setTimeout(() => {
        setCopied(false);
      }, 2000);
    }
     
   
  }
  return (
    <>
    <div className={darkMode?"darkmode":null}>
      <h1 className="text-center fw-bold box-shadow pt-4"> Password Generator</h1>
      <div className="container mt-5 border rounded p-3 box-shadow max-width">
      <div className="form-check form-switch">
        <input
          className="form-check-input box-shadow"
          type="checkbox"
          role="switch"
          id="flexSwitchCheckDefault"
          checked={darkMode}
          onChange={handleCheckboxChange}
        />
        <label className="form-check-label" htmlFor="flexSwitchCheckDefault">
        {darkMode ? <> Dark Mode <FiMoon size={20} /></> : <> Light Mode <FiSun size={20} /></>}

       
        </label>
      </div>
 <div className="p-3">
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control box-shadow"
            readOnly
            placeholder="Genrate Password"
            value={password}
          />
          <button className="btn btn-outline-secondary" type="button" onClick={handleCopy}>
              {copied ? <>Copied <FaCheck /> </>:<>Copy <BiCopy /></> }
          </button>
        </div>

        <label
          htmlFor="customRange2"
          className="form-label text-center d-block"
        >
          Length {length}
        </label>
        <input
          type="range"
          className="form-range"
          min={0}
          max={30}
          value={length}
          onChange={(e) => setLength(e.target.value)}
          id="customRange2"
        />
        <div className="form-check">
          <input
            className="form-check-input box-shadow "
            type="checkbox"
            value={numberAllow}
            onChange={() => setNumberAllow((prev) => !prev)}
            id="flexCheckDefault"
          />
          <label className="form-check-label" htmlFor="flexCheckDefault">
            Numbers
          </label>
        </div>
        <div className="form-check">
          <input
            className="form-check-input box-shadow"
            id="flexCheckChecked"
            type="checkbox"
            value={charaterAllow}
            onChange={() => setCharacterAllow((prev) => !prev)}
          />
          <label className="form-check-label" htmlFor="flexCheckChecked">
            Special Characters
          </label>
        </div>
      </div>
      </div>
      </div>
    </>
  );
}

export default App;
