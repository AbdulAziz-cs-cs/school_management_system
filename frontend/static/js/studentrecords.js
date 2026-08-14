let students = [];


// ADD STUDENT
document.getElementById("adbtn").addEventListener("click", addstudent);

async function addstudent() {

    let name = document.getElementById("name").value;
    let dob = document.getElementById("dateofbirth").value;


    if (name === "" || dob === "") {
        alert("Please fill in all fields");
        return;
    }


    let student = {
        name: name,
        dob: dob
    };


    let response = await fetch("/students", {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify(student)
    });


    if (response.ok) {

        let data = await response.json();

        students.push({
            id: data.id,
            name: name,
            dob: dob
        });

        renderTable();


        document.getElementById("name").value = "";
        document.getElementById("dateofbirth").value = "";


        alert("Student added successfully");

    } else {

        alert("Failed to save student");
    }
}


// DISPLAY STUDENTS
function renderTable() {

    let table = document.getElementById("tablebody");

    table.innerHTML = "";


    students.forEach(student => {

        table.innerHTML += `
            <tr>
                <td>${student.name.toUpperCase()}</td>
                <td>${student.dob}</td>
            </tr>
        `;

    });
}


// LOAD STUDENTS FROM DATABASE
async function loadStudents() {

    let response = await fetch("/students");


    if (response.ok) {

        students = await response.json();

        renderTable();

    } else {

        console.log("Failed to load students");
    }
}


// LOAD STUDENTS WHEN PAGE OPENS
loadStudents();