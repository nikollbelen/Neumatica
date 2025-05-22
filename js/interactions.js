// --- General Interaction Initializer ---
function initializeInteractions() {
    // --- Flip Card Logic ---
    document.querySelectorAll('.flip-card').forEach(card => {
        card.removeEventListener('click', toggleFlipCard); // Remove old listener to prevent duplicates
        card.addEventListener('click', toggleFlipCard);
    });

    // --- Drag & Drop Quiz (Parts Identification) Logic ---
    const cylinderPartsQuiz = document.getElementById('cylinder-parts-quiz');
    if (cylinderPartsQuiz) {
        setupDragAndDropQuiz(cylinderPartsQuiz.id);
    }

    // --- Force Simulator Logic ---
    const forceSimulator = document.querySelector('.force-simulator');
    if (forceSimulator) {
        setupForceSimulator();
    }

    // --- Hotspot Interaction Logic ---
    const cylinderHotspotsContainer = document.getElementById('cylinder-hotspots');
    if (cylinderHotspotsContainer) {
        setupHotspotInteraction(cylinderHotspotsContainer.id);
    }

    // --- Categorization Quiz Logic ---
    const juntasCategorizationQuiz = document.getElementById('juntas-categorization-quiz');
    if (juntasCategorizationQuiz) {
        setupCategorizationQuiz(juntasCategorizationQuiz.id);
    }
}

// --- Flip Card Implementation ---
function toggleFlipCard(event) {
    event.currentTarget.classList.toggle('flipped');
}

// --- Generic Drag & Drop Quiz Implementation (for cylinder parts) ---
let draggedItem = null;

function setupDragAndDropQuiz(quizId) {
    const quizElement = document.getElementById(quizId);
    const draggableItems = quizElement.querySelectorAll('.draggable-item');
    const dropTargets = quizElement.querySelectorAll('.drop-target');
    const feedbackContainer = quizElement.querySelector('.feedback-container');
    const verifyButton = quizElement.querySelector('.nav-button'); // Assuming this is the initial verify button

    // Reset previous state if any
    draggableItems.forEach(item => {
        item.style.display = 'block'; // Ensure it's visible
        item.classList.remove('dragging');
    });
    dropTargets.forEach(target => {
        target.innerHTML = ''; // Clear content
        target.classList.remove('correct', 'incorrect', 'filled', 'error', 'hovered');
        delete target.dataset.currentWord;
    });
    if (feedbackContainer) {
        feedbackContainer.style.display = 'none';
        // Remove any existing retry button
        const existingRetryButton = feedbackContainer.querySelector('.retry-button');
        if (existingRetryButton) {
            feedbackContainer.removeChild(existingRetryButton);
        }
    }


    // Ensure verify button is active and visible for a new attempt
    if (verifyButton) {
        verifyButton.style.display = 'block';
        // Re-attach the click listener to avoid duplicates if setup is called multiple times
        verifyButton.onclick = null; // Clear previous listener
        verifyButton.onclick = () => checkDragAndDropQuiz(quizId);
    }

    draggableItems.forEach(item => {
        // Remove old listeners before adding new ones
        item.removeEventListener('dragstart', handleDragStart);
        item.removeEventListener('dragend', handleDragEnd);

        item.addEventListener('dragstart', handleDragStart);
        item.addEventListener('dragend', handleDragEnd);
    });

    dropTargets.forEach(target => {
        // Remove old listeners before adding new ones
        target.removeEventListener('dragover', handleDragOver);
        target.removeEventListener('dragleave', handleDragLeave);
        target.removeEventListener('drop', handleDrop);

        target.addEventListener('dragover', handleDragOver);
        target.addEventListener('dragleave', handleDragLeave);
        target.addEventListener('drop', handleDrop);
    });
}

function handleDragStart(e) {
    draggedItem = e.target;
    e.dataTransfer.setData('text/plain', e.target.dataset.word);
    setTimeout(() => e.target.classList.add('dragging'), 0);
}

function handleDragEnd(e) {
    e.target.classList.remove('dragging');
    draggedItem = null;
}

function handleDragOver(e) {
    e.preventDefault(); // Allow drop
    e.currentTarget.classList.add('hovered');
}

function handleDragLeave(e) {
    e.currentTarget.classList.remove('hovered');
}

