
(() => {
  'use strict';

  const forms = document.querySelectorAll('.needs-validation');

  Array.from(forms).forEach(form => {
    form.addEventListener('submit', event => {
      let isValid = true;

      // --- Word count validator function ---
      function validateWordCount(id, minWords, fieldName) {
        const input = document.getElementById(id);
        const words = input.value.trim().split(/\s+/).filter(word => word.length > 0);
        const feedback = input.parentElement.querySelector('.invalid-feedback');

        if (words.length < minWords) {
          input.setCustomValidity(`${fieldName} must be at least ${minWords} words.`);
          feedback.textContent = `${fieldName} must be at least ${minWords} words. Currently ${words.length} words.`;
          isValid = false;
        } else {
          input.setCustomValidity('');
        }
      }

      // Validate Problem Statement (50 words min)
      validateWordCount('problemStatement', 20, 'Problem Statement');

      // Validate Key Learnings (50 words min)
      validateWordCount('learnings', 30, 'Key Learnings');

      // Validate Challenges Faced (100 words min)
      validateWordCount('challenges', 30, 'Challenges Faced');

      // Validate Solution (100 words min)
      validateWordCount('solution', 30, 'Solution');

      // --- Date must be before today ---
      const hackathonDateInput = document.getElementById('hackathonDate');
      const selectedDate = new Date(hackathonDateInput.value);
      const today = new Date();
      today.setHours(0,0,0,0); // reset time

      if (selectedDate >= today) {
        hackathonDateInput.setCustomValidity("Date must be before today.");
        hackathonDateInput.parentElement.querySelector('.invalid-feedback').textContent =
          "Please select a date before today.";
        isValid = false;
      } else {
        hackathonDateInput.setCustomValidity('');
      }

      // --- Bootstrap validation ---
      if (!form.checkValidity() || !isValid) {
        event.preventDefault();
        event.stopPropagation();
      }

      form.classList.add('was-validated');
    }, false);
  });
})();
