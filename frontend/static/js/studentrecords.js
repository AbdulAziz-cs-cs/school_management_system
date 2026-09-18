let students = [];

// ADD STUDENT
document.getElementById("adbtn").addEventListener("click", addstudent);

async function addstudent() {
    let adm_no = document.getElementById("adm_no").value;
    let name = document.getElementById("name").value;

    let father_name = document.getElementById("father_name").value;
    let gender = document.getElementById("gender").value;
    let dob = document.getElementById("dateofbirth").value;
    let doj = document.getElementById("doj").value;

    if (name === "" || father_name === "" || dob === "" || doj === "" || adm_no === "") {
        alert("Please fill in all fields");
        return;
    }

    let student = {
        name: name,
        father_name: father_name,
        gender: gender,
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
            gender: gender,
            dob: dob,
            doj: doj,
        });

        renderTable();

        document.getElementById("name").value = "";
        document.getElementById("father_name").value = "";
        document.getElementById("gender").value = "";
        document.getElementById("dateofbirth").value = "";
        document.getElementById("doj").value = "";
        document.getElementById("adm_no").value = "";

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

function renderTable() {
    let table = document.getElementById("tablebody");
    table.innerHTML = "";

    students.forEach((student, index) => {
        const row = document.createElement("tr");
        row.dataset.id = student.id;
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${student.adm_no}</td>
            <td>${student.name ? student.name.toUpperCase() : ''}</td>
            <td>${student.gender || ''}</td>
            <td>${student.father_name ? student.father_name.toUpperCase() : ''}</td>
            <td>${student.dob || ''}</td>
            <td>${student.doj || ''}</td>
            <td class="action-cell">
                <button type="button" class="edit-btn" data-id="${student.id}">Edit</button>
                <button type="button" class="update-btn" data-id="${student.id}" disabled>Update</button>
            </td>
        `;

        const editButton = row.querySelector(".edit-btn");
        const updateButton = row.querySelector(".update-btn");

        editButton.addEventListener("click", function () {
            const rowId = Number(this.dataset.id);
            const selectedStudent = students.find(studentItem => Number(studentItem.id) === rowId);

            if (!selectedStudent) return;

            row.innerHTML = `
                <td>${students.findIndex(studentItem => Number(studentItem.id) === rowId) + 1}</td>
                <td><input type="number" value="${selectedStudent.adm_no}" data-field="adm_no"></td>
                <td><input type="text" value="${selectedStudent.name || ''}" data-field="name"></td>
                <td>
                    <select data-field="gender">
                        <option value="Male" ${selectedStudent.gender === 'Male' ? 'selected' : ''}>Male</option>
                        <option value="Female" ${selectedStudent.gender === 'Female' ? 'selected' : ''}>Female</option>
                    </select>
                </td>
                <td><input type="text" value="${selectedStudent.father_name || ''}" data-field="father_name"></td>
                <td><input type="date" value="${selectedStudent.dob || ''}" data-field="dob"></td>
                <td><input type="date" value="${selectedStudent.doj || ''}" data-field="doj"></td>
                <td class="action-cell">
                    <button type="button" class="update-btn" data-id="${selectedStudent.id}">Update</button>
                </td>
            `;

            const saveButton = row.querySelector(".update-btn");
            saveButton.addEventListener("click", async function () {
                const updatedStudent = {
                    adm_no: Number(row.querySelector('[data-field="adm_no"]').value),
                    name: row.querySelector('[data-field="name"]').value.trim(),
                    father_name: row.querySelector('[data-field="father_name"]').value.trim(),
                    dob: row.querySelector('[data-field="dob"]').value,
                    doj: row.querySelector('[data-field="doj"]').value,
                    gender: row.querySelector('[data-field="gender"]').value
                };

                if (!updatedStudent.name || !updatedStudent.father_name || !updatedStudent.dob || !updatedStudent.doj || !updatedStudent.adm_no) {
                    alert("Please fill in all fields");
                    return;
                }

                try {
                    const response = await fetch(`/students/${rowId}`, {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(updatedStudent)
                    });

                    if (!response.ok) {
                        const error = await response.json();
                        throw new Error(error.detail || "Failed to update student");
                    }

                    await loadStudents();
                } catch (error) {
                    alert(error.message);
                }
            });
        });

        updateButton.addEventListener("click", function () {
            alert("Please use the Edit button to update this student.");
        });

        table.appendChild(row);
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