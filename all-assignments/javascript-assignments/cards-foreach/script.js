var list = document.getElementById("list");
console.log("sdkfsdalkfjsld klsdfa");
var fruits = [
  {
    id: 1,
    name: "Mango",
    title: "Phalon ka badshah",
    types: ["Chounsa", "Sindhri", "Langra", "Anwaratol", "Almaas"],
    desc: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. ",
    image:
      "https://images.unsplash.com/photo-1591073113125-e46713c829ed?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8TWFuZ298ZW58MHx8MHx8fDA%3D",
  },
  {
    id: 2,
    name: "Watermelon",
    title: "Garmi ka dushman",
    types: ["Red Melon", "Green Melon"],
    desc: "warka dang, dolor sit amet consectetur adipisicing elit. ",
    image:
      "https://images.unsplash.com/photo-1621583441131-c8c190794970?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8d2F0ZXIlMjBtZWxvbnxlbnwwfHwwfHx8MA%3D%3D",
  },
  {
    id: 3,
    name: "Peach",
    title: "Juicy Peach",
    types: ["Swat Wala", "Quetta Wala"],
    desc: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. ",
    image:
      "https://images.unsplash.com/photo-1629828874514-c1e5103f2150?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8cGVhY2h8ZW58MHx8MHx8fDA%3D",
  },
  {
    id: 4,
    name: "Cherry",
    title: "Khoon banane wali",
    types: ["Black Cherry", "Red Cherry"],
    desc: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. ",
    image:
      "https://plus.unsplash.com/premium_photo-1688671921089-628b61dae149?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8Y2hlcnJ5fGVufDB8fDB8fHww",
  },
];

function showFruits(fruits) {
  list.innerHTML = "";
  fruits.forEach(function (fruit, index) {
    var ele = `<div class="lg:w-1/3 sm:w-1/2 p-4 rounded-md">
      <div class="flex relative min-h-[300px] rounded-md">
        <img alt="gallery" class="absolute inset-0 w-full h-full object-cover object-center rounded-md" src="${fruit.image}">
        <div class="px-8 py-10 relative z-10 w-full border-4 border-gray-200 bg-white opacity-0 hover:opacity-100 transition-[opacity] ease-in-out duration-800 fruit-item rounded-md">
          <h2 class="tracking-widest text-xl title-font font-medium text-indigo-500 mb-1">${fruit.name}</h2>
          <h1 class="title-font text-2xl font-medium text-gray-900 mb-3">${fruit.title}</h1>
          <p class="leading-relaxed">${fruit.types.join(" , ")}</p>
<p class="leading-relaxed">${fruit.desc.substring(0, 50)}</br><span class='more-desc hover:cursor-pointer text-white bg-slate-400 rounded-md px-2 py-1 my-1 inline-block' id=${index} onclick="showFruit(this)">more</span></p>
          <div class="my-4">
            <button onclick="updateDesc(this)" class="rounded-md px-6 py-3 bg-black text-white hover:bg-white hover:text-[#000] hover:border-2 hover:border-black" id=${index}>update</button>
<button class="rounded-md px-6 py-3 bg-red-500 text-white hover:bg-white hover:text-[#000] hover:border-2 hover:border-red-300 delete-btn" id=${index} onclick="deleteFruit(${index})">delete</button> 
          </div>
        </div>
      </div>
    </div>`;
    list.innerHTML += ele;
  });
}

showFruits(fruits);

const closeModalBtn = document.getElementById("closeModalBtn");
const myModal = document.getElementById("myModal");
const modalDesc = myModal.querySelector(".modal-desc");
const modalConfirmBtn = document.querySelector(".confirm");

closeModalBtn.addEventListener("click", () => {
  myModal.classList.add("hidden");
});

myModal.classList.add("hidden");

function updateDesc(ele) {
  myModal.classList.remove("hidden");
  var index = ele.id;
  let selectedFruitDesc = fruits[index];
  modalDesc.value = selectedFruitDesc.desc;
  modalConfirmBtn.addEventListener(
    "click",
    () => {
      var descPrompt = modalDesc.value;
      selectedFruitDesc.desc = descPrompt;
      list.innerHTML = "";
      myModal.classList.add("hidden");
      showFruits(fruits);
      showNotification("Description updated successfully");
    },
    { once: true },
  );
}

function deleteFruit(ele) {
  var index = ele.id;
  fruits.splice(index, 1);
  list.innerHTML = "";
  showFruits(fruits);
  showNotification("Fruit deleted successfully");
}

function showNotification(message) {
  const notification = document.getElementById("notification");
  const notificationText = document.getElementById("notificationText");
  const timer = document.getElementById("timer");

  notificationText.textContent = message;
  notification.classList.remove("right-[-100%]");
  notification.classList.add("right-4");

  // Start timer animation
  timer.style.animation = "none";
  setTimeout(() => {
    timer.style.animation = "";
  }, 10);

  // Hide notification after 1.5 seconds
  setTimeout(() => {
    notification.classList.remove("right-4");
    notification.classList.add("right-[-100%]");
  }, 1500);
}

// Select necessary elements
const fruitInfoModal = document.getElementById("fruitInfoModal");
const closeFruitInfoModalBtn = document.getElementById(
  "closeFruitInfoModalBtn",
);
const fruitName = fruitInfoModal.querySelector(".fruit-name");
const fruitImage = fruitInfoModal.querySelector(".fruit-image");
const fruitTitle = fruitInfoModal.querySelector(".fruit-title");
const fruitTypes = fruitInfoModal.querySelector(".fruit-types");
const fruitDesc = fruitInfoModal.querySelector(".fruit-desc");

// Function to show fruit information modal
function showFruit(ele) {
  //alert("sdafsadfsd");

  const fruit = fruits[ele.id];
  fruitName.textContent = fruit.name;
  fruitImage.src = fruit.image;
  fruitTitle.textContent = fruit.title;
  fruitTypes.textContent = fruit.types.join(", ");
  fruitDesc.textContent = fruit.desc;

  fruitInfoModal.classList.remove("hidden");
  fruitInfoModal.classList.add("flex");
}

// Event listener to close modal
closeFruitInfoModalBtn.addEventListener("click", () => {
  fruitInfoModal.classList.remove("flex");
  fruitInfoModal.classList.add("hidden");
});
