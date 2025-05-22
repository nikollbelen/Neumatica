let currentModuleIndex = 0;
let currentLessonIndex = 0;

const sidebar = document.getElementById('sidebar');
const mainContent = document.getElementById('main-content');
const moduleList = document.getElementById('module-list');
const prevLessonBtn = document.getElementById('prev-lesson-btn');
const nextLessonBtn = document.getElementById('next-lesson-btn');
const globalProgressBar = document.getElementById('global-progress-bar');
const globalProgressText = document.getElementById('global-progress-text');

function initializeCourse() {
    renderSidebarNavigation();
    loadLesson(currentModuleIndex, currentLessonIndex);
    updateNavigationButtons();
    updateGlobalProgressBar();
}

function renderSidebarNavigation() {
    moduleList.innerHTML = '';
    courseContent.forEach((module, modIndex) => {
        const moduleItem = document.createElement('li');
        moduleItem.innerHTML = `
            <a href="#" class="module-item ${modIndex === currentModuleIndex ? 'active-module' : ''} ${modIndex === currentModuleIndex ? 'open' : ''}" data-module-index="${modIndex}">
                <i class="${module.icon}"></i> ${module.title}
            </a>
            <ul class="lesson-list ${modIndex === currentModuleIndex ? 'open' : ''}">
                ${module.lessons.map((lesson, lessIndex) => `
                    <li><a href="#" class="lesson-item ${modIndex === currentModuleIndex && lessIndex === currentLessonIndex ? 'active-lesson' : ''}" data-module-index="${modIndex}" data-lesson-index="${lessIndex}">${lesson.title}</a></li>
                `).join('')}
            </ul>
        `;
        moduleList.appendChild(moduleItem);

        // Toggle lesson list visibility
        const moduleLink = moduleItem.querySelector('.module-item');
        moduleLink.addEventListener('click', (e) => {
            e.preventDefault();
            const targetModuleIndex = parseInt(e.currentTarget.dataset.moduleIndex);
            if (targetModuleIndex === currentModuleIndex) {
                e.currentTarget.classList.toggle('open');
                e.currentTarget.nextElementSibling.classList.toggle('open');
            } else {
                // Close other modules if open
                document.querySelectorAll('.module-item.open').forEach(item => {
                    item.classList.remove('open');
                    if (item.nextElementSibling) item.nextElementSibling.classList.remove('open');
                });
                e.currentTarget.classList.add('open');
                e.currentTarget.nextElementSibling.classList.add('open');
                loadModule(targetModuleIndex); // Load first lesson of new module
            }
        });
    });

    // Add event listeners for lesson items
    document.querySelectorAll('.lesson-item').forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const modIndex = parseInt(e.currentTarget.dataset.module-index);
            const lessIndex = parseInt(e.currentTarget.dataset.lesson-index);
            loadLesson(modIndex, lessIndex);
        });
    });
}

function loadModule(modIndex) {
    currentModuleIndex = modIndex;
    currentLessonIndex = 0; // Load first lesson of the module
    loadLesson(currentModuleIndex, currentLessonIndex);
    renderSidebarNavigation(); // Re-render to update active states and open module
}


function loadLesson(modIndex, lessIndex) {
    currentModuleIndex = modIndex;
    currentLessonIndex = lessIndex;

    const lesson = courseContent[currentModuleIndex].lessons[currentLessonIndex];
    if (!lesson) {
        console.error("Lesson not found:", modIndex, lessIndex);
        return;
    }

    // Apply exit animation to current content
    const currentLessonSection = mainContent.querySelector('.lesson-section');
    if (currentLessonSection) {
        currentLessonSection.classList.remove('active');
        currentLessonSection.style.transform = 'translateX(-100%)'; // Slide out left
        currentLessonSection.style.opacity = '0';
        setTimeout(() => {
            renderLessonContent(lesson);
        }, 500); // Wait for animation to finish
    } else {
        renderLessonContent(lesson);
    }

    // Update active state in sidebar
    document.querySelectorAll('.lesson-item').forEach(item => item.classList.remove('active-lesson'));
    document.querySelector(`[data-module-index="${modIndex}"][data-lesson-index="${lessIndex}"]`).classList.add('active-lesson');

    document.querySelectorAll('.module-item').forEach(item => item.classList.remove('active-module'));
    document.querySelector(`[data-module-index="${modIndex}"]`).classList.add('active-module');

    updateNavigationButtons();
    updateGlobalProgressBar();
}

