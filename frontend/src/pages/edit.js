import { useEffect, useState } from "react";
import axios from 'axios';
import { Outlet, useLocation, useNavigate } from "react-router-dom";

function Edit() {
    const location = useLocation();
    const navigate = useNavigate();

    // Initialize states with location data if available
    const [id, setId] = useState(location.state?.data?._id || "");
    const [title, setTitle] = useState(location.state?.data?.title || "");
    const [desc, setDesc] = useState(location.state?.data?.content || "");

    // Run only when location.state.data changes
    useEffect(() => {
        if (location.state?.data) {
            setId(location.state.data._id || "");
            setTitle(location.state.data.title || "");
            setDesc(location.state.data.content || "");
        }
    }, [location.state?.data]);  // Dependency array added

    const updateTask = () => {
        axios.put(`http://127.0.0.1:5001/api/notes/${id}`, { title, content: desc })
            .then((response) => {
                alert(response.data);
                setTitle("");
                setDesc("");
            })
            .catch((err) => {
                console.error(err);
                alert("An error occurred. Please try again.");
            });
    };

    const handleBack = () => {
        navigate('/');
    };

    return (
        <>
            <div style={{ display: "flex", flexDirection: 'column', gap: '30px', width: '30vw', margin: '100px auto' }}>
                <input 
                    type="text" 
                    placeholder="Title..." 
                    required 
                    onChange={(event) => setTitle(event.target.value)}
                    value={title}
                    style={{ fontSize: '18px', borderRadius: '10px', padding: '10px' }}
                />
                <textarea 
                    rows="3"
                    placeholder="Description..." 
                    onChange={(event) => setDesc(event.target.value)}
                    value={desc}
                    style={{ fontSize: '18px', borderRadius: '10px', padding: '10px', height: "20vh" }}
                />
                <div style={{ display: 'flex', gap: '30px' }}>
                    <button type="button" onClick={handleBack} style={{width: '10vw', height: "7vh",  padding: '10px', margin: 'auto', borderRadius: '10px', fontWeight: '800', border: 'none', backgroundColor: 'white', fontFamily: "Courier New"}}>Back</button>
                    <button type="button" onClick={updateTask} style={{width: '10vw', height: "7vh",  padding: '10px', margin: 'auto', borderRadius: '10px', fontWeight: '800', border: 'none', backgroundColor: 'white', fontFamily: "Courier New"}}>Update Task</button>
                </div>
            </div>
            <Outlet />
        </>
    );
}

export default Edit;
