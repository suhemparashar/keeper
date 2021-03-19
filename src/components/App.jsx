import React, { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";
import Axios from "axios";
import uniqid from "uniqid";

function App() {

  const [notes, setNotes] = useState([]);
  const [recentNote, setRecentNote]=useState(null);
  const [deletedNote, setDeleteNote]=useState(null);

  useEffect(()=>{
     Axios.get("http://localhost:5000")
    .then(res=>{
      setNotes(()=>{
        const temp=[];
        res.data.map(noteItem=>{
          const obj={
            id:noteItem.id,
            title:noteItem.title,
            content:noteItem.content
          }
          temp.push(obj);
        })
        return temp;
      })
    })
  .catch(err=>console.log(err));

  },[]);

  useEffect(()=>{
    if(recentNote!==null){
      Axios.post("http://localhost:5000",{
        id:recentNote.id,
        title:recentNote.title,
        content:recentNote.content
      })
      .then(function (res) {
        console.log(res.data);
      })
      .catch(function (err) {
        console.log(err);
      });
    }
    
  },[recentNote]);

  useEffect(()=>{
    if(deletedNote!==null){
      Axios.delete("http://localhost:5000", {data:{
        id:deletedNote
      }})
      .then(function (res) {
        console.log(res.data);
      })
      .catch(function (err) {
        console.log(err);
      });
    }
  },[deletedNote])
  
  

  function addNote(newNote) {

    setNotes(prevNotes => {
      newNote.id=uniqid();
      console.log(newNote);
      setRecentNote(newNote);
      return [...prevNotes, newNote];
    });
  }

  function deleteNote(id) {
    setDeleteNote(id);
    setNotes(prevNotes => {
      return prevNotes.filter((noteItem) => {
        return noteItem.id !== id;
      });
    });
    
  }

  return (
    <div>
      <Header />
      <CreateArea onAdd={addNote} />
      {notes.map((noteItem, index) => {
        return (
          <Note
            key={index}
            id={noteItem.id}
            title={noteItem.title}
            content={noteItem.content}
            onDelete={deleteNote}
          />
        );
      })}
      <Footer />
    </div>
  );
}

export default App;
