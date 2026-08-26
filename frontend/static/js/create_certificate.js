// Inside /static/js/create_certificate.js

document.addEventListener("DOMContentLoaded", () => {
  const searchBtn = document.getElementById("searchbtn");
  const admInput = document.getElementById("adm_no");
  const studentNameInput = document.getElementById("student_name");
  const fatherNameInput = document.getElementById("father_name");
  const dobInput = document.getElementById("dob");
  const dojInput = document.getElementById("doj");
  const nextBtn = document.getElementById("nextBtn");

  // --- 1. Search & Autofill ---
  async function searchStudent() {
    const admNo = admInput.value.trim();
    if (!admNo) {
      alert("Please enter an admission number.");
      return;
    }

    try {
      const response = await fetch(`/students/by-adm/${encodeURIComponent(admNo)}`);
      if (!response.ok) throw new Error("Student not found.");

      const data = await response.json();

      if (data.message && data.message === "Student not found") {
        alert("Student not found for Admission No: " + admNo);
        studentNameInput.value = "";
        fatherNameInput.value = "";
        dobInput.value = "";
        dojInput.value = "";
        return;
      }

      studentNameInput.value = data.name || "";
      fatherNameInput.value = data.father_name || "";
      dobInput.value = data.dob || "";
      dojInput.value = data.doj || "";
    } catch (err) {
      console.error("Autofill Error:", err);
      alert("Failed to fetch student details.");
    }
  }

  if (searchBtn) searchBtn.addEventListener("click", searchStudent);
  if (admInput) {
    admInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        searchStudent();
      }
    });
  }

  // --- 2. Save to sessionStorage and Navigate ---
  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      const name = studentNameInput.value.trim();
      const father = fatherNameInput.value.trim();
      const adm = admInput.value.trim();
      const dob = dobInput.value.trim();
      const doj = dojInput.value.trim();

      if (!name) {
        alert("Please search and load a student first before proceeding.");
        return;
      }

      // Store student details as a JSON string
      const studentPayload = {
        adm_no: adm,
        name: name,
        father: father,
        dob: dob,
        doj: doj
      };
      sessionStorage.setItem("current_student_certificate", JSON.stringify(studentPayload));

      // Clean redirect (no query parameters in URL)
      window.location.href = "/view-certificate";
    });
  }
});