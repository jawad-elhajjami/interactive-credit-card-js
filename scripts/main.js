/*
* Author : EL HAJJAMI JAWAD
* Version : 1.0
* Title : Main scripts file 
*/


// elements
const form = document.getElementById("form");
const cc_logo = document.getElementById("cc_logo");

// inputs
const card_holder_name = document.getElementById("cardholder_name");
const card_number = document.getElementById("card_number");
const month = document.getElementById("month");
const year = document.getElementById("year");
const cvc = document.getElementById("cvc");

// text elements
const card_number_text = document.getElementById("card_number_text");
const card_holder_name_text = document.getElementById("card_holder_name_text");
const month_text = document.getElementById("month_text");
const year_text = document.getElementById("year_text");
const cvc_text = document.getElementById("cvc_text");


// default values
const DEFAULT_NAME = "JANE APPLEASED";
const DEFAULT_CVC = "000";
const DEFAULT_MM = "00";
const DEFAULT_YY = "00";

// main functions

// handle Name change
let previousValue = ""; // Track previous input
const changeName = () => {
    const currentValue = card_holder_name.value; // Get current input value

    // Clear the default name if the input has started
    if (currentValue.length > 0 && card_holder_name_text.textContent === DEFAULT_NAME) {
        card_holder_name_text.textContent = ""; // Clear the default name
    }

    // Reset to default name if input is empty
    if (currentValue === "") {
        card_holder_name_text.innerHTML = ""; // Clear all spans
        card_holder_name_text.textContent = DEFAULT_NAME;
        previousValue = ""; // Reset previous value
        return;
    }

    const newLength = currentValue.length;
    // const previousLength = previousValue.length;

    // Clear existing spans to start fresh
    card_holder_name_text.innerHTML = "";

    // Create spans for each character in the current value
    for (let i = 0; i < newLength; i++) {
        const span = document.createElement("span");
        span.textContent = currentValue[i]; // Set the character
        card_holder_name_text.appendChild(span); // Append the span to the text

        // If the character is a SPACE, add a 5px margin to the right
        if (currentValue[i] === " ") {
            span.style.marginRight = "5px";
        }
    }

    // Update previous value
    previousValue = currentValue; // Store the current value for future comparisons
};


// 3. change cvc
const changeCVC = () => {
    cvc_text.textContent = cvc.value;
}

// 4. render to default
const renderDefaultUI = () => {
    card_holder_name_text.textContent = DEFAULT_NAME;
    cvc_text.textContent = DEFAULT_CVC;
    month_text.textContent = DEFAULT_MM;    
    year_text.textContent = DEFAULT_YY;
    document.querySelectorAll('.number').forEach(num => {
        num.textContent = "#";
    })
}

// invoke error shake animation
const invokeError = (input) => {
    input.classList.add("error"); 
};

const resetFieldStyles = (input) => {
    input.classList.remove("error");
};



// event handlers
// 1. form submit event handler 
form.addEventListener('submit', (event) => {
    event.preventDefault();
    formSubmit();
})

// 2. card holder name change event handler
card_holder_name.addEventListener('input', (event) => {

    card_holder_name.value = card_holder_name.value.replace(/[^A-Za-z\s]/g, '');
    
    // limit input to 20 characters
    if(card_holder_name.value.length > 20){
        card_holder_name.value = card_holder_name.value.slice(0,20);
        invokeError(card_holder_name);
    }
    else{
        resetFieldStyles(card_holder_name);
        changeName();
    }
    
})

// 3. CVC change event handler
cvc.addEventListener('keyup', event => {
    // Allow only numeric values
    cvc.value = cvc.value.replace(/\D/g, '');

    // Limit input to 3 characters
    if (cvc.value.length > 3) {
        cvc.value = cvc.value.slice(0, 3);
        invokeError(cvc); // Invoke error if the limit is exceeded
    } else {
        resetFieldStyles(cvc);
        // Assign default CVC to text if input is empty
        if (cvc.value === "") {
            cvc_text.textContent = DEFAULT_CVC;
        } else {
            // Update the CVC text
            changeCVC();
        }
    }
});

