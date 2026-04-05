import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./styles.module.css";
import { toast } from "react-toastify";

const AdminPage = () =>{
    const [users, setUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const navigate = useNavigate();

    useEffect(() =>{
        const getAdmingPage = async () =>{
            const response = await fetch("http://localhost:3000/adminpage", {
                headers: {"content-type": "application/json", autc: "Bearer " + localStorage.getItem("tokenUser")}
            });

            const data = await response.json();
            console.log(data)
            if(data.userRole !== 'admin'){
                navigate('/mainpage')
            }else{
                navigate("/adminpage");
                setUsers(data.users)
            }
        }
        
        getAdmingPage();
    }, [])

    const filteredUsers = users.filter(user => {
        const term = searchTerm.toLowerCase();
        return Object.values(user).some(value =>
            value?.toString().toLowerCase().includes(term)
        );
    });
    const onDleteHendler = async (idMessage) =>{
        const response = await fetch(`http://localhost:3000/adminpage/${idMessage}`,{
            method: "DELETE",
            headers: {"content-type": "application/json"}
        })
        const data = await response.json();
        if(data.ok){
            toast.success(data.message)
        }
    }
    return(
        <div className={styles.container}>
            <Link to={"/mainpage"}>MainPage</Link>
            <input 
                type="text" 
                placeholder="Search..." 
                value={searchTerm} 
                onChange={(e) => setSearchTerm(e.target.value)} 
                className={styles.searchInput}
            />

            <div className={styles.usersList}>
                {filteredUsers.length === 0 ? (
                    <p className={styles.noUsers}>No users found.</p>
                ) : (
                    filteredUsers.map((value, index) => {
                        return (
                            <div key={index} className={styles.userCard}>
                                <p>clientGmail: {value.clientGmail}</p>
                                <p>userGmail: {value.userGmail}</p>
                                <p>messageId: {value.messageId}</p>
                                <p>subject: {value.subject}</p>
                                <p>text: {value.text}</p>
                                <button onClick={() => onDleteHendler(value.messageId)}>delete</button>
                                <br />
                            </div>
                        )
                    })
                )}
            </div>
        </div>
    )
}

export default AdminPage;