import { Outlet } from "react-router-dom";
import axios from 'axios';
import { useState } from "react";

function Home() {
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");

    const handleAdd = () => {
        if (title=="" && desc=="")
        {
            alert("Please enter details");
            return;
        }
        axios.post('http://127.0.0.1:5001/api/notes', {"title" : title, "content" : desc})
            .then((response) => {
                setTitle("");
                setDesc("");
                alert(response.data.message);
            })
            .catch((err) => {
                alert(err.message);
            });
    };

    return (
        <>
            <div className="home-main" style={{display: "flex", flexDirection: 'column', gap: '30px', width: '30vw', margin: '100px auto'}}>
                <input 
                    type="text" 
                    placeholder="Title..." 
                    required 
                    onChange={(event) => setTitle(event.target.value)}
                    value={title}
                    style={{fontSize: '18px', borderRadius: '10px', padding: '10px', fontFamily: "Courier New"}}
                />
                <textarea 
                    rows="3"
                    placeholder="Description..." 
                    onChange={(event) => setDesc(event.target.value)}
                    value={desc}
                    style={{fontSize: '18px', borderRadius: '10px', padding: '10px', height: '20vh', fontFamily: "Courier New"}}
                />
                <button type="button" onClick={handleAdd} style={{width: '10vw', height: "7vh", padding: '10px', margin: 'auto', borderRadius: '10px', fontWeight: '800', border: 'none', backgroundColor: 'white', fontFamily: "Courier New"}}>Add Task</button>
            </div>
            <Outlet />
        </>
    );
}

export default Home;