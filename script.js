// code to handle form submission and navigation
const form = document.getElementById("form");
if (form) {
  let editingIndex = null;
  // checking the format of inputs 
  function validateName(name) {
    const namePattern = /^[a-zA-Z\s]+$/;
    return namePattern.test(name);
  }

  function validateStudentId(id) {
    const idPattern = /^\d+$/;
    return idPattern.test(id);
  }

  function validateEmail(email) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  }

  function validateContactNumber(contact) {
    const contactPattern = /^\d{10,}$/;
    return contactPattern.test(contact);
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const Student_id = document.getElementById("Student_id").value.trim();
    const mail_id = document.getElementById("mail_id").value.trim();
    const contact_number = document
      .getElementById("contact_number")
      .value.trim();

    // Validation checks
    if (!name || !Student_id || !mail_id || !contact_number) {
      alert("All fields are required. Please fill in all fields.");
      return;
    }

    if (!validateName(name)) {
      alert("Student Name should contain only alphabetic characters.");
      return;
    }

    if (!validateStudentId(Student_id)) {
      alert("Student ID should contain only numbers.");
      return;
    }

    if (!validateEmail(mail_id)) {
      alert("Please enter a valid email address.");
      return;
    }

    if (!validateContactNumber(contact_number)) {
      alert("Contact Number should contain at least 10 digits.");
      return;
    }
    
    const newUser = { name, Student_id, mail_id, contact_number };

    let users = JSON.parse(localStorage.getItem("users")) || [];

    if (editingIndex !== null) {
      users[editingIndex] = newUser;
      editingIndex = null;
      alert("Record updated successfully!");
    } else {
      users.push(newUser);
      alert("Record added successfully!");
    }

    localStorage.setItem("users", JSON.stringify(users));
    form.reset();
    document.getElementById("form-title").innerText = "Registration Form";
    document.getElementById("submit-btn").value = "Submit";
  });

  const button = document.getElementById("show_details");
  button.addEventListener("click", function () {
    window.location.href = "records.html";
  });

  // Function to populate form for editing
  window.editRecord = function (index) {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const student = users[index];

    document.getElementById("name").value = student.name;
    document.getElementById("Student_id").value = student.Student_id;
    document.getElementById("mail_id").value = student.mail_id;
    document.getElementById("contact_number").value = student.contact_number;

    editingIndex = index;
    document.getElementById("form-title").innerText = "Edit Student Record";
    document.getElementById("submit-btn").value = "Update";
    document.getElementById("cancel-btn").style.display = "inline-block";
    form.scrollIntoView({ behavior: "smooth" });
  };

  // Function to cancel editing
  window.cancelEdit = function () {
    editingIndex = null;
    form.reset();
    document.getElementById("form-title").innerText = "Registration Form";
    document.getElementById("submit-btn").value = "Submit";
    document.getElementById("cancel-btn").style.display = "none";
  };

  // scrollbar 
  function updateScrollbar() {
    const body = document.body;
    if (body.scrollHeight > window.innerHeight) {
      body.style.overflowY = "scroll";
    } else {
      body.style.overflowY = "auto";
    }
  }

  window.addEventListener("resize", updateScrollbar);
  window.addEventListener("load", updateScrollbar);
  updateScrollbar();
} else {
  // updating data into diplay table 
  const storedData = JSON.parse(localStorage.getItem("users")) || [];
  const table = document.getElementById("studenttable");

  if (storedData.length > 0) {
    const rows = storedData
      .map(
        (student, index) => `
        <tr>
          <td>${student.name}</td>
          <td>${student.Student_id}</td>
          <td>${student.mail_id}</td>
          <td>${student.contact_number}</td>
          <td>
            <button class="action-btn edit-btn" onclick="editStudent(${index})">Edit</button>
            <button class="action-btn delete-btn" onclick="deleteStudent(${index})">Delete</button>
          </td>
        </tr>
      `
      )
      .join("");
    table.innerHTML += rows;
  } else {
    table.innerHTML +=
      '<tr><td colspan="5" style="text-align: center;">No student records found</td></tr>';
  }
  // button to come back to form page 
  const backButton = document.getElementById("back_button");
  backButton.addEventListener("click", function () {
    window.location.href = "index.html";
  });

  // Function to delete a record
  window.deleteStudent = function (index) {
    if (confirm("Are you sure you want to delete this record?")) {
      let users = JSON.parse(localStorage.getItem("users")) || [];
      users.splice(index, 1);
      localStorage.setItem("users", JSON.stringify(users));
      alert("Record deleted successfully!");
      location.reload();
    }
  };

  // Function to edit a record
  window.editStudent = function (index) {
    localStorage.setItem("editingIndex", index);
    window.location.href = "index.html";
  };

  // Dynamic scrollbar for records page
  function updateScrollbar() {
    const body = document.body;
    if (body.scrollHeight > window.innerHeight) {
      body.style.overflowY = "scroll";
    } else {
      body.style.overflowY = "auto";
    }
  }

  window.addEventListener("resize", updateScrollbar);
  window.addEventListener("load", updateScrollbar);
  updateScrollbar();
}