function handleDrop(e) {
    e.preventDefault();
    const target = e.currentTarget;
    target.classList.remove('hovered');
    const data = e.dataTransfer.getData('text/plain');

    // If the target already has an item, return it to the draggable area
    if (target.dataset.currentWord) {
        const previousItem = document.querySelector(`.draggable-item[data-word="${target.dataset.currentWord}"]`);
        if (previousItem) {
            previousItem.style.display = 'block';
        }
    }

    target.textContent = data; // Place the word in the target
    target.dataset.currentWord = data; // Store it for checking
    if (draggedItem) {
        draggedItem.style.display = 'none'; // Hide the dragged item from its original spot
    }
}

function checkDragAndDropQuiz(quizId) {
    const quizElement = document.getElementById(quizId);
    const dropTargets = quizElement.querySelectorAll('.drop-target');
    const feedbackContainer = quizElement.querySelector('.feedback-container');
    const verifyButton = quizElement.querySelector('.nav-button'); // The initial verify button
    let allCorrect = true;
    let feedbackMessages = [];

    dropTargets.forEach(target => {
        const correctWord = target.dataset.correct;
        const currentWord = target.dataset.currentWord;

        target.classList.remove('correct', 'incorrect', 'filled', 'error'); // Reset visual feedback
        if (currentWord && currentWord === correctWord) {
            target.classList.add('filled', 'correct');
        } else {
            target.classList.add('error');
            allCorrect = false;
            // Personalized feedback for specific errors
            if (!currentWord) {
                feedbackMessages.push(`El recuadro para "${correctWord}" está vacío.`);
            } else {
                feedbackMessages.push(`"${currentWord}" no es la parte correcta para este recuadro. Se esperaba "${correctWord}".`);
            }
        }
    });

    feedbackContainer.style.display = 'flex'; // Show feedback container
    feedbackContainer.classList.remove('correct', 'incorrect');
    if (allCorrect) {
        feedbackContainer.classList.add('correct');
        feedbackContainer.innerHTML = '<i class="fas fa-check-circle"></i> ¡Correcto! Has identificado todas las partes correctamente.';
        if (verifyButton) verifyButton.style.display = 'none'; // Hide verify button on success
    } else {
        feedbackContainer.classList.add('incorrect');
        feedbackContainer.innerHTML = `<i class="fas fa-times-circle"></i> ¡Incorrecto! ${feedbackMessages.join(' ')} <br>Intenta de nuevo.`;
        // Add "Try Again" button
        const retryButton = document.createElement('button');
        retryButton.className = 'nav-button retry-button'; // Added specific class
        retryButton.textContent = 'Reintentar';
        // retryButton.style.marginTop = '10px'; // This can be handled by CSS
        retryButton.onclick = () => setupDragAndDropQuiz(quizId); // Reset quiz
        feedbackContainer.appendChild(retryButton);
        if (verifyButton) verifyButton.style.display = 'none'; // Hide verify button when retry is available
    }
}


// --- Force Simulator Implementation ---
function setupForceSimulator() {
    const pressureInput = document.getElementById('pressure-input');
    const diameterInput = document.getElementById('diameter-input');
    const pressureValueSpan = document.getElementById('pressure-value');
    const diameterValueSpan = document.getElementById('diameter-value');
    const areaResultSpan = document.getElementById('area-result');
    const forceResultSpan = document.getElementById('force-result');

    // Ensure elements exist before adding listeners
    if (!pressureInput || !diameterInput || !pressureValueSpan || !diameterValueSpan || !areaResultSpan || !forceResultSpan) {
        return;
    }

    function updateForceCalculation() {
        const P = parseFloat(pressureInput.value);
        const D = parseFloat(diameterInput.value);
        const R = D / 2; // Radio

        // Fórmula del área de un círculo: Pi * R^2
        const A = Math.PI * Math.pow(R, 2);
        const F = P * A;

        pressureValueSpan.textContent = P.toFixed(1);
        diameterValueSpan.textContent = D.toFixed(1);
        areaResultSpan.textContent = A.toFixed(2);
        forceResultSpan.textContent = F.toFixed(2);
    }

    // Remove old listeners before adding new ones
    pressureInput.removeEventListener('input', updateForceCalculation);
    diameterInput.removeEventListener('input', updateForceCalculation);

    pressureInput.addEventListener('input', updateForceCalculation);
    diameterInput.addEventListener('input', updateForceCalculation);

    // Initial calculation
    updateForceCalculation();
}

