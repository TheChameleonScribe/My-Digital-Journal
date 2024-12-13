// Tab switching functionality
document.addEventListener('DOMContentLoaded', () => {
    const tabs = document.querySelectorAll('.tab');
    const tabContents = document.querySelectorAll('.tab-content');
    
    // Click event for tabs
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            switchToTab(tab);
        });
    });

    // Keyboard navigation
    document.addEventListener('keydown', (event) => {
        // Only proceed if an active tab exists
        const currentActiveTab = document.querySelector('.tab.active');
        if (!currentActiveTab) return;

        switch(event.key) {
            case 'ArrowLeft':
                navigateTab(-1);
                event.preventDefault();
                break;
            case 'ArrowRight':
                navigateTab(1);
                event.preventDefault();
                break;
        }
    });

    // Function to switch to a specific tab
    function switchToTab(tab) {
        // Remove active class from all tabs and tab contents
        tabs.forEach(t => t.classList.remove('active'));
        tabContents.forEach(tc => tc.classList.remove('active'));

        // Add active class to clicked tab and corresponding content
        tab.classList.add('active');
        document.getElementById(tab.dataset.tab).classList.add('active');
    }

    // Function to navigate between tabs using left/right arrows
    function navigateTab(direction) {
        const currentActiveTab = document.querySelector('.tab.active');
        const tabArray = Array.from(tabs);
        const currentIndex = tabArray.indexOf(currentActiveTab);
        
        // Calculate new index, wrapping around if needed
        let newIndex = (currentIndex + direction + tabArray.length) % tabArray.length;
        
        // Switch to the new tab
        switchToTab(tabArray[newIndex]);
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const sidebar = document.querySelector('.sidebar');
    const mainContent = document.querySelector('.main-content');
    const sidebarToggles = document.querySelectorAll('.sidebar-toggle');

    sidebarToggles.forEach(toggle => {
        toggle.addEventListener('click', () => {
            sidebar.classList.toggle('hidden');
            mainContent.classList.toggle('sidebar-hidden');
        });
    });
});
