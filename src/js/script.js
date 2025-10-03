// Garantir que as seções sejam visíveis
document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('.fade-in');
    sections.forEach(section => {
        section.style.opacity = '1';
        section.style.transform = 'translateY(0)';
    });

    // Função para inicializar carrossel
    function initCarousel(containerId) {
        const containerImg = document.querySelector(containerId);
        const galleryImages = containerImg ? containerImg.querySelectorAll('.gallery-img') : [];
        let currentImageIndex = 0;
        let carouselInterval;

        if (containerImg && galleryImages.length > 0) {
            console.log(`Carrossel ${containerId} inicializado com`, galleryImages.length, 'imagens');
            
            // Função para mostrar próxima imagem
            function showNextImage() {
                // Remover classe active de todas as imagens
                galleryImages.forEach(img => {
                    img.classList.remove('active');
                    img.style.opacity = '0';
                    img.style.transform = 'translateX(100%)';
                });

                // Avançar para próxima imagem
                currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
                const nextImage = galleryImages[currentImageIndex];
                
                console.log(`Mostrando imagem ${currentImageIndex + 1} de ${galleryImages.length} em ${containerId}`);
                
                // Mostrar próxima imagem
                if (nextImage) {
                    nextImage.classList.add('active');
                    nextImage.style.opacity = '1';
                    nextImage.style.transform = 'translateX(0)';
                }
            }

            // Iniciar carrossel no hover
            containerImg.addEventListener('mouseenter', function() {
                console.log(`Hover iniciado - mostrando carrossel ${containerId}`);
                
                // Esconder imagem principal
                const projectImg = containerImg.querySelector('.project-img');
                if (projectImg) {
                    projectImg.style.opacity = '0';
                }
                
                // Mostrar primeira imagem da galeria
                if (galleryImages[0]) {
                    // Remover active de todas as imagens primeiro
                    galleryImages.forEach(img => {
                        img.classList.remove('active');
                        img.style.opacity = '0';
                        img.style.transform = 'translateX(100%)';
                    });
                    
                    // Ativar primeira imagem
                    galleryImages[0].classList.add('active');
                    galleryImages[0].style.opacity = '1';
                    galleryImages[0].style.transform = 'translateX(0)';
                    currentImageIndex = 0;
                }
                
                // Iniciar carrossel automático
                carouselInterval = setInterval(showNextImage, 1500);
            });

            // Parar carrossel quando sair do hover
            containerImg.addEventListener('mouseleave', function() {
                console.log(`Hover finalizado - parando carrossel ${containerId}`);
                clearInterval(carouselInterval);
                
                // Esconder todas as imagens da galeria
                galleryImages.forEach(img => {
                    img.classList.remove('active');
                    img.style.opacity = '0';
                    img.style.transform = 'translateX(100%)';
                });
                
                // Mostrar imagem principal novamente
                const projectImg = containerImg.querySelector('.project-img');
                if (projectImg) {
                    projectImg.style.opacity = '1';
                    projectImg.style.transform = 'scale(1)';
                }
                
                currentImageIndex = 0;
            });
        }
    }

    // Inicializar carrosséis para todos os projetos
    initCarousel('#container-img-1');    // Projeto 1 (XYZ)
    initCarousel('#container-img-2');    // Projeto 2 (DJP)
});
