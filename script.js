// Simulated login functionality
const adminCredentials = {
    username: 'admin',
    password: 'Rachit@123',
};

const studentCredentials = {
    username: 'student',
    password: 'student@098',
};

document.addEventListener("DOMContentLoaded", function() {
    const logoutLink = document.getElementById('logoutLink');
    const loginError = document.getElementById('loginError');
    
    if (window.location.pathname === '/login.html') {
        // Handle login form submission
        const loginForm = document.getElementById('loginForm');
        
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;

            if ((username === adminCredentials.username && password === adminCredentials.password) ||
                (username === studentCredentials.username && password === studentCredentials.password)) {
                localStorage.setItem('loggedIn', true);
                localStorage.setItem('role', username === adminCredentials.username ? 'admin' : 'student');
                window.location.href = 'index.html';
            } else {
                loginError.textContent = 'Invalid username or password';
            }
        });
    } else if (window.location.pathname === '/index.html' || window.location.pathname === '/study_material.html' || window.location.pathname === '/contact.html' || window.location.pathname === '/admin.html') {
        // Redirect if not logged in
        if (!localStorage.getItem('loggedIn')) {
            window.location.href = 'login.html';
        }

        // Show appropriate content for admin or student
        const role = localStorage.getItem('role');
        
        if (role === 'admin' && window.location.pathname === '/study_material.html') {
            window.location.href = 'admin.html';
        }
        
        // Logout functionality
        logoutLink.addEventListener('click', function() {
            localStorage.removeItem('loggedIn');
            localStorage.removeItem('role');
            window.location.href = 'login.html';
        });
    }
});
function filterSubjects() {
    const group = document.getElementById('group').value;
    const subjectDropdown = document.getElementById('subject');
    const subjectListDiv = document.getElementById('subject-list');
    
    // Enable subject dropdown if group is selected
    subjectDropdown.disabled = group === 'none';

    let subjects = [];
    
    if (group === 'physics') {
        subjects = [
            { name: 'Physics', link: 'https://drive.google.com/file/d/14ZdMGbxKogjh_PWCoDKjLGFueZmbw7gD/view?usp=sharing' },
            { name: 'Electrical', link: 'https://drive.google.com/file/d/your-electrical-pdf-id/view?usp=sharing' },
            { name: 'Mathematics', link: 'https://drive.google.com/file/d/your-maths-pdf-id/view?usp=sharing' },
            { name: 'EVS', link: 'https://drive.google.com/file/d/your-evs-pdf-id/view?usp=sharing' },
            { name: 'PPS', link: 'https://drive.google.com/file/d/14iSwzyMYvuQC1KE3x9sWRqr6nz_JEh1A/view?usp=sharing' }
        ];
    } else if (group === 'chemistry') {
        subjects = [
            { name: 'Chemistry', link: 'https://drive.google.com/file/d/your-chemistry-pdf-id/view?usp=sharing' },
            { name: 'Mechanical', link: 'https://drive.google.com/file/d/your-mechanical-pdf-id/view?usp=sharing' },
            { name: 'Mathematics', link: 'https://drive.google.com/file/d/your-maths-pdf-id/view?usp=sharing' },
            { name: 'SoftSkills', link: 'https://drive.google.com/file/d/your-softskills-pdf-id/view?usp=sharing' }
        ];
    }

    // Clear the current subject options
    subjectDropdown.innerHTML = '<option value="none">Select Subject</option>';

    // Add new subject options based on the selected group
    subjects.forEach(subject => {
        const option = document.createElement('option');
        option.value = subject.name.toLowerCase();
        option.textContent = subject.name;
        subjectDropdown.appendChild(option);
    });

    // Listen for subject selection
    subjectDropdown.onchange = function() {
        const selectedSubject = subjectDropdown.value;
        displaySubjectLinks(subjects, selectedSubject);
    };
}

// Function to display the subject links with bullet points and "Click Here" button
function displaySubjectLinks(subjects, selectedSubject) {
    const subjectListDiv = document.getElementById('subject-list');
    const subject = subjects.find(s => s.name.toLowerCase() === selectedSubject);

    if (subject) {
        subjectListDiv.innerHTML = `
            <h3>${subject.name} Materials</h3>
            <ul>
                <li><span><strong>${subject.name} Study Material</strong></span><a href="${subject.link}" target="_blank" class="click-here">Click Here</a></li>
            </ul>
        `;
    } else {
        subjectListDiv.innerHTML = '<p>Select a subject to view study materials.</p>';
    }
}
