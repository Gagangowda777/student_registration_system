
const form = document.getElementById("form")
form.addEventListener("submit", function(){

    const name = document.getElementById("name").value;
    const Student_id = document.getElementById("Student_id").value;
    const mail_id = document.getElementById("mail_id").value;
    const contact_number = document.getElementById("contact_number").value;

    const newUser = {name, Student_id, mail_id, contact_number};

    let users = JSON.parse(localStorage.getItem("users")) || [];
    users.push(newUser);

    localStorage.setItem("users", JSON.stringify(users));
})



const button = document.getElementById("show_details")
button.addEventListener("click" , function(){
    const storedData = JSON.parse(localStorage.getItem("users"));
    console.log(storedData);
    // here add code to display the stored data on the webpage

})