// --- Hotspot Interaction Implementation ---
function setupHotspotInteraction(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const hotspots = container.querySelectorAll('.hotspot');
    const infoBoxes = container.querySelectorAll('.hotspot-info');
    const svgElement = container.querySelector('svg'); // Get the SVG element

    // Hide all info boxes and remove all highlights initially
    infoBoxes.forEach(box => box.classList.remove('active'));
    svgElement.querySelectorAll('.highlight-overlay').forEach(overlay => overlay.classList.remove('active-highlight'));


    hotspots.forEach(hotspot => {
        // Remove old listeners before adding new ones
        hotspot.removeEventListener('click', handleHotspotClick);
        hotspot.removeEventListener('mouseenter', handleHotspotHover);
        hotspot.removeEventListener('mouseleave', handleHotspotLeave);

        hotspot.addEventListener('click', handleHotspotClick);
        hotspot.addEventListener('mouseenter', handleHotspotHover);
        hotspot.addEventListener('mouseleave', handleHotspotLeave);
    });
}

function positionHotspotInfoBox(hotspotElement, infoBoxElement, containerRect) {
    const hotspotRect = hotspotElement.getBoundingClientRect();
    const padding = 15; // Padding from hotspot/edges

    let targetTop, targetLeft;

    // Try to position to the right of the hotspot
    targetLeft = (hotspotRect.left - containerRect.left) + hotspotRect.width + padding;
    targetTop = (hotspotRect.top - containerRect.top) + (hotspotRect.height / 2) - (infoBoxElement.offsetHeight / 2);

    // Check if it goes off-screen to the right
    if (targetLeft + infoBoxElement.offsetWidth > containerRect.width) {
        // Try positioning to the left
        targetLeft = (hotspotRect.left - containerRect.left) - infoBoxElement.offsetWidth - padding;
        // If it still goes off-screen to the left (or not enough space), fallback to below
        if (targetLeft < 0) {
            targetLeft = (hotspotRect.left - containerRect.left) + (hotspotRect.width / 2) - (infoBoxElement.offsetWidth / 2);
            targetTop = (hotspotRect.top - containerRect.top) + hotspotRect.height + padding;
        }
    }

    // Ensure it doesn't go off-screen vertically
    if (targetTop < 0) {
        targetTop = 0;
    }
    if (targetTop + infoBoxElement.offsetHeight > containerRect.height) {
        targetTop = containerRect.height - infoBoxElement.offsetHeight;
    }

    infoBoxElement.style.top = `${targetTop}px`;
    infoBoxElement.style.left = `${targetLeft}px`;
}


function handleHotspotClick(event) {
    const infoId = event.currentTarget.dataset.infoId;
    const infoBox = document.getElementById(`info-${infoId}`);
    const svgHighlightElement = document.getElementById(`highlight-${infoId}`);
    const svgElement = event.currentTarget.closest('.hotspot-container').querySelector('svg');
    const containerRect = event.currentTarget.closest('.hotspot-container').getBoundingClientRect();


    // Remove all existing highlights and hide all info boxes first
    document.querySelectorAll('.hotspot-info').forEach(box => box.classList.remove('active'));
    svgElement.querySelectorAll('.highlight-overlay').forEach(overlay => overlay.classList.remove('active-highlight'));


    // Toggle current info box and highlight
    if (infoBox) {
        infoBox.classList.toggle('active');
        if (infoBox.classList.contains('active')) {
            positionHotspotInfoBox(event.currentTarget, infoBox, containerRect);
        }
    }
    if (svgHighlightElement) {
        svgHighlightElement.classList.toggle('active-highlight');
    }
}

function handleHotspotHover(event) {
    const infoId = event.currentTarget.dataset.infoId;
    const infoBox = document.getElementById(`info-${infoId}`);
    const svgHighlightElement = document.getElementById(`highlight-${infoId}`);
    const svgElement = event.currentTarget.closest('.hotspot-container').querySelector('svg');
    const containerRect = event.currentTarget.closest('.hotspot-container').getBoundingClientRect();


    // Remove all existing highlights and hide all info boxes first
    document.querySelectorAll('.hotspot-info').forEach(box => box.classList.remove('active'));
    svgElement.querySelectorAll('.highlight-overlay').forEach(overlay => overlay.classList.remove('active-highlight'));

    if (infoBox) {
        positionHotspotInfoBox(event.currentTarget, infoBox, containerRect);
        infoBox.classList.add('active');
    }
    if (svgHighlightElement) {
        svgHighlightElement.classList.add('active-highlight');
    }
}

