import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import axios from "axios";

var firebaseConfig = {
  apiKey: "AIzaSyAhXdYAsOM_ko0th2BjMaKcpej8y0TKmhU",
  authDomain: "talkie-6737b.firebaseapp.com",
  projectId: "talkie-6737b",
  storageBucket: "talkie-6737b.appspot.com",
  messagingSenderId: "822760643148",
  appId: "1:822760643148:web:84c0b77313fa17dcb6b2e9",
  measurementId: "G-XX30Q8EB1J",
};

const fire = firebase.initializeApp(firebaseConfig);
export default fire;
export const auth = firebase.auth();
export const firestore = firebase.firestore();
const provider = new firebase.auth.GoogleAuthProvider();

export const signInWithGoogle = () => {
  auth.signInWithPopup(provider).then((result) => {
    /** @type {firebase.auth.OAuthCredential} */
    console.log(result);
    var credential = result.credential;

    // This gives you a Google Access Token. You can use it to access the Google API.
    var token = credential.idToken;
    // The signed-in user info.
    // var user = result.user;
    var user = result.additionalUserInfo.profile;
    let userdata = {
      firstName: user.given_name,
      lastName: user.family_name,
      email: user.email,
      accessToken: token,
    };
    let data = {
      accessToken: token,
    };
    console.log(JSON.stringify(data));
    axios
      .post("https://api.talkie.team/login/google", {
        data: JSON.stringify(data),
      })
      .then((res) => {
        console.log(res);
        localStorage.setItem("profileData", JSON.stringify(res));
      })
      .catch((err) => console.error(err));
    // ...
  });
  //
  // const requestOptions={
  //     method: "POST",
  //     body: JSON.stringify(data),
  // };
  //  fetch("https:\/\/api.talkie.team\/login/google", requestOptions)
  // .then((response)=>{
  //     debugger
  //     console.log(response);
  //     // localStorage.setItem("token", res.idToken);
  //     localStorage.setItem("profileData", JSON.stringify(response))
  // })
  // })
  // .catch((error) => {
  //       // Handle Errors here.
  //       var errorCode = error.code;
  //       var errorMessage = error.message;
  //       // The email of the user's account used.
  //       var email = error.email;
  //       // The firebase.auth.AuthCredential type that was used.
  //       var credential = error.credential;
  //       // ...
  //     })
};

export const signUpWithGoogle = () => {
  auth.signInWithPopup(provider).then((result) => {
    /** @type {firebase.auth.OAuthCredential} */
    console.log(result);
    var credential = result.credential;

    // This gives you a Google Access Token. You can use it to access the Google API.
    var token = credential.idToken;
    var user = result.additionalUserInfo.profile;
    let userdata = {
      firstName: user.given_name,
      lastName: user.family_name,
      name: user.name,
      email: user.email,
      accessToken: token,
    };
    let data = {
      name: user.name,
      username: user.email,
      accessToken: token,
    };
    //   axios
    //     .post("login/google", { data: user }, { headers: token })
    //     .then((res) => console.log(res))
    //     .catch((err) => console.error(err));
    //   // ...
    // })
    //
    console.log(JSON.stringify(data));
    axios
      .post("https://api.talkie.team/register/google", {
        data: JSON.stringify(data),
      })
      .then((res) => {
        console.log(res);
        localStorage.setItem("profileData", JSON.stringify(res));
      })
      .catch((err) => console.error(err));
    // const requestOptions = {
    //   method: "POST",
    //   body: JSON.stringify(data),
    // };
    // fetch("https://api.talkie.team/register/google", requestOptions)
    //   .then((response) => {
    //     debugger;
    //     console.log(response);
    //     // localStorage.setItem("token", res.idToken);
    //     localStorage.setItem("profileData", JSON.stringify(response));
    //   })
    //   .catch((error) => {
    //     // Handle Errors here.
    //     var errorCode = error.code;
    //     var errorMessage = error.message;
    //     // The email of the user's account used.
    //     var email = error.email;
    //     // The firebase.auth.AuthCredential type that was used.
    //     var credential = error.credential;
    //     // ...
    //   });
  });
};

// export const signInWithGoogle = () => {
//   auth
//     .signInWithPopup(provider)
//     .then((result) => {
//       /** @type {firebase.auth.OAuthCredential} */
//       var credential = result.credential;

//       // This gives you a Google Access Token. You can use it to access the Google API.
//       var token = credential.accessToken;
//       // The signed-in user info.
//       var user = result.user;
//       axios
//         .post("login/google", { data: user }, { headers: token })
//         .then((res) => console.log(res))
//         .catch((err) => console.error(err));
//     })
//     .catch((error) => {
//       // Handle Errors here.
//       var errorCode = error.code;
//       var errorMessage = error.message;
//       // The email of the user's account used.
//       var email = error.email;
//       // The firebase.auth.AuthCredential type that was used.
//       var credential = error.credential;
//       // ...
//     });
// };

// export const signUpWithGoogle = () => {
//   auth
//     .signInWithPopup(provider)
//     .then((result) => {
//       /** @type {firebase.auth.OAuthCredential} */
//       var credential = result.credential;

//       // This gives you a Google Access Token. You can use it to access the Google API.
//       var token = credential.accessToken;
//       // The signed-in user info.
//       var user = result.user;
//       axios
//         .post("register/google", { data: user }, { headers: token })
//         .then((res) => console.log(res))
//         .catch((err) => console.error(err));

//     })
//     .catch((error) => {
//       // Handle Errors here.
//       var errorCode = error.code;
//       var errorMessage = error.message;
//       // The email of the user's account used.
//       var email = error.email;
//       // The firebase.auth.AuthCredential type that was used.
//       var credential = error.credential;
//       // ...
//     });
// };
