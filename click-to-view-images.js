document.addEventListener('DOMContentLoaded', () => {
    // Create a stylish modal gallery system
    class ElegantImageModal {
        constructor() {
            this.createStyles();
            this.initializeModals();
            this.addKeyListener();
        }

        createStyles() {
            const style = document.createElement('style');
            style.textContent = `
                .elegant-modal-overlay {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background-color: rgba(0, 0, 0, 0.85);
                    display: none;
                    justify-content: center;
                    align-items: center;
                    z-index: 1000;
                    opacity: 0;
                    transition: opacity 0.3s ease-in-out;
                }

                .elegant-modal-overlay.show {
                    display: flex;
                    opacity: 1;
                }

                .elegant-modal-content {
                    max-width: 90%;
                    max-height: 80%;
                    object-fit: contain;
                    transform: scale(0.7);
                    opacity: 0;
                    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                }

                .elegant-modal-overlay.show .elegant-modal-content {
                    transform: scale(1);
                    opacity: 1;
                }

                .elegant-modal-close {
                    position: absolute;
                    top: 20px;
                    right: 30px;
                    color: white;
                    font-size: 40px;
                    cursor: pointer;
                    opacity: 0.7;
                    transition: all 0.3s ease;
                }

                .elegant-modal-close:hover {
                    transform: rotate(90deg);
                    opacity: 1;
                }

                .elegant-modal-prev,
                .elegant-modal-next {
                    position: absolute;
                    top: 50%;
                    transform: translateY(-50%);
                    color: white;
                    font-size: 50px;
                    cursor: pointer;
                    user-select: none;
                    opacity: 0.6;
                    transition: all 0.3s ease;
                }

                .elegant-modal-prev:hover,
                .elegant-modal-next:hover {
                    opacity: 1;
                    transform: translateY(-50%) scale(1.1);
                }

                .elegant-modal-prev {
                    left: 30px;
                }

                .elegant-modal-next {
                    right: 30px;
                }
            `;
            document.head.appendChild(style);
        }

        initializeModals() {
            const images = document.querySelectorAll('img:not(.pointer)');
            const modalOverlay = this.createModalOverlay();

            images.forEach((img, index) => {
                img.style.cursor = 'pointer';
                img.setAttribute('data-modal-index', index);
                img.addEventListener('click', () => this.openModal(img, images));
            });
        }

        createModalOverlay() {
            const overlay = document.createElement('div');
            overlay.classList.add('elegant-modal-overlay');

            const modalContent = document.createElement('img');
            modalContent.classList.add('elegant-modal-content');

            const closeBtn = document.createElement('div');
            closeBtn.innerHTML = '&times;';
            closeBtn.classList.add('elegant-modal-close');
            closeBtn.addEventListener('click', () => this.closeModal());

            const prevBtn = document.createElement('div');
            prevBtn.innerHTML = '&#10094;';
            prevBtn.classList.add('elegant-modal-prev');
            prevBtn.addEventListener('click', () => this.navigateModal(-1));

            const nextBtn = document.createElement('div');
            nextBtn.innerHTML = '&#10095;';
            nextBtn.classList.add('elegant-modal-next');
            nextBtn.addEventListener('click', () => this.navigateModal(1));

            overlay.appendChild(modalContent);
            overlay.appendChild(closeBtn);
            overlay.appendChild(prevBtn);
            overlay.appendChild(nextBtn);

            overlay.addEventListener('click', (e) => {
                if (e.target === overlay) this.closeModal();
            });

            document.body.appendChild(overlay);
            this.overlay = overlay;
            this.modalContent = modalContent;
            this.currentImages = [];

            return overlay;
        }

        openModal(img, images) {
            this.currentImages = Array.from(images);
            this.currentIndex = this.currentImages.findIndex(i => i === img);

            this.modalContent.src = img.src;
            this.overlay.classList.add('show');
        }

        closeModal() {
            this.overlay.classList.remove('show');
        }

        navigateModal(direction) {
            this.currentIndex = (this.currentIndex + direction + this.currentImages.length) % this.currentImages.length;
            this.modalContent.src = this.currentImages[this.currentIndex].src;
        }

        addKeyListener() {
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape') {
                    this.closeModal();
                }
            });
        }
    }

    // Initialize the modal system
    new ElegantImageModal();
});