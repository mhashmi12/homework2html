 // Helper function to create error or pass messages
function validationMessage(isValid, errorMessage = '') {
    return isValid ? `<span style="color: green;">pass</span>` : `<span style="color: red;">ERROR: ${errorMessage}</span>`;
}

// Function to calculate today's date and 120 years ago
function setDateRange() {
    const today = new Date();
    const maxDate = today.toISOString().split('T')[0]; // today's date in YYYY-MM-DD format

    const minDate = new Date(today.setFullYear(today.getFullYear() - 120)).toISOString().split('T')[0]; // 120 years ago

    // Set the min and max attributes for the DOB field
    document.getElementById('dob').setAttribute('max', maxDate);
    document.getElementById('dob').setAttribute('min', minDate);
}
function reviewForm() {
    // Collect the input values
    const firstName = document.getElementById("firstName").value;
    const middleInitial = document.getElementById("middleInitial").value;
    const lastName = document.getElementById("lastName").value;
    const dob = document.getElementById("dob").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    const address1 = document.getElementById("address1").value;
    const address2 = document.getElementById("address2").value;
    const city = document.getElementById("city").value;
    const state = document.getElementById("state").value;
    const zip = document.getElementById("zip").value;

    // Validation checks
    const today = new Date();
    const dobDate = new Date(dob);
    const minDate = new Date(today.getFullYear() - 120, today.getMonth(), today.getDate()); // 120 years ago
    const dateValid = dobDate <= today && dobDate >= minDate;

    const zipValid = /^\d{5}(-\d{4})?$/.test(zip);
    const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const phoneValid = /^\d{3}-\d{3}-\d{4}$/.test(phone);

    // Checkboxes for diseases
    const diseases = [];
    const checkboxes = document.querySelectorAll('input[name="diseases"]:checked');
    checkboxes.forEach((checkbox) => {
        diseases.push(checkbox.value);
    });

    // Radio button for vaccinated
    const vaccinated = document.querySelector('input[name="vaccinated"]:checked');
    const vaccinatedValue = vaccinated ? vaccinated.value : 'No';

    // Slider for salary
    const salary = document.getElementById("salary").value;

    // Price range for home
    const minPrice = document.getElementById("minPrice").value;
    const maxPrice = document.getElementById("maxPrice").value;

    // User ID and passwords
    const userID = document.getElementById("userID").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    // Textarea for symptoms
    const symptoms = document.getElementById("symptoms").value;

    // Collect the radio button values for ownership and renting
    const ownHome = document.querySelector('input[name="ownHome"]:checked');
    const rentHome = document.querySelector('input[name="rentHome"]:checked');

    // Display the review in the #reviewArea div
    const reviewArea = document.getElementById("reviewArea");
    reviewArea.innerHTML = `
        <h3>Please Review Your Information:</h3>
        <p><strong>First Name:</strong> ${firstName} ${middleInitial} ${lastName} ${validationMessage(firstName && lastName)}</p>
        <p><strong>Date of Birth:</strong> ${dob} ${validationMessage(dateValid, 'Date must be between 120 years ago and today')}</p>
        <p><strong>Email:</strong> ${email} ${validationMessage(emailValid, 'Invalid email format')}</p>
        <p><strong>Phone Number:</strong> ${phone} ${validationMessage(phoneValid, 'Invalid phone format (000-000-0000)')}</p>
        <p><strong>Address Line 1:</strong> ${address1}</p>
        <p><strong>Address Line 2:</strong> ${address2}</p>
        <p><strong>City:</strong> ${city}</p>
        <p><strong>State:</strong> ${state}</p>
        <p><strong>Zip Code:</strong> ${zip} ${validationMessage(zipValid, 'Missing or invalid Zip Code')}</p>
        <p><strong>Diseases:</strong> ${diseases.join(', ')}</p>
        <p><strong>Vaccinated:</strong> ${vaccinatedValue}</p>
        <p><strong>Do you own your home?</strong> ${ownHome ? ownHome.value : 'Not selected'}</p>
        <p><strong>Do you rent your home?</strong> ${rentHome ? rentHome.value : 'Not selected'}</p>
        <p><strong>Desired Salary:</strong> $${salary}</p>
        <p><strong>Min Price:</strong> $${minPrice}</p>
        <p><strong>Max Price:</strong> $${maxPrice}</p>
        <p><strong>Symptoms:</strong> ${symptoms}</p>
        <p><strong>User ID:</strong> ${userID}</p>
        <p><strong>Password:</strong> ${password === confirmPassword ? '<span style="color: green;">Passwords Match</span>' : '<span style="color: red;">Passwords Do Not Match</span>'}</p>
    `;
}
