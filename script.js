emailjs.send(
  "8gBSoDmVdWb8TdAoi0hKG",      // Service ID
  "YOUR_TEMPLATE_ID",            // Template ID
  {
    customer_name: "Test User",
    customer_phone: "1234567890",
    customer_email: "your_email@example.com",
    total_amount: "1000"
  }
).then(() => {
  alert("EmailJS test success!");
}).catch((error) => {
  console.error("EmailJS test error:", error);
});
