document.getElementById("maincontent").style.width = "96%";
document.getElementById("maincontent").style.display = 'flex';

function openNav() {
    document.getElementById("mySidebar").style.width = "20%";
    document.getElementById("maincontent").style.width = "79%";
}

function closeNav() {
    document.getElementById("mySidebar").style.width = "0%";
    document.getElementById("maincontent").style.width = "96%";
    document.getElementById("maincontent").style.display = 'flex';
}

const totalImages = 132; // Total number of images
const imagesPerPage = 2; // Number of page numbers shown at a time

// Load image from the server
function loadImage(fileNumber) {
    let imgElement = document.getElementById('page-content');
    let filePath = `https://digi-magazine-server.vercel.app/pages/${fileNumber}.png`;
    imgElement.src = filePath;
}

function changePage(newFileNumber) {
    if (newFileNumber > totalImages) {
        let userChoice = confirm("You have reached the last page. Do you want to review or exit?\nClick OK to review (go to the first page) or Cancel to exit.");
        if (userChoice) {
            window.location.href = '/'; 
        } else {
            window.location.href = 'https://causmic.gndec.ac.in/team';
        }
        return;
    }
    if (newFileNumber < 1) return;
    // Update the current file number display
    document.getElementById('currentFileNumber').textContent = newFileNumber;
    // Load the new image and update pagination
    loadImage(newFileNumber);
    updatePagination(newFileNumber);
}
function updateCurrentPage(pageNumber) {
    // Update the content of the 'currentPage' button
    document.getElementById("currentFileNumber").textContent =  pageNumber;
    
    loadImage(pageNumber);
    updatePagination(pageNumber);
}


function updatePagination(currentPage) {
    const paginationContainer = document.getElementById('pagination');
    paginationContainer.innerHTML = ''; // Clear previous pagination buttons

    // Define the number of visible page numbers
    const pagesToShow = 4; // Show 4 page numbers at a time

    // Calculate start and end page
    let startPage = Math.floor((currentPage - 1) / pagesToShow) * pagesToShow + 1;
    let endPage = Math.min(startPage + pagesToShow - 1, totalImages);

    // Create Previous button for pagination
    if (currentPage > 1) {
        let prevButton = document.createElement('button');
        prevButton.textContent = '«'; // Previous arrow
        prevButton.classList.add('pagination-btn');
        prevButton.addEventListener('click', () => changePage(currentPage - 1));
        paginationContainer.appendChild(prevButton);
    }

    // Create page number buttons
    for (let i = startPage; i <= endPage; i++) {
        let pageButton = document.createElement('button');
        pageButton.textContent = i;
        pageButton.classList.add('pagination-btn');
        if (i === currentPage) {
            pageButton.disabled = true; // Highlight the current page
        }
        pageButton.addEventListener('click', () => {
            changePage(i);
        });
        paginationContainer.appendChild(pageButton);
    }

    // Create Next button
    if (currentPage < totalImages) {
        let nextButton = document.createElement('button');
        nextButton.textContent = '»'; // Next arrow
        nextButton.classList.add('pagination-btn');
        nextButton.addEventListener('click', () => changePage(currentPage + 1));
        paginationContainer.appendChild(nextButton);
    }
}

// Initial image load and pagination setup
loadImage(1);
updatePagination(1);

// Add event listeners for next and previous buttons
document.getElementById('nextButton').addEventListener('click', function() {
    let currentNumber = parseInt(document.getElementById('currentFileNumber').textContent);
    changePage(currentNumber + 1);
});

document.getElementById('prevButton').addEventListener('click', function() {
    let currentNumber = parseInt(document.getElementById('currentFileNumber').textContent);
    changePage(currentNumber - 1);
});




// Disable zooming with Ctrl + '+' and Ctrl + '-'
document.addEventListener('keydown', function(event) {
    if (event.ctrlKey && (event.key === '+' || event.key === '-')) {
        event.preventDefault();
    }
});

// Disable zooming with scroll wheel
window.addEventListener('wheel', function(event) {
    if (event.ctrlKey) {
        event.preventDefault();
    }
}, { passive: false });

