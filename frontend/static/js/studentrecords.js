let students = [];


// ADD STUDENT
document.getElementById("adbtn").addEventListener("click", addstudent);

async function addstudent() {

    let name = document.getElementById("name").value;
    let father_name=document.getElementById("father_name").value;
    let dob = document.getElementById("dateofbirth").value;
    let doj = document.getElementById("doj").value;


    if (name === "" ||father_name=== "" || dob === "" ||  doj === "") {
        alert("Please fill in all fields");
        return;
    }


    let student = {
        name: name,
        father_name: father_name,
        dob: dob,
        doj: doj
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
            father_name: father_name,
            dob: dob,
            doj: doj
        });

        renderTable();


        document.getElementById("name").value = "";
        document.getElementById("father_name").value = "";
        document.getElementById("dateofbirth").value = "";
        document.getElementById("doj").value = "";


        alert("Student added successfully");

    } 
    else {
      let error = await response.json();
      console.log("FastAPI error:", error);
      alert(JSON.stringify(error));
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
                <td>${student.father_name.toUpperCase()}</td>
                <td>${student.dob}</td>
                <td>${student.doj}</td>
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