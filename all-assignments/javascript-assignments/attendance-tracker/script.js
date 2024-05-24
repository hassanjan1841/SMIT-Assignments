const users = [
  {
    name: "John Doe",
    fatherName: "Richard Doe",
    age: 16,
    rollNo: "101",
    class: "10th Grade",
  },
  {
    name: "Jane Smith",
    fatherName: "Robert Smith",
    age: 15,
    rollNo: "102",
    class: "9th Grade",
  },
  {
    name: "Michael Johnson",
    fatherName: "James Johnson",
    age: 17,
    rollNo: "103",
    class: "11th Grade",
  },
  {
    name: "Emily Davis",
    fatherName: "William Davis",
    age: 14,
    rollNo: "104",
    class: "8th Grade",
  },
  {
    name: "Jessica Brown",
    fatherName: "Charles Brown",
    age: 16,
    rollNo: "105",
    class: "10th Grade",
  },
  {
    name: "Daniel Wilson",
    fatherName: "Thomas Wilson",
    age: 15,
    rollNo: "106",
    class: "9th Grade",
  },
  {
    name: "Sarah Taylor",
    fatherName: "Andrew Taylor",
    age: 17,
    rollNo: "107",
    class: "11th Grade",
  },
  {
    name: "David Lee",
    fatherName: "George Lee",
    age: 14,
    rollNo: "108",
    class: "8th Grade",
  },
  {
    name: "Laura Martin",
    fatherName: "Paul Martin",
    age: 16,
    rollNo: "109",
    class: "10th Grade",
  },
  {
    name: "Kevin White",
    fatherName: "Mark White",
    age: 15,
    rollNo: "110",
    class: "9th Grade",
  },
  {
    name: "Anna Harris",
    fatherName: "Steven Harris",
    age: 17,
    rollNo: "111",
    class: "11th Grade",
  },
  {
    name: "Brian Clark",
    fatherName: "Edward Clark",
    age: 14,
    rollNo: "112",
    class: "8th Grade",
  },
  {
    name: "Sophia Lewis",
    fatherName: "Henry Lewis",
    age: 16,
    rollNo: "113",
    class: "10th Grade",
  },
  {
    name: "Christopher Walker",
    fatherName: "Frank Walker",
    age: 15,
    rollNo: "114",
    class: "9th Grade",
  },
  {
    name: "Grace Hall",
    fatherName: "Peter Hall",
    age: 17,
    rollNo: "115",
    class: "11th Grade",
  },
  {
    name: "Justin Allen",
    fatherName: "Patrick Allen",
    age: 14,
    rollNo: "116",
    class: "8th Grade",
  },
  {
    name: "Olivia Young",
    fatherName: "Bruce Young",
    age: 16,
    rollNo: "117",
    class: "10th Grade",
  },
  {
    name: "Nathan Hernandez",
    fatherName: "Larry Hernandez",
    age: 15,
    rollNo: "118",
    class: "9th Grade",
  },
  {
    name: "Mia King",
    fatherName: "Joe King",
    age: 17,
    rollNo: "119",
    class: "11th Grade",
  },
  {
    name: "Ethan Wright",
    fatherName: "Stanley Wright",
    age: 14,
    rollNo: "120",
    class: "8th Grade",
  },
  {
    name: "Ava Lopez",
    fatherName: "Timothy Lopez",
    age: 16,
    rollNo: "121",
    class: "10th Grade",
  },
  {
    name: "Jacob Scott",
    fatherName: "Chris Scott",
    age: 15,
    rollNo: "122",
    class: "9th Grade",
  },
  {
    name: "Samantha Green",
    fatherName: "Shawn Green",
    age: 17,
    rollNo: "123",
    class: "11th Grade",
  },
  {
    name: "Andrew Adams",
    fatherName: "Jason Adams",
    age: 14,
    rollNo: "124",
    class: "8th Grade",
  },
  {
    name: "Ella Baker",
    fatherName: "Ryan Baker",
    age: 16,
    rollNo: "125",
    class: "10th Grade",
  },
];

let presentCount = 0;
let absentCount = 0;
let leaveCount = 0;

