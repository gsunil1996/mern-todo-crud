import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import axios from "axios";
import LinearProgress from "@mui/material/LinearProgress";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import AddIcon from "@mui/icons-material/Add";
import CircularProgress from "@mui/material/CircularProgress";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import CancelIcon from "@mui/icons-material/Cancel";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import SaveIcon from "@mui/icons-material/Save";

const TodoBasic = () => {
  const [data, setData] = useState([]);
  const [noData, setNoData] = useState(false);
  const [text, setText] = useState("");

  const [dataLoader, setDataLoader] = useState(false);
  const [createLoader, setCreateLoader] = useState(false);
  const [updateLoader, setUpdateLoader] = useState(false);
  const [deleteLoader, setDeleteLoader] = useState(false);

  const [dataError, setDataError] = useState("");

  const [successMessage, setSuccessMessage] = useState("");
  const [errormessage, setErrorMessage] = useState("");

  const [editedText, setEditedText] = useState("");
  const [editClicked, setEditClicked] = useState("");

  const [deleteClicked, setDeleteClicked] = useState("");

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const getTodo = () => {
    setDataLoader(true);
    axios
      .get("http://localhost:5000")
      .then((res) => {
        if (res.data.length === 0) {
          setNoData(true);
        } else {
          setNoData(false);
          setData(res.data);
          setDataError("");
        }
        setDataLoader(false);
      })
      .catch((error) => {
        console.log(error);
        setDataError(error.message);
        setDataLoader(false);
      });
  };

  const addTodo = () => {
    setCreateLoader(true);
    setTimeout(() => {
      axios
        .post("http://localhost:5000/save", { text })
        .then((res) => {
          setText("");
          setSuccessMessage("Data Added Successfully");
          setErrorMessage("");
          setCreateLoader(false);
          getTodo();
          handleClickOpen();
        })
        .catch((error) => {
          console.log(error);
          setErrorMessage("Something went wrong");
          setSuccessMessage("");
          setCreateLoader(false);
          handleClickOpen();
        });
    }, 1000);
  };

  const cancel = () => {
    setEditClicked("");
    setEditedText("");
  };

  const editTodo = (_id) => {
    setUpdateLoader(true);
    setTimeout(() => {
      axios
        .patch("http://localhost:5000/update", {
          _id,
          text: editedText,
        })
        .then((res) => {
          console.log(res);
          getTodo();
          setSuccessMessage("Data Updated Successfully");
          setErrorMessage("");
          setUpdateLoader(false);
          cancel();
          handleClickOpen();
        })
        .catch((err) => {
          console.log(err);
          setErrorMessage("Something went wrong");
          setSuccessMessage("");
          setUpdateLoader(false);
          handleClickOpen();
        });
    }, 1000);
  };

  const deleteItem = (_id) => {
    setDeleteClicked(_id);
    deleteTodo(_id);
  };

  const deleteTodo = (_id) => {
    setDeleteLoader(true);
    setTimeout(() => {
      axios
        .delete("http://localhost:5000/delete", { data: { _id } })
        .then((res) => {
          console.log(res);
          setSuccessMessage("Data Deleted Successfully");
          setErrorMessage("");
          setDeleteClicked("");
          setDeleteLoader(false);
          getTodo();
          handleClickOpen();
        })
        .catch((error) => {
          console.log(error);
          setErrorMessage("Something went wrong");
          setSuccessMessage("");
          setDeleteLoader(false);
          handleClickOpen();
        });
    }, 1000);
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
              startIcon={createLoader ? null : <AddIcon />}
              style={{ background: "#00203FFF", color: "#ADEFD1FF" }}
              disabled={createLoader ? true : false}
            >
              {createLoader ? (
                <CircularProgress style={{ color: "#fff" }} />
              ) : (
                "Add"
              )}
            </Button>
          </div>
        </div>
        {dataLoader ? (
          <div style={{ width: "100%", marginTop: "20px" }}>
            {" "}
            <LinearProgress />{" "}
          </div>
        ) : noData ? (
          <div
            style={{ width: "100%", textAlign: "center", marginTop: "20px" }}
          >
            <h1>No Data Found</h1>
          </div>
        ) : dataError.length > 0 ? (
          <div
            style={{ width: "100%", textAlign: "center", marginTop: "20px" }}
          >
            <h1>{dataError}</h1>
          </div>
        ) : (
          <div style={{ paddingBottom: "50px" }}>
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
                              background: "#CE4A7EFF",
                              color: "#F2EDD7FF",
                            }}
                            onClick={() => cancel()}
                            startIcon={<CancelIcon />}
                          >
                            Cancel
                          </Button>
                          <Button
                            variant="contained"
                            style={{
                              background: "#2C5F2D",
                              color: "#F2EDD7FF",
                            }}
                            onClick={() => editTodo(item._id)}
                            startIcon={updateLoader ? null : <SaveIcon />}
                          >
                            {updateLoader ? (
                              <CircularProgress style={{ color: "#fff" }} />
                            ) : (
                              "Save"
                            )}
                          </Button>
                        </>
                      ) : (
                        <Button
                          variant="contained"
                          startIcon={<EditIcon />}
                          style={{
                            background: "#755139FF",
                            color: "#F2EDD7FF",
                          }}
                          onClick={() => {
                            setEditClicked(item._id);
                            setEditedText(item.text);
                          }}
                        >
                          Edit
                        </Button>
                      )}

                      {item._id === deleteClicked ? (
                        <Button
                          variant="contained"
                          style={{
                            background: "#990011FF",
                            color: "#FCF6F5FF",
                          }}
                          disabled
                        >
                          <CircularProgress style={{ color: "#fff" }} />
                        </Button>
                      ) : (
                        <Button
                          variant="contained"
                          onClick={() => deleteItem(item._id)}
                          style={{
                            background: "#990011FF",
                            color: "#FCF6F5FF",
                          }}
                          startIcon={<DeleteForeverIcon />}
                          disabled={deleteLoader ? true : false}
                        >
                          Delete
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        )}
      </div>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          {successMessage.length > 0 ? (
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                marginBottom: "20px",
              }}
            >
              {" "}
              <CheckCircleIcon
                style={{ color: "#2C5F2D", fontSize: "100px" }}
              />{" "}
            </div>
          ) : (
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                marginBottom: "20px",
              }}
            >
              <CancelIcon style={{ color: "#990011FF", fontSize: "100px" }} />{" "}
            </div>
          )}
          {successMessage.length > 0 ? (
            <h1>{successMessage}</h1>
          ) : (
            <h1>{errormessage}</h1>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TodoBasic;
