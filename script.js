document.addEventListener('DOMContentLoaded', () => {
    const signupForm = document.getElementById('signupForm');

    if (signupForm) {
        signupForm.addEventListener('submit', async function(e) {
            e.preventDefault();

            const emailInput = this.querySelector('input[type="email"]');
            const btn = this.querySelector('button');
            const originalText = btn.textContent;

            // Disable button while submitting
            btn.disabled = true;
            btn.textContent = 'Sending...';

            try {
                const response = await fetch(this.action, {
                    method: 'POST',
                    body: new FormData(this),
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                if (response.ok) {
                    btn.textContent = 'Thanks!';
                    btn.style.background = '#10b981';
                    if (emailInput) {
                        emailInput.value = '';
                    }
                } else {
                    btn.textContent = 'Error - Try Again';
                    btn.style.background = '#ef4444';
                }
            } catch (error) {
                btn.textContent = 'Error - Try Again';
                btn.style.background = '#ef4444';
            }

            // Reset button after 3 seconds
            setTimeout(() => {
                btn.textContent = originalText;
                btn.style.background = '';
                btn.disabled = false;
            }, 3000);
        });
    }
});
