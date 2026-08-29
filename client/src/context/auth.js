import axios from "axios";
import { useState,useContext,createContext, useEffect } from "react";

const AuthContext = createContext();



const AuthProvider = ({children}) =>{
    const [auth,setAuth] = useState({
        user:null,
        token:"",
    });

    //default axios
    axios.defaults.headers.common["Authorization"] = auth?.token
    useEffect(()=>{
        const data =localStorage.getItem("auth")
        if(data){
            const parseData = JSON.parse(data);
            setAuth({
                ...auth,
                user:parseData.user,
                token:parseData.token,
            })
            axios.defaults.headers.common["Authorization"] = parseData.token;
        }
         //eslint-disable-next-line
    },[]);

    useEffect(() => {
        if (auth?.token) {
            axios.defaults.headers.common["Authorization"] = auth.token;
        }
    }, [auth?.token]);
    return(
        <AuthContext.Provider value={[auth,setAuth]}>
            {children}
        </AuthContext.Provider>
    )
};

//custom hook
const useAuth =() => useContext(AuthContext);
export{useAuth,AuthProvider};