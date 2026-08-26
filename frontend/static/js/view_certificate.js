// Inside /static/js/view_certificate.js

document.addEventListener("DOMContentLoaded", () => {
  // 1. Retrieve data from sessionStorage
  const rawData = sessionStorage.getItem("current_student_certificate");

  if (!rawData) {
    alert("No student certificate data found. Redirecting to search page.");
    window.location.href = "/certificate";
    return;
  }

  const student = JSON.parse(rawData);

  // 2. Compute today's issue date (DD/MM/YYYY)
  const today = new Date();
  const day = String(today.getDate()).padStart(2, "0");
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const year = today.getFullYear();
  const formattedDate = `${day}/${month}/${year}`;

  // 3. Populate certificate fields
  document.getElementById("certName").innerText = student.name || "---";
  document.getElementById("certFather").innerText = student.father || "---";
  document.getElementById("certDoj").innerText = student.doj || "---";
  document.getElementById("certAdmNo").innerText = student.adm_no || "---";
  document.getElementById("certIssueDate").innerText = formattedDate;

  // 4. Save to Gallery / Download Handler
  const saveBtn = document.getElementById("savebtn");
  const certCard = document.getElementById("certificateCard");

  if (saveBtn) {
    saveBtn.addEventListener("click", async () => {
      if (typeof html2canvas === "undefined") {
        alert("html2canvas library is missing. Please check your internet connection.");
        return;
      }

      const originalText = saveBtn.innerText;
      saveBtn.innerText = "Saving...";
      saveBtn.disabled = true;

      try {
        const canvas = await html2canvas(certCard, {
          scale: 3,
          useCORS: true,
          allowTaint: true,
          backgroundColor: null
        });

        canvas.toBlob((blob) => {
          if (!blob) {
            alert("Failed to render certificate image.");
            return;
          }

          const fileName = `Certificate_GPS_${student.adm_no}_${student.name.replace(/\s+/g, "_")}.png`;
          const url = URL.createObjectURL(blob);
          const downloadLink = document.createElement("a");
          downloadLink.href = url;
          downloadLink.download = fileName;
          document.body.appendChild(downloadLink);
          downloadLink.click();
          document.body.removeChild(downloadLink);

          setTimeout(() => URL.revokeObjectURL(url), 1000);
        }, "image/png");
      } catch (err) {
        console.error("Save Error:", err);
        alert("Failed to save image: " + err.message);
      } finally {
        saveBtn.innerText = originalText;
        saveBtn.disabled = false;
      }
    });
  }
});


// Inside /static/js/view_certificate.js

const homeBtn = document.getElementById("backhome");

if (homeBtn) {
    homeBtn.addEventListener("click", () => {
        // Optional: Clean up the stored student session data
        sessionStorage.removeItem("current_student_certificate");

        // Redirect to root home page
        window.location.href = "/";
    });
}