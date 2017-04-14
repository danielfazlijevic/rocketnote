import React from 'react';
import ReactDom from 'react-dom';
import NoteCard  from './notecard';




  // Initialize Firebase
  const config = {
    apiKey: "AIzaSyCbYwNLRiAx_IGTovWdqJLuXPXVjEqHgIk",
    authDomain: "rocketnote-46fd7.firebaseapp.com",
    databaseURL: "https://rocketnote-46fd7.firebaseio.com",
    projectId: "rocketnote-46fd7",
    storageBucket: "rocketnote-46fd7.appspot.com",
    messagingSenderId: "381583485636"
  };
  firebase.initializeApp(config);

class App extends React.Component{
    constructor() {
        super();
        this.state = {
            notes: []
        }
        this.showNewNote = this.showNewNote.bind(this);
        this.addNote = this.addNote.bind(this);
    }
    componentDidMount(e){
        firebase.database().ref().on('value',(res)=> {
            const dataArray = [];
            const userData = res.val();
            for(let key in userData){
userData[key].key = key;
dataArray.push(userData[key]);
            }
            this.setState({
                notes: dataArray
            });
        });
    }
    showNewNote(e){
        e.preventDefault();
        this.newNoteMenu.classList.toggle('is-active');
    }
    addNote(e){
        e.preventDefault();
        const note = {
            title: this.noteTitle.value,
            text: this.noteText.value
        };
       const dbRef = firebase.database().ref();
       dbRef.push(note);
        this.noteTitle.value = '';
        this.noteText.value ='';
        this.showNewNote(e);
    }
    removeNote(noteId){
console.log(noteId);
const dbRef = firebase.database().ref(noteId);
dbRef.remove();
    }
    render(){
        return (
<div>
    
        <div className='nav'>
            <h3 className='nav-left title is-3'>RocketNote v0.1</h3>
            <a href='' onClick={this.showNewNote} className='button is-primary is-pulled-right'>New Note</a>
        </div>
    <div className="container">

        <div className="newNote modal" ref={ref=>
            this.newNoteMenu = ref}>
  <div className="modal-background"></div>
  <div className="modal-content">
     <form onSubmit={this.addNote}>

                        <label htmlFor="title" className='label'>Name:</label>
                        <input type="text" className='input' ref={ref => this.noteTitle = ref}/>
                        <label htmlFor="notetext" className='label'>Note:</label>
                        <textarea name="notetext" id="nttext" cols="30" rows="10" className='textarea' ref={ref => this.noteText = ref}></textarea>
                        <div className="is-pulled-right">
                    <a className="button has-text-right" onClick={this.showNewNote}>Cancel</a>
                      <input type="submit" value='Add Note' className='button is-success'/>
                        </div>
     </form>
  </div>
  <button className="modal-close" onClick={this.showNewNote}></button>
           
        </div>
        <div className="notes columns is-multiline">
           {this.state.notes.map((note,i) => {
               return(
                   <NoteCard note={note} key={`note-${i}`} removeNote={this.removeNote}/>
               )
           }).reverse()}
        </div>
    </div>
</div>

        )
    }
}


ReactDom.render(<App/>,document.getElementById('app'));