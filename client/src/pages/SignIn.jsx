/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
import { useState } from "react";
import { Link ,useNavigate} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signInStart,signInSuccess,signInFailure } from "../redux/user/UserSlice.js";

export default function SignIn() {
  const [fromData,setfromData] = useState({});
  const {loading,error} = useSelector((state)=>state.user);
  const Navigate = useNavigate();
  const dispatch = useDispatch();
  const handlechange = (e)=>{
      setfromData({
        ...fromData,
        [e.target.id] : e.target.value
      });
  };
  const handlesubmit = async (e)=>{
        e.preventDefault();
        try {  
          dispatch(signInStart());
        const res = await fetch('/api/auth/signin',
          {
            method:'POST',
            headers:{
              'Content-Type':'application/json'
            },
            body:JSON.stringify(fromData),
          }
        );
        const data = await res.json();
        if(data.sucess === false){
          dispatch(signInFailure(data.message))
          return;
        }
        dispatch(signInSuccess(data))
        Navigate('/');
        } catch (error) {
          dispatch(signInFailure(error.message))
        }
        
  }

  
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">
        Sign In
      </h1>
      <form onSubmit={handlesubmit} className="flex flex-col gap-4">
        
        <input type="email" placeholder="email" className="border p-3 rounded-lg " id="email"   onChange={handlechange}/>
        <input type="password" placeholder="password" className="border p-3 rounded-lg " id="password"  onChange={handlechange}/>
        <button disabled={loading} className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80">
          {loading ? 'Loading...':'Sign In'}
        </button>
      </form>
      <div className="flex gap-2 mt-5">
        <p>Don't Have an Account ?</p>
        <Link to='/SignUp'>
          <span className="text-blue-700">Sign up</span>
        </Link>
      </div>
      {error && <p className="text-red-500 mt-5">{error}</p>}
    </div>
  )
}