document.addEventListener("DOMContentLoaded", () => {
  const studentsTable = document.getElementById("students-table");
  const presentCountElement = document.getElementById("present-count");
  const absentCountElement = document.getElementById("absent-count");
  const leaveCountElement = document.getElementById("leave-count");
  const notification = document.getElementById("notification");

  function updateStatistics() {
    presentCountElement.textContent = presentCount;
    absentCountElement.textContent = absentCount;
    leaveCountElement.textContent = leaveCount;
  }

  function showNotification(message) {
    notification.textContent = message;
    notification.style.display = "block";
    setTimeout(() => {
      notification.style.display = "none";
    }, 1500);
  }

  function animateButton(button, text) {
    const animation = document.createElement("div");
    animation.textContent = `+1 ${text}`;
    animation.className = "animation";
    button.appendChild(animation);
    setTimeout(() => {
      button.removeChild(animation);
    }, 1000);
  }

  function toggleStatus(row, type) {
    const presentBtn = row.querySelector(".present-btn");
    const absentBtn = row.querySelector(".absent-btn");
    const leaveBtn = row.querySelector(".leave-btn");

    const buttons = { present: presentBtn, absent: absentBtn, leave: leaveBtn };
    const counts = {
      present: presentCount,
      absent: absentCount,
      leave: leaveCount,
    };

    // Helper function to reset buttons and counts
    function resetButtons() {
      for (let key in buttons) {
        if (buttons[key].classList.contains("active")) {
          counts[key]--;
        }
        buttons[key].classList.remove("active");
        buttons[key].disabled = false;
      }
    }

    if (buttons[type].classList.contains("active")) {
      counts[type]--;
      buttons[type].classList.remove("active");
      showNotification(
        `${row.dataset.name} marked as not ${type.charAt(0).toUpperCase() + type.slice(1)}`,
      );
      // Enable all buttons
      for (let key in buttons) {
        buttons[key].disabled = false;
      }
    } else {
      resetButtons();
      counts[type]++;
      buttons[type].classList.add("active");
      showNotification(
        `${row.dataset.name} marked ${type.charAt(0).toUpperCase() + type.slice(1)}`,
      );
      // Disable other buttons
      for (let key in buttons) {
        if (key !== type) {
          buttons[key].disabled = true;
        }
      }
    }

    presentCount = counts.present;
    absentCount = counts.absent;
    leaveCount = counts.leave;
    updateStatistics();
  }

  function addStudentToTable(student) {
    const row = document.createElement("tr");
    row.dataset.name = student.name;
    row.innerHTML = `
      <td>${student.name}</td>
      <td>${student.fatherName}</td>
      <td>${student.age}</td>
      <td>${student.rollNo}</td>
      <td>${student.class}</td>
      <td>
        <button class="present-btn button">Present</button>
        <button class="absent-btn button ">Absent</button>
        <button class="leave-btn button">Leave</button>
      </td>
    `;

    row.querySelector(".present-btn").addEventListener("click", () => {
      toggleStatus(row, "present");
      animateButton(row.querySelector(".present-btn"), "Present");
    });

    row.querySelector(".absent-btn").addEventListener("click", () => {
      toggleStatus(row, "absent");
      animateButton(row.querySelector(".absent-btn"), "Absent");
    });

    row.querySelector(".leave-btn").addEventListener("click", () => {
      toggleStatus(row, "leave");
      animateButton(row.querySelector(".leave-btn"), "Leave");
    });

    studentsTable.appendChild(row);
  }

  users.forEach((user) => addStudentToTable(user));

  const addStudentBtn = document.getElementById("add-student-btn");
  const modal = document.getElementById("add-student-modal");
  const closeModal = document.getElementsByClassName("close")[0];

  addStudentBtn.onclick = function () {
    modal.style.display = "flex";
  };

  closeModal.onclick = function () {
    modal.style.display = "none";
  };

  window.onclick = function (event) {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  };

  const addStudentForm = document.getElementById("add-student-form");
  addStudentForm.onsubmit = function (event) {
    event.preventDefault();
    const newStudent = {
      name: document.getElementById("name").value,
      fatherName: document.getElementById("fatherName").value,
      age: document.getElementById("age").value,
      rollNo: document.getElementById("rollNo").value,
      class: document.getElementById("class").value,
    };

    addStudentToTable(newStudent);
    modal.style.display = "none";
    addStudentForm.reset();
    showNotification("New student added");
  };
});
