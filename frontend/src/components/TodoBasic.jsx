import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import axios from "axios";

const TodoBasic = () => {

    const [data, setData] = useState([]);
    const [text, setText] = useState("");

    const getTodo = () => {
        axios.get('http://localhost:5000').then((res) => {
            setData(res.data);
        }).catch((error) => console.log(error))
    }

    useEffect(() => {
        getTodo()
    }, [])

    console.log("getResponse", text)

    return (
        <div>
            <div style={{ width: "100%", textAlign: "center" }} >
                <h1 style={{ color: "#101820FF" }} >ToDo App</h1>
            </div>
            <div style={{ width: "40%", margin: "auto" }} >
                <div style={{ width: "80%", display: "flex", gap: "20px", margin: "auto" }} >
                    <TextField id="standard-basic" label="Add ToDo" variant="standard" value={text}
                        onChange={(e) => setText(e.target.value)}
                        style={{ width: "100%" }} />
                    <div>
                        <Button variant="contained" size='large'
                            style={{ background: "#00203FFF", color: "#ADEFD1FF" }} >Add</Button>
                    </div>
                </div>
                <div>
                    {data.map(item => <div key={item._id} >
                        <Card style={{ marginTop: "10px", background: "#101820FF", color: "#FEE715FF" }} >
                            <CardContent style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px" }} >
                                <div style={{ fontWeight: 600 }} >
                                    {item.text}
                                </div>
                                <div style={{ display: "flex", alignItems: "center", gap: "10px" }} >
                                    <Button variant="contained"
                                        style={{ background: "#755139FF", color: "#F2EDD7FF" }} >Edit</Button>

                                    <Button variant="contained" style={{ background: "#990011FF", color: "#FCF6F5FF" }} >Delete</Button>
                                </div>
                            </CardContent>
                        </Card>
                    </div>)}
                </div>
            </div>
        </div>
    )
}

export default TodoBasic