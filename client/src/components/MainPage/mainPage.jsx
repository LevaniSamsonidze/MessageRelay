import { useEffect } from "react";
import styles from "./style.module.css";
import { useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import { toast } from "react-toastify";
import { Link, useNavigate } from 'react-router-dom'


const MainPage = () => {
    const [result, setResult] = useState('');
    const [userGmail, setUserGmail] = useState('');
    const [subject, setSubject] = useState('');
    const [text, setText] = useState('');
    const [loadding, setLoadding] = useState(false);

    useEffect(() => {
        const getToekn = async () =>{
            const response = await fetch("http://localhost:3000/mainpage", {
                headers: {autc: "Bearer " + localStorage.getItem("tokenUser")}
            })
            const data = await response.json();
            const res = await fetch("http://localhost:3000/profile", {
                method: "POST",
                headers: {"content-type": "application/json"},
                body: JSON.stringify({
                    id: data.id
                })
            })
            const resData = await res.json();
            setResult(resData)
        }
        getToekn()
    }, [])
    const onChangeHandler = async (e) =>{
        const file = e.target.files[0]
        const render = new FileReader()
        render.onload = async () =>{
            const base64String = render.result;
            const s = await fetch("http://localhost:3000/uploadphoto", {
                method: "PATCH",
                headers: {"content-type": "application/json", autc: "Barear " + localStorage.getItem("tokenUser")},
                body: JSON.stringify({
                    photo: base64String
                })
            })
        }
        render.readAsDataURL(file)
        window.location.reload()
    }
    const logOutHendler = () =>{
        const userConsent = confirm("Do you really want to log out of the account?")
        if(userConsent){
            localStorage.clear()
            window.location.reload()
        }
    }

    const MassgeSendHendler = async (e) =>{
        e.preventDefault();
        setLoadding(true)
        const response = await fetch("http://localhost:3000/sendgmail", {
            method: "POST",
            headers: {"content-type": "application/json", autc: "Barear " + localStorage.getItem("tokenUser")},
            body: JSON.stringify({
                userGmail: userGmail,
                subject: subject,
                text: text,
                id: uuidv4()
                
            })
        })
        const data = await response.json()
        if(data.ok){
            toast.success(data.message)
            setLoadding(false)
            return
        }else if(!data.ok){
            toast.error(data.message);
            setLoadding(false)
            return
        }

    }
    return (
        <div className={styles.container}>

            <div className={styles.navbar}>
                <div className={styles.logo}>MessageRelay</div>

                <div className={styles.userSection}>
                    {result.role === "admin" && <Link to={"/adminpage"} className={styles.link}>Admin Page</Link>}
                    <p>{result.role}</p>
                    <img
                        src={result.proflePhoto}
                        alt="user"
                        className={styles.avatar}
                    />
                    <span className={styles.email}>{result.gmail}</span>
                    <input
                        className={styles.fileInput}
                        type="file"
                        onChange={onChangeHandler}
                    />

                    <button className={styles.logoutBtn} onClick={logOutHendler}>
                        Log out
                    </button>
                </div>
            </div>

            <form className={styles.card} onSubmit={MassgeSendHendler}>
                <h2 className={styles.title}>Send Email</h2>

                <input
                    type="email"
                    placeholder="Receiver Email"
                    className={styles.input}
                    required
                    onChange={(e) => setUserGmail(e.target.value)}
                />

                <input
                    type="text"
                    placeholder="Subject"
                    className={styles.input}
                    required
                    onChange={(e) => setSubject(e.target.value)}
                />

                <textarea
                    placeholder="Write your message..."
                    className={styles.textarea}
                    required
                    onChange={(e) => setText(e.target.value)}
                />

                <button className={styles.button} disabled={loadding}>
                    {loadding ? "loadding...": 'Send Message'}
                </button>
            </form>
        </div>
    );
};

export default MainPage;