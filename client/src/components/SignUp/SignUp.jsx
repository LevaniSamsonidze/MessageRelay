import { Link } from "react-router-dom";
import styles from "./signup.module.css";
import { useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import { toast } from "react-toastify";

const SignUp = () => {
    const [gmail, setGmail] = useState('');
    const [pass, setPass]= useState('');
    const [loading, setLoading] = useState(false)

    const onSubmitHendler = async (e) =>{
        e.preventDefault()
        setLoading(true)

        let response;

        try {
            response = await fetch("http://localhost:3000/signup", {
                method: "POST",
                headers: {"content-type": "application/json"},
                body: JSON.stringify({
                    gmail: gmail,
                    pass: pass,
                    id: uuidv4()
                })
            });
        } finally {
            setLoading(false)
        }

        const data = await response.json();
        
        if (!response.ok) {
            toast.error(data); 
        } else {
            toast.error(data.message);   
        }
    }

    return (
        <div className={styles.signupContainer}>
            <div className={styles.signupNavbar}>
                <div className={styles.signupLogo}>MessageRelay</div>
                <div className={styles.signupNavLinks}>
                    <Link to="/login" className={styles.signupLink}>Login</Link>
                    <Link to="/signup" className={styles.signupLink}>Sign Up</Link>
                </div>
            </div>

            <form onSubmit={onSubmitHendler} className={styles.signupCard}>
                <h2 className={styles.signupTitle}>Join Us Today</h2>

                <input
                    type="email"
                    placeholder="Enter your email"
                    className={styles.signupInput}
                    required
                    onChange={(e) => setGmail(e.target.value)}
                />

                <input
                    type="password"
                    placeholder="Create password"
                    minLength={6}
                    className={styles.signupInput}
                    required
                    onChange={(e) => setPass(e.target.value)}
                />

                <button className={styles.signupButton} disabled={loading}>
                    {loading? 'loading...': 'login'}
                </button>

                <p className={styles.signupFooter} style={{color: "red"}}>
                    Already have an account? <Link to="/login" style={{color: "blue"}} className={styles.signupLink}>Sign In</Link>
                </p>
            </form>
        </div>
    );
}

export default SignUp;