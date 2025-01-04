import React, { useState } from "react";
import {Heading} from "../Components/Heading";
import {SubHeading} from "../Components/SubHeading";
import {InputBox} from "../Components/InputBox";
import {Button} from "../Components/Button";
import { BottomWarning } from "../Components/BottomWarning";
import { useNavigate } from "react-router-dom";
import axios from "axios";


const Signin = () => {
    const [username, setUsername] = useState(null)
    const [password, setPassword] = useState(null)

    const navigate = useNavigate();
    console.log(username,password);

    const handleLogin = async (e)=>{
        e.preventDefault();
      const response = await axios.post("http://localhost:3001/api/v1/user/signin",{
        username,
        password,
      })
      if(response.data.message === "User signed in successfully"){
        localStorage.setItem("token",response.data.token)
        navigate("/dashboard" , {state:{id:response.data.id}})
      }
      else if(response.data.message === "Error while signing in"){
        alert("Error while signing in")
      }
    }
  return (
    <div className="bg-slate-900 h-screen w-screen flex justify-center items-center">
      <div className="bg-white border-solid border-2 h-[500px] w-96 rounded-xl p-2 px-8 ">
          <Heading label={"Sign In"} />
          <SubHeading label={"Enter your credentials to access your account"} />
        <form className="mt-5">
          <InputBox placeholder="email@example.com" label={"Email"} type={"email"} onchange={(e)=>{setUsername(e.target.value)}} /> 
          <InputBox label={"Password"} type={"password"} onchange={(e)=>{setPassword(e.target.value)}} /> 
          <div className="flex flex-col mt-8">
            <button
              onClick={handleLogin}
              className="bg-black text-white p-2 rounded-md
          font-medium shadow-md mt-2"
            >
              Sign In
            </button>
          </div>
        </form>

      <BottomWarning label={"Don't have an account?"} to={"/signup"} buttonText={" Sign Up"} />
      </div>
    </div>
  );
};

export default Signin;