function renderLessonContent(lesson) {
    mainContent.innerHTML = `
        <section class="lesson-section" id="lesson-${lesson.id}">
            <h2 class="lesson-title">${lesson.title}</h2>
            ${lesson.content}
        </section>
        <div class="lesson-navigation">
            <button class="nav-button prev-button" id="prev-lesson-btn"><i class="fas fa-chevron-left"></i> Anterior</button>
            <button class="nav-button next-button" id="next-lesson-btn">Siguiente <i class="fas fa-chevron-right"></i></button>
        </div>
    `;
    // Re-add event listeners for new buttons
    document.getElementById('prev-lesson-btn').addEventListener('click', navigateLesson);
    document.getElementById('next-lesson-btn').addEventListener('click', navigateLesson);

    // Apply enter animation
    setTimeout(() => {
        const newLessonSection = document.getElementById(`lesson-${lesson.id}`);
        if (newLessonSection) {
            newLessonSection.classList.add('active');
            newLessonSection.style.transform = 'translateX(0)';
            newLessonSection.style.opacity = '1';
        }
        // Initialize specific interactions after content is loaded
        initializeInteractions(); // IMPORTANT: Call this after content is loaded
    }, 50); // Small delay to ensure CSS transition applies
}


function navigateLesson(event) {
    let newModuleIndex = currentModuleIndex;
    let newLessonIndex = currentLessonIndex;

    if (event.currentTarget.id === 'prev-lesson-btn') {
        newLessonIndex--;
        if (newLessonIndex < 0) {
            newModuleIndex--;
            if (newModuleIndex < 0) {
                newModuleIndex = 0; // Stay at first lesson
                newLessonIndex = 0;
            } else {
                newLessonIndex = courseContent[newModuleIndex].lessons.length - 1; // Last lesson of prev module
            }
        }
    } else { // next-lesson-btn
        newLessonIndex++;
        if (newLessonIndex >= courseContent[newModuleIndex].lessons.length) {
            newModuleIndex++;
            if (newModuleIndex >= courseContent.length) {
                // Course finished - handle end of course (e.g., final evaluation)
                // Using a custom modal/message box instead of alert()
                showCustomMessage('¡Felicidades!', 'Has completado todas las lecciones disponibles en este curso. ¡Excelente trabajo!');
                return;
            } else {
                newLessonIndex = 0; // First lesson of next module
            }
        }
    }
    loadLesson(newModuleIndex, newLessonIndex);
}

function updateNavigationButtons() {
    prevLessonBtn.disabled = (currentModuleIndex === 0 && currentLessonIndex === 0);
    const lastModuleIndex = courseContent.length - 1;
    const lastLessonInLastModule = courseContent[lastModuleIndex].lessons.length - 1;
    nextLessonBtn.disabled = (currentModuleIndex === lastModuleIndex && currentLessonIndex === lastLessonInLastModule);
}

function updateGlobalProgressBar() {
    let totalLessons = 0;
    courseContent.forEach(module => {
        totalLessons += module.lessons.length;
    });

    let completedLessons = 0;
    for (let i = 0; i < currentModuleIndex; i++) {
        completedLessons += courseContent[i].lessons.length;
    }
    completedLessons += (currentLessonIndex + 1); // +1 because currentLessonIndex is 0-based

    const progressPercentage = (completedLessons / totalLessons) * 100;
    globalProgressBar.style.width = `${progressPercentage}%`;
    globalProgressText.textContent = `${Math.round(progressPercentage)}% Completado`;
}

// Custom Message Box (instead of alert)
function showCustomMessage(title, message) {
    const messageBox = document.createElement('div');
    messageBox.className = 'custom-message-box';
    messageBox.innerHTML = `
        <div class="message-content">
            <h3>${title}</h3>
            <p>${message}</p>
            <button class="message-button">Entendido</button>
        </div>
    `;
    document.body.appendChild(messageBox);

    messageBox.querySelector('.message-button').addEventListener('click', () => {
        document.body.removeChild(messageBox);
    });

    // Basic styling for the message box (add to styles.css)
    const style = document.createElement('style');
    style.innerHTML = `
        .custom-message-box {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.7);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 1000;
            opacity: 0;
            transition: opacity 0.3s ease-in-out;
        }
        .custom-message-box .message-content {
            background-color: var(--white);
            padding: 30px;
            border-radius: 8px;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
            text-align: center;
            max-width: 400px;
            transform: translateY(-20px);
            transition: transform 0.3s ease-in-out;
        }
        .custom-message-box.show {
            opacity: 1;
        }
        .custom-message-box.show .message-content {
            transform: translateY(0);
        }
        .custom-message-box h3 {
            color: var(--primary-blue);
            margin-bottom: 15px;
        }
        .custom-message-box p {
            margin-bottom: 25px;
            line-height: 1.6;
        }
        .custom-message-box .message-button {
            background-color: var(--secondary-blue);
            color: var(--white);
            border: none;
            padding: 10px 20px;
            border-radius: 5px;
            cursor: pointer;
            font-size: 1em;
            transition: background-color 0.3s ease;
        }
        .custom-message-box .message-button:hover {
            background-color: var(--primary-blue);
        }
    `;
    document.head.appendChild(style);

    setTimeout(() => {
        messageBox.classList.add('show');
    }, 10);
}


// Initial call
initializeCourse();