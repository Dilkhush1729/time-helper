document.addEventListener('DOMContentLoaded', () => {
    const eventSubjectInput = document.getElementById('event-subject');
    const eventDateInput = document.getElementById('event-date-input');
    const eventTimeInput = document.getElementById('event-time-input');
    const addEventButton = document.getElementById('add-event');
    const eventCardsContainer = document.getElementById('event-cards-container');

    // Load events from local storage and render them
    function renderEventCards() {
        const storedEvents = JSON.parse(localStorage.getItem('events')) || [];
        eventCardsContainer.innerHTML = '';
        console.log(storedEvents)
        storedEvents.forEach((event, index) => {
            const { subject, date, time } = event;

            // Combine date and time to form a valid Date object
            const eventDateTime = new Date(`${date}T${time}`);

            // Check if the eventDateTime is valid
            if (isNaN(eventDateTime)) {
                console.warn(`Invalid event data for "${subject}". Skipping rendering.`);
                return;
            }

            const remainingTime = calculateRemainingTime(eventDateTime);
            const eventCard = createEventCard(subject, date, time, remainingTime, index);
            eventCardsContainer.appendChild(eventCard);
        });
    }

    // Calculate remaining time for an event
    function calculateRemainingTime(eventDateTime) {
        const now = new Date();
        const diffMs = eventDateTime - now;

        if (diffMs <= 0) return 'Event has passed';

        const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diffMs / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((diffMs / (1000 * 60)) % 60);
        const seconds = Math.floor((diffMs / 1000) % 60);

        return `${days} days, ${hours} hrs, ${minutes} mins, ${seconds} secs`;
    }

    // Create an event card
    function createEventCard(subject, date, time, remainingTime, index) {
        const card = document.createElement('div');
        card.className = 'event-card';

        card.innerHTML = `
            <h3>${subject}</h3>
            <p><strong>Date:</strong> ${date}</p>
            <p><strong>Time:</strong> ${time}</p>
            <p><strong>Remaining Time:</strong> ${remainingTime}</p>
            <button class="delete-event" data-index="${index}">Delete</button>
        `;

        card.querySelector('.delete-event').addEventListener('click', () => {
            deleteEvent(index);
        });

        return card;
    }

    // Delete an event from local storage
    function deleteEvent(index) {
        const storedEvents = JSON.parse(localStorage.getItem('events')) || [];
        storedEvents.splice(index, 1); // Remove the event at the given index
        localStorage.setItem('events', JSON.stringify(storedEvents));
        renderEventCards();
    }

    // Add a new event to local storage
    function addEventToLocalStorage(subject, date, time) {
        if (!subject || !date || !time) {
            alert('Please fill in all fields before adding an event.');
            return;
        }

        const events = JSON.parse(localStorage.getItem('events')) || [];
        const newEvent = { subject, date, time };
        events.push(newEvent);
        localStorage.setItem('events', JSON.stringify(events));
        renderEventCards();
    }

    // Add event button click handler
    addEventButton.addEventListener('click', () => {
        const subject = eventSubjectInput.value.trim();
        const date = eventDateInput.value;
        const time = eventTimeInput.value;

        // Validate time (HH:MM 24-hour format)
        if (!time || !/^([0-1]?[0-9]|2[0-3]):([0-5][0-9])$/.test(time)) {
            alert('Please enter a valid time in 24-hour format (HH:MM).');
            return;
        }

        addEventToLocalStorage(subject, date, time);

        // Clear inputs
        eventSubjectInput.value = '';
        eventDateInput.value = '';
        eventTimeInput.value = '';
    });

    // Initial render
    renderEventCards();
});
