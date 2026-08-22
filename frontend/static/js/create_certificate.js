document.getElementById("searchbtn").addEventListener("click", async function () {

    let adm_no = document.getElementById("adm_no").value.trim();

    if (adm_no === "") {
        alert("Please enter Admission No");
        return;
    }

    try {

        let response = await fetch(`/students/by-adm/${adm_no}`);

        let data = await response.json();

        if (!response.ok || data.message === "Student not found") {
            alert("Student not found");
            return;
        }

        document.getElementById("student_name").value = data.name;
        document.getElementById("father_name").value = data.father_name;
        document.getElementById("dob").value = data.dob;
        document.getElementById("doj").value = data.doj;

    } catch (error) {

        console.error("Error retrieving student:", error);
        alert("Unable to retrieve student data");

    }
});