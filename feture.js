function goToHeader() {
    const header = document.getElementById('header');
    header.scrollIntoView({ behavior: 'smooth' });

    // Add a temporary highlight effect
    header.style.transition = 'background-color 0.5s ease';
    header.style.backgroundColor = '#ffeb3b'; // Yellow highlight

    setTimeout(() => {
        header.style.backgroundColor = '#007bff'; // Back to original color
    }, 1000);
}
