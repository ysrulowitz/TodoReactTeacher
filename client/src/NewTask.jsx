import { useContext, useState, useCallback } from "react";
import AuthContext from "./auth";
import { useDropzone } from "react-dropzone";

export default function NewTask({ updateTasks }) {
  const userId = useContext(AuthContext);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskFile, setNewTaskFile] = useState();

  const [PreviewDataUrl, setPreviewDataUrl] = useState();

  const [acceptedFilesState, setAcceptedFilesState] = useState([]);
  const [fileRejectionsState, setFileRejectionsState] = useState([]);
  const [error, setError] = useState("");

  const onDrop = useCallback((acceptedFiles, fileRejections) => {
    let file = acceptedFiles?.[0];

    if (file) {
      setNewTaskFile(file);

      const reader = new FileReader();

      reader.readAsDataURL(file);

      reader.onloadend = function () {
        setPreviewDataUrl(reader.result);
      };
    } else {
      setPreviewDataUrl(null);
      setNewTaskFile(null);
    }

    setAcceptedFilesState(acceptedFiles);
    setFileRejectionsState(fileRejections);
  }, []);
  // console.log(fileRejectionsState);

  const {
    getInputProps,
    getRootProps,
    isDragActive,
    acceptedFiles,
    fileRejections,
  } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".png", ".jpg"],
    },
    maxSize: 2097152,
  });

  // console.log("ac",acceptedFiles);
  // console.log("reg",fileRejections);

  async function handleSubmit(event) {
    event.preventDefault();

    if(!newTaskTitle)return

    const formData = new FormData();
    formData.append("title", newTaskTitle);
    if (newTaskFile) {
      console.log("file", newTaskFile);
      formData.append("taskImg", newTaskFile);
    }

    try {
      await fetch("http://localhost:3000/tasks", {
        method: "POST",
        credentials: "include",
        body: formData,
      });

      updateTasks();
      setNewTaskTitle("");
      setNewTaskFile(null); // Clear the file input
      setPreviewDataUrl(""); // Clear the image URL
      setAcceptedFilesState([]); // Clear the accepted files
      setFileRejectionsState([]); // Clear the rejected files
    } catch (error) {
      console.error("Error submitting task:", error);
    }
  }

  return (
    <div>
      <form className="input-container">
        <input
          type="text"
          id="title"
          name="title"
          placeholder="Add a new task"
          value={newTaskTitle}
          onChange={({ target }) => setNewTaskTitle(target.value)}
        />
        <div
          className={
            "preview-container " +
            (isDragActive ? "isDragging " : "") +
            (fileRejectionsState.length > 0 ? "reject" : "")
          }
          {...getRootProps()}
        >
          <input {...getInputProps()} />
          {isDragActive
            ? "please drop your file here"
            : "Drag and drop your files"}
          <div>
            {PreviewDataUrl && (
              <img
                className="preview-img"
                src={PreviewDataUrl}
                alt=""
                height={"100px"}
              />
            )}
          </div>
          {fileRejectionsState.map(({ file, errors }, index) => (
            <p key={index}>
              {errors.map((err) =>  `${file.path} - ${err.message}`)}
            </p>
          ))}

          {acceptedFilesState.map((file, index) => (
            <p key={index}>{file.path}</p>
          ))}
        </div>

        <button className={"add-task " + (newTaskTitle? "title-filled":"")}  type="submit" onClick={handleSubmit}>
          +
        </button>
      </form>
    </div>
  );
}
