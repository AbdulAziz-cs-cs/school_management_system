// Student Records
const openstudentrecords = document.getElementById("stdrecords");

openstudentrecords.addEventListener("click", function () {
    window.location.href = "/students-page";
});


// Certificate Creation
const opencertificatecreation = document.getElementById("certificatecreation");

opencertificatecreation.addEventListener("click", function () {
    window.location.href = "/certificate";
});


// Certificate History
const openhistory = document.getElementById("history");

openhistory.addEventListener("click", function () {
    window.location.href = "/certificate-history";
});


// Sign In
// const opensignin = document.getElementById("signin");

// opensignin.addEventListener("click", function () {
//     window.location.href = "/login";
// });


// async function loadStudentCount() {

//     try {

//         let response = await fetch("/students/count");

//         if (!response.ok) {
//             throw new Error("Failed to load student count");
//         }

//         let data = await response.json();

//         document.getElementById("student-count").textContent = data.count;

//     } catch (error) {

//         console.error("Error loading student count:", error);

//     }
// }


// loadStudentCount();
// VxysUXgWEGQ9wi7s