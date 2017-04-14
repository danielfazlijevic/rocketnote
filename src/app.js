import React from 'react';
import ReactDom from 'react-dom';
import NoteCard from './notecard';

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

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      notes: [],
      loggedIn: false
    }
    this.showNewNote = this
      .showNewNote
      .bind(this);
    this.addNote = this
      .addNote
      .bind(this);
    this.showSignUp = this
      .showSignUp
      .bind(this);
    this.createUser = this
      .createUser
      .bind(this);
    this.loginUser = this
      .loginUser
      .bind(this);
    this.showLogin = this
      .showLogin
      .bind(this);
    this.signOut = this
      .signOut
      .bind(this);
  }
  showNotes() {
    if (this.state.loggedIn) {
      return (
        <div className="notes columns is-multiline">
          {this
            .state
            .notes
            .map((note, i) => {
              return (<NoteCard note={note} key={`note-${i}`} removeNote={this.removeNote}/>)
            })
            .reverse()}
        </div>
      );
    } else {
      return (
        <h2 className='title is-2 mtop1'>Sign In to add notes.</h2>
      );
    }
  }
  componentDidMount(e) {
    firebase
      .auth()
      .onAuthStateChanged((user) => {
        if (user) {
          firebase
            .database()
            .ref(`users/${firebase.auth().currentUser.uid}/notes`)
            .on('value', (res) => {
              const dataArray = [];
              const userData = res.val();
              for (let key in userData) {
                userData[key].key = key;
                dataArray.push(userData[key]);
              }
              this.setState({notes: dataArray, loggedIn: true});
            });
        } else {
          this.setState({loggedIn: false})
        }
      });

  }
  showNewNote(e) {
    e.preventDefault();
    this
      .newNoteMenu
      .classList
      .toggle('is-active');
  }
  showSignUp(e) {
    e.preventDefault();
    this
      .newSignUp
      .classList
      .toggle('is-active');
    console.log('show sign up');
  }
  showLogin(e) {
    e.preventDefault();
    this
      .newLogin
      .classList
      .toggle('is-active');
    console.log('show sign in');
  }
  addNote(e) {
    e.preventDefault();
    const note = {
      title: this.noteTitle.value,
      text: this.noteText.value
    };
    const dbRef = firebase
      .database()
      .ref(`users/${firebase.auth().currentUser.uid}/notes`);
    dbRef.push(note);
    this.noteTitle.value = '';
    this.noteText.value = '';
    this.showNewNote(e);
  }
  removeNote(noteId) {
    console.log(noteId);
    const dbRef = firebase
      .database()
      .ref(`users/${firebase.auth().currentUser.uid}/notes/${noteId}`);
    dbRef.remove();
  }
  createUser(e) {
    e.preventDefault();
    const email = this.emailInput.value;
    const password = this.newpassword.value;
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .catch(function (error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        alert(errorCode, errorMessage);
      });
    this.showSignUp(e);
    this.emailInput.value = '';
    this.newpassword.value = '';
  }
  loginUser(e) {
    e.preventDefault();
    const email = this.emaillogin.value;
    const password = this.passlogin.value;

    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((res) => this.showLogin(e))
      .catch((err) => alert(err.message + err.code));
  }
  signOut(e) {
    e.preventDefault();
    firebase
      .auth()
      .signOut();
    this.state.loggedIn = false;
  }
  render() {
    return (
      <div>

        <div className='nav'>
          <h2 className='nav-left title is-2'>RocketNote v0.1</h2>
          {(() => {
            if (this.state.loggedIn) {

              return (
                <span>
                  <a href="" className='button is-danger' onClick={this.signOut}>Sign Out</a>
                  <a
                    href=""
                    onClick={this.showNewNote}
                    className='button'>New Note</a>
                </span>
              );
            } else {
              return (
                <span>

                  <a href="" className='button is-dark' onClick={this.showLogin}>Log In</a>
                  <a href="" className='button is-dark' onClick={this.showSignUp}>Sign Up</a>

                </span>
              );
            }

          })()
}

        </div>
        <div className="container">
          <div className="signUp modal" ref={ref => this.newSignUp = ref}>
            <div className="modal-background"></div>
            <div className="modal-content">
              <form onSubmit={this.createUser}>
                <label>Email</label>
                <input
                  className='input'
                  type='email'
                  ref={ref => this.emailInput = ref}
                  placeholder='email'/>
                <label>Password</label>
                <input
                  type="password"
                  className='input'
                  ref={ref => this.newpassword = ref}
                  placeholder='password'/>
                <input
                  type="submit"
                  className='button is-success is-pulled-right'
                  value='Sign Up'/>
              </form>
            </div>
            <button className="modal-close" onClick={this.showSignUp}></button>
          </div>
          <div className="login modal" ref={ref => this.newLogin = ref}>
            <div className="modal-background"></div>
            <div className="modal-content">
              <form onSubmit={this.loginUser}>
                <h2 className='title is-3'>Login</h2>
                <hr/>
                <label>Email</label>
                <input
                  className='input'
                  type='email'
                  ref={ref => this.emaillogin = ref}
                  placeholder='email'/>
                <label>Password</label>
                <input
                  type="password"
                  className='input'
                  ref={ref => this.passlogin = ref}
                  placeholder='password'/>
                <input
                  type="submit"
                  className='button is-success is-pulled-right'
                  value='Sign In'/>
              </form>
            </div>
            <button className="modal-close" onClick={this.showLogin}></button>
          </div>
          <div className="newNote modal" ref={ref => this.newNoteMenu = ref}>
            <div className="modal-background"></div>
            <div className="modal-content">
              <form onSubmit={this.addNote}>

                <label htmlFor="title" className='label'>Name:</label>
                <input type="text" className='input' ref={ref => this.noteTitle = ref}/>
                <label htmlFor="notetext" className='label'>Note:</label>
                <textarea
                  name="notetext"
                  id="nttext"
                  cols="30"
                  rows="10"
                  className='textarea'
                  ref={ref => this.noteText = ref}></textarea>
                <div className="is-pulled-right">
                  <a className="button has-text-right" onClick={this.showNewNote}>Cancel</a>
                  <input type="submit" value='Add Note' className='button is-success'/>
                </div>
              </form>
            </div>

            <button className="modal-close" onClick={this.showNewNote}></button>

          </div>

          {this.showNotes()}

        </div>
      </div>

    )
  }
}

ReactDom.render(
  <App/>, document.getElementById('app'));