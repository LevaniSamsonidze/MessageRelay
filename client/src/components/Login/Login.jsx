import { Await, Link, useNavigate } from "react-router-dom";
import styles from "./styles.module.css"
import { useState } from "react";
import { useEffect } from "react";
import { toast } from "react-toastify";

const Login = () =>{
    const [password, setPassword] = useState('');
    const [gmail, setGmail] = useState('');
    const [res, setRes] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const onSubmitHandler = async (e) =>{
        e.preventDefault();
        setLoading(true)
        const response = await fetch("http://localhost:3000/login", {
            method: "POST",
            headers: {"content-type": "application/json"},
            body: JSON.stringify({ gmail, password })
        });

        const data = await response.json();
        setLoading(false);
        if(!response.ok){
            setRes(data);
            return;
        }else{
            const verifyCode = prompt("enter code");
            const verifyResponse = await fetch("http://localhost:3000/login/verify", {
                method: "POST",
                headers: {"content-type": "application/json"},
                body: JSON.stringify({ code: verifyCode })
            });

            const codeData = await verifyResponse.json();

            setLoading(false)

            if(codeData.ok){
                localStorage.setItem("tokenUser", data.tokenUser)
                navigate('/mainpage');
                return;
            }else{
                toast.error(codeData.message);
                return;
            }
        }
    }
    const ResetPasswordHendler = async () =>{
        if(gmail === ''){
            toast.warn("Fill Input")
            return;
        }
        toast.warning("please wait")
        const response = await fetch("http://localhost:3000/resetpassword", {
            method: "POST",
            headers: {"content-type": "application/json"},
            body: JSON.stringify({
                gmail: gmail
            })
        })
        const data = await response.json();
        if(data.ok){
            const code = prompt("enter code")
            if(data.code.toString() === code){
                const newPassword = prompt("Enter New Password")
                if(newPassword.length < 6){
                    toast.error("The characters are less than 6")
                    return;
                }
                const res = await fetch("http://localhost:3000/resetpassword", {
                    method: "PATCH",
                    headers: {"content-type": "application/json"},
                    body: JSON.stringify({
                        newPassword: newPassword,
                        gmail: gmail
                    })
                })
                const restData = await res.json();
                toast.success(restData.message)
            }
        }else{
            toast.error(data)
        }
    }

    return (
        <div className={styles.container}>
        
            <div className={styles.navbar}>
                <div className={styles.logo}>MessageRelay</div>
                <div className={styles.navLinks}>
                    <Link to="/login" className={styles.link}>Login</Link>
                    <Link to="/signup" className={styles.link}>Sign Up</Link>
                </div>
            </div>

            <form onSubmit={onSubmitHandler} className={styles.card}>
                <h2 className={styles.title}>Welcome Back</h2>

                <input
                    type="email"
                    placeholder="Email"
                    className={styles.input}
                    required
                    onChange={(e) => setGmail(e.target.value)}
                />

                <input
                    type="password"
                    placeholder="Password"
                    className={styles.input}
                    required
                    onChange={(e) => setPassword(e.target.value)}
                />

                <Link onClick={ResetPasswordHendler} >forget your password?</Link>

                <p style={{color: "red"}}>
                  {res && (typeof res === "string" ? res : `${res.message}: ${res.error || ""}`)}
                </p>

                <button className={styles.button} disabled={loading}>
                    {loading ? "Loading..." : "Login"}
                </button>
            </form>

        </div>
    );
}

export default Login;