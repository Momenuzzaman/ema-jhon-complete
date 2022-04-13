import { initializeApp } from 'firebase/app';
import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import React, { useState } from 'react';
import firebaseConfig from './firebase.config';


 const app = initializeApp(firebaseConfig);


function Login() {

  const [user,setUser] = useState({
    isInDisplay: false,
    name:'', 
    email: '',
    newUser: false,
    password : '',
    photo: ''
  });
  const provider = new GoogleAuthProvider();

  const handelClick = () =>{
      const auth = getAuth();
      signInWithPopup(auth,provider)
      .then((result) =>{
      const  {displayName,email,photoURL} = result.user
    
      const singInUser = {
        isInDisplay: true,
        name: displayName,
        email: email,
        photoURL: photoURL
      };
      setUser(singInUser);
      });
  }

  const handelClickOut = () =>{
    const auth = getAuth();
    signOut(auth).then(() => {
      const logOutUser = {
        isInDisplay : false,
        name : '',
        email : '',
        password : '',
        photoURL : '',
        error: ''
      }
      setUser(logOutUser);
    })
  }

  const onChange = (e) => {
    let isFormValid = true;
    if(e.target.name === "email"){
       isFormValid = /\S+@\S+\.\S+/.test(e.target.value);
    }
    if(e.target.name === "password"){
      const isPassword = e.target.value.length > 6;
      const passwordNumber = /\d{1}/.test(e.target.value);
     isFormValid = isPassword && passwordNumber;
    }
    if(isFormValid){
      const newUserInfo = {...user};
      newUserInfo[e.target.name] = e.target.value;
      setUser(newUserInfo);
      
    }
  }
  

  const  handelOnSubmit = (e) => {
    if(user.email && user.password){
      const auth = getAuth();
        createUserWithEmailAndPassword(auth, user.email, user.password)
          .then((res) => {
           const newUserInfo = {...user};
           newUserInfo.error = '';
           setUser(newUserInfo);
          })
        .catch((error) => {
         const newUserInfo = {...user};
         newUserInfo.error =  error.message;
         setUser(newUserInfo);
  });

    }
    e.preventDefault();
  };
  
  return (
    <div className="App">
      {
         user.isInDisplay? <button onClick={handelClickOut}>Sing Out</button> 
         : <button onClick={handelClick}>Sing In</button>
      }
      {
        user.isInDisplay &&
         <div>
           <p>Welcome, {user.name}</p>
           <p>Your WElcome: {user.email}</p> 
           <img src={user.photoURL} alt=" "></img>
        </div> 
      }
      
      <h1>Our Own Authentication</h1>
          <input type="checkbox" name="newUser"></input>
          <label for="newUser">New User Sing up</label>
      <form onSubmit={handelOnSubmit}>
          <input type="text" name="email" onBlur={onChange} placeholder="Enter Your Email" required></input>
          <br/>
          <input type="password" name="password" onBlur={onChange} placeholder="Password" required></input>
          <br/>
          <input type="submit"  value="submit"></input>
      </form>
      <p style={{color: 'red'}}>{user.error}</p>
    </div>
  );
}

export default Login;
