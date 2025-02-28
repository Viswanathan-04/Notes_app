import { useEffect, useState } from "react";
import axios from 'axios';
import './display.css';
import { useNavigate } from "react-router-dom";

function Display() {
    const [data1, setData] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = () => {
            axios.get('http://127.0.0.1:5001/api/notes/')
                .then((response) => {
                    setData(prevData => {
                        const prevStateMap = new Map(prevData.map(task => [task._id, task.isOpen]));
                        return response.data.data.map(task => ({
                            ...task,
                            isOpen: prevStateMap.get(task._id) || false
                        }));
                    });
                })
                .catch((err) => {
                    setData([]);
                });
        };

        fetchData();
        const interval = setInterval(fetchData, 2000);
        return () => clearInterval(interval);
    }, []);

    const handleDelete = (id_val) => {
        axios.delete(`http://127.0.0.1:5001/api/notes/${id_val}`)
            .then(() => {
                setData(prevData => prevData.filter(task => task._id !== id_val));
            })
            .catch(() => {
                alert("An error occurred. Please try again.");
            });
    };

    const handleEdit = (task) => {
        navigate('/edit', { state: { data: task } });
    };

    const toggleOpen = (id) => {
        setData(prevData =>
            prevData.map(task =>
                task._id === id ? { ...task, isOpen: !task.isOpen } : task
            )
        );
    };

    return (
        <div className="tasks">
            {data1.length > 0 ? (
                data1.map((task, index) => (
                    <div key={index} className="task-disp">
                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <p onClick={() => toggleOpen(task._id)} style={{ cursor: "pointer" }}>
                                {task.isOpen ? "▲" : "▼"}
                            </p>
                            <p style={{ fontWeight: '700', cursor: "pointer" }} onClick={() => handleEdit(task)}>{task.title}</p>
                            <button type="button" className='delete-btn' onClick={() => handleDelete(task._id)}>X</button>
                        </div>
                        {task.isOpen && <p style={{ marginRight: 'auto', marginLeft: '10px' }}>{task.content}</p>}
                    </div>
                ))
            ) : (
                <div>No Tasks</div>
            )}
        </div>
    );
}

export default Display;