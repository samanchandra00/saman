// ----------------------
// Initialize EmailJS
// ----------------------
(function () {
  emailjs.init("yeFL6dQ4P6hUiBvlE"); // Your Public Key
})();

// ----------------------
// Global Variables
// ----------------------
let grandTotal = 0;

// ----------------------
// Add Item to Table
// ----------------------
function addItem() {
  const productSelect = document.getElementById("product");
  const productName = productSelect.value;
  const price = Number(productSelect.selectedOptions[0].dataset.price);
  const qty = Number(document.getElementById("qty").value);

  if (qty <= 0) {
    alert("Quantity must be at least 1");
    return;
  }

  const total = price * qty;
  grandTotal += total;

  const tableBody = document.querySelector("#quoteTable tbody");
  const row = tableBody.insertRow();

  row.innerHTML = `
    <td>${productName}</td>
    <td>${price}</td>
    <td>${qty}</td>
    <td>${total}</td>
  `;

  document.getElementById("grandTotal").innerText = grandTotal;
}

// ----------------------
// Generate PDF & Send Email
// ----------------------
function generatePDF() {
  const name = document.getElementById("customerName").value || "N/A";
  const phone = document.getElementById("customerPhone").value || "N/A";
  const email = document.getElementById("customerEmail").value || "N/A";

  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  // ---------- CUSTOMER INFO ----------
  doc.setFontSize(12);
  doc.text("QUOTATION", 14, 20);

  doc.setFontSize(10);
  doc.text(`Customer Name: ${name}`, 14, 30);
  doc.text(`Phone: ${phone}`, 14, 36);
  doc.text(`Email: ${email}`, 14, 42);

  // ---------- QUOTE TABLE ----------
  doc.autoTable({
    startY: 50,
    html: "#quoteTable",
    theme: "grid",
    styles: { fontSize: 9 },
    headStyles: { fillColor: [0, 123, 255] }
  });

  // ---------- GRAND TOTAL ----------
  doc.setFontSize(11);
  doc.text(`Grand Total: ${grandTotal}`, 14, doc.lastAutoTable.finalY + 10);

  // ---------- SAVE PDF ----------
  doc.save("quotation.pdf");

  // ---------- SEND EMAIL ----------
  sendEmail(name, phone, email, grandTotal);
}

// ----------------------
// Send Email via EmailJS
// ----------------------
function sendEmail(name, phone, email, total) {
  emailjs.send(
    "8gBSoDmVdWb8TdAoi0hKG",      // Your Service ID
    "template_6frt8bi",            // Replace with your EmailJS Template ID
    {
      customer_name: name,
      customer_phone: phone,
      customer_email: email,
      total_amount: total
    }
  )
  .then(() => {
    alert("Quotation created and email sent successfully!");
  })
  .catch((error) => {
    console.error("Email error:", error);
    alert("PDF downloaded, but email failed.");
  });
}
