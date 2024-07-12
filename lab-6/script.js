document.addEventListener('DOMContentLoaded', function() {
    const homeContent = document.getElementById('home');
    const aboutContent = document.getElementById('about');
    const contactContent = document.getElementById('contact');
    
    const navLinks = document.querySelectorAll('nav ul li a');

    // Initially show home content and hide others
    showHome();

    // Event listener for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            const sectionId = link.getAttribute('href').substring(1); // Get section id from href attribute
            if (sectionId === 'home') {
                showHome();
            } else if (sectionId === 'about') {
                showAbout();
            } else if (sectionId === 'contact') {
                showContact();
            }
        });
    });

    function showHome() {
        homeContent.style.display = 'block';
        aboutContent.style.display = 'none';
        contactContent.style.display = 'none';
        window.scrollTo(0, 0); // Scroll to top
    }

    function showAbout() {
        homeContent.style.display = 'none';
        aboutContent.style.display = 'block';
        contactContent.style.display = 'none';
        window.scrollTo(0, 0); // Scroll to top
    }

    function showContact() {
        homeContent.style.display = 'none';
        aboutContent.style.display = 'none';
        contactContent.style.display = 'block';
        window.scrollTo(0, 0); // Scroll to top
    }
});

// Bubble sort function
function bubbleSort(arr) {
    let len = arr.length;
    for (let i = 0; i < len; i++) {
        for (let j = 0; j < len - 1 - i; j++) {
            if (arr[j] > arr[j + 1]) {
                let temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }
        }
    }
    return arr;
}

// Display sorted array
function displayArray(arr) {
    arrayDisplay.textContent = 'Sorted Array: ' + arr.join(', ');
}

// Event listener for sort button
sortButton.addEventListener('click', function() {
    const input = numberInput.value;
    if (input.trim() === "") {
        arrayDisplay.textContent = "Please enter some numbers.";
        return;
    }

    const array = input.split(',').map(num => parseFloat(num.trim())).filter(num => !isNaN(num));
    if (array.length === 0) {
        arrayDisplay.textContent = "Please enter valid numbers.";
        return;
    }

    const sortedArray = bubbleSort([...array]);
    displayArray(sortedArray);
});

// Event listener for contact form submission
contactForm.addEventListener('submit', function(event) {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    contactResponse.textContent = `Thank you for your message, ${email}. We will get back to you soon.`;
    contactForm.reset();
});