function handleHotspotLeave(event) {
    const infoId = event.currentTarget.dataset.infoId;
    const infoBox = document.getElementById(`info-${infoId}`);
    const svgHighlightElement = document.getElementById(`highlight-${infoId}`);

    if (infoBox) {
        infoBox.classList.remove('active');
    }
    if (svgHighlightElement) {
        svgHighlightElement.classList.remove('active-highlight');
    }
}


// --- Categorization Quiz Implementation ---
function setupCategorizationQuiz(quizId) {
    const quizElement = document.getElementById(quizId);
    const draggableItems = quizElement.querySelectorAll('.draggable-category-item');
    const dropTargets = quizElement.querySelectorAll('.category-drop-target');
    const feedbackContainer = quizElement.querySelector('.categorization-feedback');
    const verifyButton = quizElement.querySelector('.nav-button'); // The initial verify button

    // Reset state
    draggableItems.forEach(item => {
        item.style.display = 'block'; // Make sure all items are visible
        item.classList.remove('dragging');
        // If item was moved from a target, put it back in drag area
        if (item.parentElement && item.parentElement.classList.contains('dropped-items-list')) {
            quizElement.querySelector('.items-to-drag').appendChild(item);
        }
    });
    dropTargets.forEach(target => {
        target.querySelector('.dropped-items-list').innerHTML = ''; // Clear dropped items
        target.classList.remove('correct', 'incorrect', 'hovered');
    });
    if (feedbackContainer) {
        feedbackContainer.style.display = 'none';
        // Remove any existing retry button
        const existingRetryButton = feedbackContainer.querySelector('.retry-button');
        if (existingRetryButton) {
            feedbackContainer.removeChild(existingRetryButton);
        }
    }


    // Ensure verify button is active and visible for a new attempt
    if (verifyButton) {
        verifyButton.style.display = 'block';
        // Re-attach the click listener to avoid duplicates if setup is called multiple times
        verifyButton.onclick = null; // Clear previous listener
        verifyButton.onclick = () => checkCategorizationQuiz(quizId);
    }


    draggableItems.forEach(item => {
        item.removeEventListener('dragstart', handleCategoryDragStart);
        item.removeEventListener('dragend', handleCategoryDragEnd);
        item.addEventListener('dragstart', handleCategoryDragStart);
        item.addEventListener('dragend', handleCategoryDragEnd);
    });

    dropTargets.forEach(target => {
        target.removeEventListener('dragover', handleCategoryDragOver);
        target.removeEventListener('dragleave', handleCategoryDragLeave);
        target.removeEventListener('drop', handleCategoryDrop);
        target.addEventListener('dragover', handleCategoryDragOver);
        target.addEventListener('dragleave', handleCategoryDragLeave);
        target.addEventListener('drop', handleCategoryDrop);
    });
}

function handleCategoryDragStart(e) {
    draggedItem = e.target;
    e.dataTransfer.setData('text/plain', e.target.dataset.item);
    e.dataTransfer.setData('text/category', e.target.dataset.correctCategory);
    setTimeout(() => e.target.classList.add('dragging'), 0);
}

function handleCategoryDragEnd(e) {
    e.target.classList.remove('dragging');
    draggedItem = null;
}

function handleCategoryDragOver(e) {
    e.preventDefault();
    e.currentTarget.classList.add('hovered');
}

function handleCategoryDragLeave(e) {
    e.currentTarget.classList.remove('hovered');
}

