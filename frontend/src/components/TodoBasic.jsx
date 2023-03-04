import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import axios from "axios";

const TodoBasic = () => {
  const [data, setData] = useState([]);
  const [text, setText] = useState("");

  const [editedText, setEditedText] = useState("");
  const [editClicked, setEditClicked] = useState("");



  const getTodo = () => {
    axios
      .get("http://localhost:5000")
      .then((res) => {
        setData(res.data);
      })
      .catch((error) => console.log(error));
  };

  const addTodo = () => {
    axios
      .post("http://localhost:5000/save", { text })
      .then((res) => {
        setText("");
        getTodo();
      })
      .catch((error) => console.log(error));
  };

    const cancel = () => {
      setEditClicked("");
      setEditedText("");
    };

  const editToggle = (_id) => {
     axios
       .patch("http://localhost:5000/update", {
         _id,
         text: editedText,
       })
       .then((res) => {
         console.log(res);
         getTodo();
       })
       .catch((err) => console.log(err));
    cancel()
  };

  const deleteTodo = (_id) => {
    axios
      .delete("http://localhost:5000/delete", { data: { _id } })
      .then((res) => {
        console.log(res);
        getTodo();
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getTodo();
  }, []);

  return (
    <div>
      <div style={{ width: "100%", textAlign: "center" }}>
        <h1 style={{ color: "#101820FF" }}>ToDo App</h1>
      </div>
      <div style={{ width: "40%", margin: "auto" }}>
        <div
          style={{ width: "80%", display: "flex", gap: "20px", margin: "auto" }}
        >
          <TextField
            id="standard-basic"
            label="Add ToDo"
            variant="standard"
            value={text}
            onChange={(e) => setText(e.target.value)}
            style={{ width: "100%" }}
          />
          <div>
            <Button
              variant="contained"
              size="large"
              onClick={() => addTodo()}
              style={{ background: "#00203FFF", color: "#ADEFD1FF" }}
            >
              Add
            </Button>
          </div>
        </div>
        <div>
          {data.map((item) => (
            <div key={item._id}>
              <Card
                style={{
                  marginTop: "10px",
                  background: "#101820FF",
                  color: "#FEE715FF",
                }}
              >
                <CardContent
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "10px",
                  }}
                >
                  {item._id === editClicked ? (
                    <div style={{ width: "100%" }}>
                      <input
                        type="text"
                        value={editedText}
                        onChange={(e) => setEditedText(e.target.value)}
                        style={{ background: "#fff", width: "90%" }}
                      />
                    </div>
                  ) : (
                    <div style={{ fontWeight: 600 }}>{item.text}</div>
                  )}

                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                    }}
                  >
                    {item._id === editClicked ? (
                      <>
                        <Button
                          variant="contained"
                          style={{
                            background: "#755139FF",
                            color: "#F2EDD7FF",
                          }}
                          onClick={() => cancel()}
                        >
                          Cancel
                        </Button>
                        <Button
                          variant="contained"
                          style={{
                            background: "#755139FF",
                            color: "#F2EDD7FF",
                          }}
                          onClick={() => editToggle(item._id)}
                        >
                          Save
                        </Button>
                      </>
                    ) : (
                      <Button
                        variant="contained"
                        style={{ background: "#755139FF", color: "#F2EDD7FF" }}
                        onClick={() => setEditClicked(item._id)}
                      >
                        Edit
                      </Button>
                    )}

                    <Button
                      variant="contained"
                      onClick={() => deleteTodo(item._id)}
                      style={{ background: "#990011FF", color: "#FCF6F5FF" }}
                    >
                      Delete
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TodoBasic;
