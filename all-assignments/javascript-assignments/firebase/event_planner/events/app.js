import {
  getDownloadURL,
  ref,
  storage,
  uploadBytes,
  db,
  collection,
  addDoc,
} from "../utils/firebaseConfig";

const eventAddForm = document.getElementById("event-add-form");

eventAddForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const eventInfo = {
    title: e.target[0].value,
    date: e.target[1].value,
    time: e.target[2].value,
    location: e.target[3].value,
    description: e.target[4].value,
    category: e.target[5].value,
    image: e.target[6].files[0],
  };

  const imageRef = ref(storage, `events/${eventInfo.image.name}`);
  uploadBytes(imageRef, eventInfo.image).then((snapshot) => {
    console.log("Uploaded a blob or file!");
    getDownloadURL(snapshot.ref).then((downloadURL) => {
      console.log("File available at", downloadURL);
      eventInfo.image = downloadURL;
      const eventCollection = collection(db, "events");
      addDoc(eventCollection, eventInfo).then((dekty) => {
        console.log("Document written with ID: ", dekty.id);
        window.location.href = "/";
      });
    });
  });
});
