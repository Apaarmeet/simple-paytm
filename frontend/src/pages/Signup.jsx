  import React, { useState } from "react";
  import {Heading} from "../Components/Heading";
  import {SubHeading} from "../Components/SubHeading";
  import {InputBox} from "../Components/InputBox";
  import { BottomWarning } from "../Components/BottomWarning";
  import axios from "axios";
  const Signup = () => {
      const [firstName,setFirstName] = useState("")
      const [lastName,setLastName] = useState("")
      const [username,setUsername] = useState("")
      const [password,setPassword] = useState("")
      
        const handleLogin = async (e)=>{
          e.preventDefault();
        const response = await axios.post("http://localhost:3001/api/v1/user/signup",{
          username,
          password,
          firstName,
          lastName, 
        })
        if(response.data.message === "User created successfully"){
          localStorage.setItem("token",response.data.token)
          alert("User created successfully Please Click on Login below to continue")
        }
        else if(response.data.message === "Email already exists"){
          alert("Email already exists")
        }
        else{
          alert("Invalid inputs")
        }
        
      }
      
    return (
      <div className="bg-slate-900 h-screen w-screen flex justify-center items-center">
        <div className="bg-white border-solid border-2 h-[630px] w-96 rounded-xl p-2 px-8 ">
            <Heading label={"Sign Up"} />
            <SubHeading label={"Enter your information to create an account"} />
          <form className="mt-5" onSubmit={handleLogin}>  
            <InputBox onchange={ (e)=>{ 
              setFirstName(e.target.value);
            }} placeholder={"John"} label={"First Name"} type={"text"} />
            <InputBox onchange={ (e)=>{
              setLastName(e.target.value);
            }} placeholder="Doe" label={"Last Name"} type={"text"} />
            <InputBox onchange={ (e)=>{
              setUsername(e.target.value);
            }} placeholder="email@example.com" label={"Email"} type={"email"} /> 
            <InputBox onchange={ (e)=>{
              setPassword(e.target.value);
            }} label={"Password"} type={"password"} /> 
            <div className="flex flex-col mt-8">
            <button
              type = "submit"
              className="bg-black text-white p-2 rounded-md
          font-medium shadow-md mt-2"
            >
              Sign Up
            </button>
          </div>
          </form>

        <BottomWarning label={"Already have an account?"} to={"/signin"} buttonText={"Login"} />
        </div>
      </div>
    );
  };

  export default Signup;