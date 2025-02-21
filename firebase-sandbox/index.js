  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-app.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries
  import {
    getDatabase,
    ref,
    child,
    get,
    push,
    set,
    onValue,
    serverTimestamp,
  } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-database.js";

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyCvpautjvEx4yq0GKTpQ7Hyrz4SmWLNa68",
    authDomain: "first-app-cf478.firebaseapp.com",
    projectId: "first-app-cf478",
    storageBucket: "first-app-cf478.firebasestorage.app",
    messagingSenderId: "972074850082",
    appId: "1:972074850082:web:3488b4a905588c39b3f77b"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

  const database = getDatabase();

  const messages = ref(database, "/messages");

  onValue(
    messages,
    (snapshot) => {
        // console.log(snapshot);
        const ul = document.getElementById("messages");
        ul.replaceChildren();
        snapshot.forEach((childSnapshot) => {
          const childKey = childSnapshot.key;
          const childData = childSnapshot.val();

          console.log(childKey);
          console.log(childData);

          const text = document.createTextNode(
            childData.message + " ~ " + childData.name
          );
           
          const li = document.createElement("li");
          li.appendChild(text);
          ul.appendChild(li);
        })
    }, {
        onlyOnce: false,
    }
  );
const add = document.getElementById("add");
add.addEventListener("click", function(e) {

  const name = document.getElementById("name");
  const message = document.getElementById("message");

  const newMessageRef = push(messages);

  set(newMessageRef, {
    name: name.value,
    message: message.value,
    createdAt: serverTimestamp(),
  });

  e.preventDefault();
});