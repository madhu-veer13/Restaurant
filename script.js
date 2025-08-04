// Smooth scroll to sections
function scrollToSection(id) {
  const section = document.getElementById(id);
  if (section) {
    section.scrollIntoView({ behavior: 'smooth' });
  }
}

// MENU FILTERING
const filterButtons = document.querySelectorAll('.filter-btn');
const menuItems = document.querySelectorAll('.menu-item');

filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    // Remove 'active' from all buttons, then add to clicked one
    filterButtons.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');

    const category = button.getAttribute('data-category');

    menuItems.forEach(item => {
      if (category === 'all') {
        item.style.display = 'block';
      } else {
        // Show items matching category, hide others
        if (item.classList.contains(category)) {
          item.style.display = 'block';
        } else {
          item.style.display = 'none';
        }
      }
    });
  });
});

// RESERVATION FORM HANDLING
const reservationForm = document.getElementById('reservation-form');
const modal = document.getElementById('reservation-modal');
const modalDesc = modal.querySelector('#modal-desc');
const modalCloseBtn = modal.querySelector('#modal-close');

reservationForm.addEventListener('submit', function (e) {
  e.preventDefault();

  // Simple form validation check (HTML5 required attributes mostly cover this)
  if (!reservationForm.checkValidity()) {
    reservationForm.reportValidity();
    return;
  }

  // Gather form data
  const name = reservationForm.name.value.trim();
  const email = reservationForm.email.value.trim();
  const phone = reservationForm.phone.value.trim();
  const date = reservationForm.date.value;
  const time = reservationForm.time.value;
  const guests = reservationForm.guests.value;

  // Validate date/time to be in future
  const reservationDateTime = new Date(`${date}T${time}`);
  const now = new Date();
  if (reservationDateTime < now) {
    alert('Please select a valid date and time in the future.');
    return;
  }

  // Show confirmation modal with user info
  modalDesc.textContent = `Thank you, ${name}! Your table for ${guests} is reserved on ${date} at ${time}. We have sent a confirmation to ${email}.`;

  modal.hidden = false;

  // Clear the form
  reservationForm.reset();
});

// Close modal
modalCloseBtn.addEventListener('click', () => {
  modal.hidden = true;
});

// Close modal on outside click
window.addEventListener('click', (e) => {
  if (e.target === modal) {
    modal.hidden = true;
  }
});

// Optional: Close modal on ESC key
window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && !modal.hidden) {
    modal.hidden = true;
  }
});
