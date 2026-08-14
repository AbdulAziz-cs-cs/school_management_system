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
const opensignin = document.getElementById("signin");

opensignin.addEventListener("click", function () {
    window.location.href = "/login";
});