function handleCategoryDrop(e) {
    e.preventDefault();
    const target = e.currentTarget;
    target.classList.remove('hovered');
    const itemName = e.dataTransfer.getData('text/plain');
    const correctCategory = e.dataTransfer.getData('text/category');

    const droppedItemsList = target.querySelector('.dropped-items-list');

    // Check if the item already exists in any drop target to prevent duplicates
    const existingItem = document.querySelector(`.draggable-category-item[data-item="${itemName}"]`);
    if (existingItem && existingItem.parentElement && existingItem.parentElement.classList.contains('dropped-items-list')) {
        // If it's already in a list, remove it from there first
        existingItem.parentElement.removeChild(existingItem);
    }
    
    const listItem = document.createElement('li');
    listItem.textContent = itemName;
    listItem.dataset.correctCategory = correctCategory; // Store correct category on the dropped item
    listItem.dataset.item = itemName; // Store item name for re-dragging if needed
    droppedItemsList.appendChild(listItem);

    if (draggedItem) {
        draggedItem.style.display = 'none'; // Hide the original draggable item
    }
}

function checkCategorizationQuiz(quizId) {
    const quizElement = document.getElementById(quizId);
    const dropTargets = quizElement.querySelectorAll('.category-drop-target');
    const feedbackContainer = quizElement.querySelector('.categorization-feedback');
    const verifyButton = quizElement.querySelector('.nav-button'); // The initial verify button
    let allCorrect = true;
    let feedbackMessages = [];

    // Map of correct items for each category
    const correctItemsByCategory = {};
    quizElement.querySelectorAll('.draggable-category-item').forEach(item => {
        const category = item.dataset.correctCategory;
        if (!correctItemsByCategory[category]) {
            correctItemsByCategory[category] = [];
        }
        correctItemsByCategory[category].push(item.dataset.item);
    });

    dropTargets.forEach(target => {
        const targetCategory = target.dataset.category;
        const droppedItems = target.querySelectorAll('.dropped-items-list li');
        let categoryCorrect = true;
        let itemsInThisCategory = [];

        droppedItems.forEach(item => {
            itemsInThisCategory.push(item.dataset.item);
            if (item.dataset.correctCategory !== targetCategory) {
                categoryCorrect = false;
            }
        });

        // Check for missing items in correct category
        const expectedItems = correctItemsByCategory[targetCategory] || [];
        const missingItems = expectedItems.filter(item => !itemsInThisCategory.includes(item));
        if (missingItems.length > 0) {
            categoryCorrect = false;
        }

        // Check for extra/wrong items in this category
        const wrongItems = itemsInThisCategory.filter(item => !expectedItems.includes(item));
        if (wrongItems.length > 0) {
            categoryCorrect = false;
        }


        target.classList.remove('correct', 'incorrect');
        if (categoryCorrect) {
            target.classList.add('correct');
        } else {
            target.classList.add('incorrect');
            allCorrect = false;
            // Personalized feedback for this category
            let categoryFeedback = `En la categoría "${targetCategory}": `;
            if (missingItems.length > 0) {
                categoryFeedback += `Faltan: ${missingItems.join(', ')}. `;
            }
            if (wrongItems.length > 0) {
                categoryFeedback += `Sobran o son incorrectos: ${wrongItems.join(', ')}. `;
            }
            if (droppedItems.length === 0 && expectedItems.length > 0) {
                categoryFeedback += `Está vacía, pero debería contener elementos. `;
            } else if (droppedItems.length > 0 && expectedItems.length === 0) {
                 categoryFeedback += `Contiene elementos, pero debería estar vacía. `;
            }
            feedbackMessages.push(categoryFeedback);
        }
    });

    feedbackContainer.style.display = 'flex';
    feedbackContainer.classList.remove('correct', 'incorrect');
    if (allCorrect) {
        feedbackContainer.classList.add('correct');
        feedbackContainer.innerHTML = '<i class="fas fa-check-circle"></i> ¡Excelente! Todas las categorías son correctas.';
        if (verifyButton) verifyButton.style.display = 'none';
    } else {
        feedbackContainer.classList.add('incorrect');
        feedbackContainer.innerHTML = `<i class="fas fa-times-circle"></i> Hay algunos errores. ${feedbackMessages.join('<br>')} <br>Intenta de nuevo.`;
        const retryButton = document.createElement('button');
        retryButton.className = 'nav-button retry-button'; // Added specific class
        retryButton.textContent = 'Reintentar';
        // retryButton.style.marginTop = '10px'; // Handled by CSS
        retryButton.onclick = () => setupCategorizationQuiz(quizId); // Reset quiz
        feedbackContainer.appendChild(retryButton);
        if (verifyButton) verifyButton.style.display = 'none';
    }
}
