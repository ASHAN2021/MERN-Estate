/* eslint-disable react/no-unescaped-entities */
import { useState } from "react";
import { Link ,useNavigate} from "react-router-dom";


export default function SignIn() {
  const [fromData,setfromData] = useState({});
  const [Error,setError] = useState(null);
  const [loading,setloading] =useState(false);
  const Navigate = useNavigate();
  const handlechange = (e)=>{
      setfromData({
        ...fromData,
        [e.target.id] : e.target.value
      });
  };
  const handlesubmit = async (e)=>{
        e.preventDefault();
        try {
          setloading(true);
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
          setError(data.message);
          setloading(false);
          return;
        }
        setloading(false);
        setError(null);
        Navigate('/');
        } catch (error) {
          setloading(false);
          setError(error.message);
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
      {Error && <p className="text-red-500 mt-5">{Error}</p>}
    </div>
  )
}
