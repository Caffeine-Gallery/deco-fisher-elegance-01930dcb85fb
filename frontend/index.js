import { backend } from 'declarations/backend';

document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Handle contact form submission
    const contactForm = document.getElementById('contactForm');
    const submitStatus = document.getElementById('submitStatus');

    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;

        try {
            submitStatus.className = 'status-message';
            submitStatus.textContent = 'Sending message...';
            submitStatus.style.display = 'block';

            const result = await backend.submitContact(name, email, message);

            if (result) {
                submitStatus.className = 'status-message success';
                submitStatus.textContent = 'Message sent successfully!';
                contactForm.reset();
            } else {
                submitStatus.className = 'status-message error';
                submitStatus.textContent = 'Failed to send message. Please try again.';
            }
        } catch (error) {
            submitStatus.className = 'status-message error';
            submitStatus.textContent = 'An error occurred. Please try again later.';
        }

        setTimeout(() => {
            submitStatus.style.display = 'none';
        }, 5000);
    });

    // Navbar background change on scroll
    window.addEventListener('scroll', () => {
        const nav = document.querySelector('nav');
        if (window.scrollY > 50) {
            nav.style.background = 'rgba(255, 255, 255, 0.95)';
        } else {
            nav.style.background = 'rgba(255, 255, 255, 0.95)';
        }
    });
});