// 4. date fields
// Year input change event handler
year.addEventListener('keyup', event => {
    // Allow only numeric values
    year.value = year.value.replace(/\D/g, '');

    // Limit input to 2 characters
    if (year.value.length > 2) {
        year.value = year.value.slice(0, 2);
        invokeError(year); // Invoke error if the limit is exceeded
    } else if (year.value === "") {
        year_text.textContent = DEFAULT_YY;
    } else {
        // Get current year (last two digits)
        let currentDate = new Date();
        let currentYear = currentDate.getFullYear();
        let currentYearLastTwo = currentYear.toString().slice(2, 4);

        // Check if the entered year is valid and not in the past
        if (parseInt(year.value) < parseInt(currentYearLastTwo)) {
            invokeError(year); // Invoke error if the year is in the past
            year_text.textContent = DEFAULT_YY; // Reset year text
        } else {
            year_text.textContent = String(year.value).padStart(2, '0');
            resetFieldStyles(year); // Reset styles if input is valid
        }
    }
});
// Month input change event handler
month.addEventListener('keyup', event => {
    // Allow only numeric values
    month.value = month.value.replace(/\D/g, '');

    // Limit input to 2 characters
    if (month.value.length > 2) {
        month.value = month.value.slice(0, 2);
        invokeError(month); // Invoke error if the limit is exceeded
    } else if (month.value === "") {
        month_text.textContent = DEFAULT_MM;
    } else {
        // Validate month range (1-12)
        if (month.value < 1 || month.value > 12) {
            invokeError(month); // Invoke error if the value is out of range
            month.value = ""; // Optionally reset the month value
            month_text.textContent = DEFAULT_MM; // Reset displayed month
        } else {
            month_text.textContent = String(month.value).padStart(2, '0');
            resetFieldStyles(month); // Reset styles if input is valid
        }
    }
});

// CARD NUMBER FIELD
let index = 0; // Track the current position in the card number
card_number.addEventListener('keyup', event => {
    let numbers = document.querySelectorAll('.number');

    // Allow only numeric values
    card_number.value = card_number.value.replace(/\D/g, '');

    // Reset index if the value is cleared
    if (card_number.value.length === 0) {
        index = 0;
        numbers.forEach(num => {
            num.textContent = '#'; // Reset displayed numbers to '#'
            num.classList.remove('animate'); // Remove animation class
        });
        return;
    }

    // Limit input to 16 digits
    if (card_number.value.length > 16) {
        card_number.value = card_number.value.slice(0, 16);
        invokeError(card_number); // Define this function to handle the error
    } else {
        resetFieldStyles(card_number); // Define this function to reset styles
    }

    // Update displayed digits
    for (let i = 0; i < 16; i++) {
        if (i < card_number.value.length) {
            numbers[i].textContent = card_number.value[i];

            // Add animation only for the most recently typed digit
            if (i === card_number.value.length - 1) {
                numbers[i].classList.add('animate'); // Add the animation class for the new digit

                // Remove the animation class after the animation completes
                setTimeout(() => {
                    numbers[i].classList.remove('animate');
                }, 300); // Adjust the duration as necessary to match your animation
            }
        } else {
            numbers[i].textContent = '#'; // Reset to '#' if no input
        }
    }

    // Display corresponding card logo
    const firstDigit = card_number.value[0];
    cc_logo.style.visibility = 'visible';
    if (firstDigit == "5" || firstDigit == "2") {
        cc_logo.setAttribute("src", "assets/icons/mastercard.png");
    } else if (firstDigit == "4") {
        cc_logo.setAttribute("src", "assets/icons/visa.png");
    } else if (firstDigit == "3") {
        cc_logo.setAttribute("src", "assets/icons/amex.png");
    } else {
        cc_logo.setAttribute("src", ""); // Clear logo if input is invalid 
        cc_logo.style.visibility = 'hidden';
    }

    // Handle backspace functionality
    if (event.key === 'Backspace') {
        index = Math.max(0, index - 1); // Decrement index but not below 0
    } else {
        index = Math.min(card_number.value.length, 16); // Update index based on input length
    }
});

// On page load
document.addEventListener('DOMContentLoaded', ()=>{
    renderDefaultUI();
})