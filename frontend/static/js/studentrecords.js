let students = [];

// ADD STUDENT
document.getElementById("adbtn").addEventListener("click", addstudent);

async function addstudent() {
    let adm_no = document.getElementById("adm_no").value;
    let name = document.getElementById("name").value;
    let father_name = document.getElementById("father_name").value;
    let dob = document.getElementById("dateofbirth").value;
    let doj = document.getElementById("doj").value;

    if (name === "" || father_name === "" || dob === "" || doj === "" || adm_no === "") {
        alert("Please fill in all fields");
        return;
    }

    let student = {
        name: name,
        father_name: father_name,
        dob: dob,
        doj: doj,
        adm_no: adm_no, 
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
            adm_no: adm_no,
            name: name,
            father_name: father_name,
            dob: dob,
            doj: doj,
        });

        renderTable();

        document.getElementById("name").value = "";
        document.getElementById("father_name").value = "";
        document.getElementById("dateofbirth").value = "";
        document.getElementById("doj").value = "";
        document.getElementById("adm_no").value = "";

        // Reset date placeholder labels
        dateInputs.forEach(item => {
            item.input.classList.remove("has-value");
            item.label.style.display = "block";
        });

        alert("Student added successfully");
    } else {
        let error = await response.json();
        console.log("FastAPI error:", error);
        alert(JSON.stringify(error));
    }
}

// DISPLAY STUDENTS (Sequential 1, 2, 3...)
function renderTable() {
    let table = document.getElementById("tablebody");
    table.innerHTML = "";

    students.forEach((student, index) => {
        table.innerHTML += `
            <tr>
                <td>${index + 1}</td>
                <td>${student.adm_no}</td>
                <td>${student.name ? student.name.toUpperCase() : ''}</td>
                <td>${student.father_name ? student.father_name.toUpperCase() : ''}</td>
                <td>${student.dob || ''}</td>
                <td>${student.doj || ''}</td>
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

const dateInputs = [
    {
        input: document.getElementById("dateofbirth"),
        label: document.getElementById("dob-label")
    },
    {
        input: document.getElementById("doj"),
        label: document.getElementById("doj-label")
    }
];

dateInputs.forEach(item => {
    item.input.addEventListener("change", function () {
        if (this.value) {
            this.classList.add("has-value");
            item.label.style.display = "none";
        } else {
            this.classList.remove("has-value");
            item.label.style.display = "block";
        }
    });
});