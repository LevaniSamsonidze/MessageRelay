import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import Login from "./components/Login/Login";
import { useEffect } from "react";
import SignUp from "./components/SignUp/SignUp";
import MainPage from "./components/MainPage/mainPage";
import AdminPage from "./components/AdminPage/AdminPage";


function App() {
  const fristNavitation = useNavigate();
  useEffect(() =>{
    const fristCont = async () =>{
      const token = localStorage.getItem("tokenUser");
      if(!token){
        fristNavitation('/login')
      }else{
        const response = await fetch("http://localhost:3000/tokencheck", {
          headers: {autc: "Bearer " + localStorage.getItem("tokenUser")}
        })
        const data = await response.json();
        if(data.errorMessage !== "token not valid"){
          fristNavitation('/mainpage')
        }else{
          fristNavitation('/login')
        }
      }
    }
    fristCont()
  },[])

  return(
    <>
      <Routes>
        <Route path="/login" element={<Login />}/>
        <Route path="/signup" element={<SignUp />}/>
        <Route path="/mainpage" element={<MainPage />}/>
        <Route path="/adminpage" element={<AdminPage />}/>
      </Routes>
    </>
  )
}

export default App
