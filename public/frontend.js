// Menu de navigation Début
function openNav() {
    document.querySelector(".links").style.width = "100%";
    document.querySelector("body").style.overflow = "hidden";
}
function closeNav() {
    document.querySelector(".links").style.width = "0%";
    document.querySelector("body").style.overflow = "unset";
}
// Fermer le menu quand on clique sur un lien
document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll('.links a').forEach(function (link) {
        link.addEventListener('click', function () {
            if (window.innerWidth <= 1140) {
                closeNav();
            }
        });
    });
});
// Menu de navigation Fin


// Boite de dialogue modalités Début
function openModal() {
    document.getElementById('modalOverlay').style.display = 'flex';
}

function closeModal() {
    document.getElementById('modalOverlay').style.display = 'none';
}

// Boite de dialogue modalité Fin


// Boite de dialogue description Début
// Ouvrir le modal
function ouvrirCommoditeModal() {
    document.getElementById('commodite-modal').style.display = 'block';
}

// Fermer le modal
function fermerCommoditeModal() {
    document.getElementById('commodite-modal').style.display = 'none';
}

// Fermer si on clique en dehors de la boîte
window.onclick = function (event) {
    const modal = document.getElementById('commodite-modal');
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
// Boite de dialogue descriptions Fin


// Boite de dialogue réglements Début
function ouvrirReglementModal() {
    document.getElementById('reglement-modal').style.display = 'block';
}

function fermerReglementModal() {
    document.getElementById('reglement-modal').style.display = 'none';
}

window.addEventListener('click', function (event) {
    const modal = document.getElementById('reglement-modal');
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});
// Boite de dialogue réglements Fin


// Gallerie Début
document.addEventListener('DOMContentLoaded', function () {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const gallery = document.getElementById('gallery');
    const modal = document.getElementById('modal');
    const modalGallery = document.getElementById('modalGallery');
    const viewer = document.getElementById('viewer');
    const modalImg = document.getElementById('modalImage');
    const imageTitle = document.getElementById('imageTitle');
    const closeModalBtn = document.getElementById('closeModal');
    const nextBtn = document.getElementById('nextBtn');
    const prevBtn = document.getElementById('prevBtn');

    let currentImages = [];
    let currentIndex = 0;
    let currentRubrique = 'interieur';

    const imagesData = {
        interieur: {
            'Voir les salons': [
                { src: 'images/Salonns.avif', name: 'Salon 1' },
                { src: 'images/Salon 4.jpeg', name: 'Salon 1' },
                { src: 'images/Salons 3.avif', name: 'Salon 1' },
                { src: 'images/Salon 4.avif', name: 'Salon 2' },
                { src: 'images/Sous-sol 1.avif', name: 'Salon 2' },
                { src: 'images/Salon 2.avif', name: 'Salon 2' }
            ],
            'Voir les chambres': [
                { src: 'images/Chambres.avif', name: 'Chambre 1 très grand lit' },
                { src: 'images/Chambress.avif', name: 'Chambre 1' },
                { src: 'images/Chambree.avif', name: 'Chambre 2 très grand lit' },
                { src: 'images/Chambre 3.avif', name: 'Chambre 2' },
                { src: 'images/Chambre 2.avif', name: 'Chambre 3 deux grands lits' },
                { src: 'images/Chambre.avif', name: 'Chambre 3' },
                { src: 'images/Chambre 1.avif', name: 'Chambre 4 deux grands lits' },
                { src: 'images/lit.avif', name: 'Chambre 4' }
            ],
            'Voir les salles de bains': [
                { src: 'images/Toilette 1.avif', name: 'Salle de bain 1' },
                { src: 'images/Toilettes.avif', name: 'Salle de bain 1' },
                { src: 'images/Toilette 2.avif', name: 'Salle de bain 2' },
                { src: 'images/Toilette.avif', name: 'Salle de bain 2' },
                { src: 'images/Washroom.avif', name: 'Salle de bain 2' }
            ],
            'Voir la cuisine en entièreté': [
                { src: 'images/Salons.avif', name: 'Cuisine' },
                { src: 'images/Cuisines.avif', name: '' },
                { src: 'images/Cuisine.avif', name: '' },
                { src: 'images/Cuisine 1.avif', name: '' },
                { src: 'images/Saloncuisine.avif', name: '' },
                { src: 'images/Salonss.avif', name: '' }
            ],
            'Salle à manger': [
                { src: 'images/Salons 1.avif', name: 'Salle à manger' },
                { src: 'images/Salon.avif', name: '' },
                { src: 'images/interieur/Table a manger.avif', name: '' },
                { src: 'images/interieur/Salonn 3.avif', name: '' }
            ],
            'Sous_sol': [
                { src: 'images/Sous-sols 1.avif', name: 'Sous-sol' },
                { src: 'images/Sous-sols.avif', name: '' },
                { src: 'images/Sous-sol.avif', name: '' },
                { src: 'images/Billard 2.avif', name: '' },
                { src: 'images/Salon 4.avif', name: '' }
            ]
        },
        exterieur: {
            'Le balcon': [{ src: 'images/balcon.avif', name: 'balcon' }],
            'La terasse': [
                { src: 'images/Dehors.avif', name: 'Terasse' },
                { src: 'images/Chambre 1.avif', name: 'Terasse' }
            ],
            'Le spa': [{ src: 'images/spa.avif', name: 'spa' }],
            'Cours arrière et avant': [
                { src: 'images/Dehors.avif', name: 'Cours' },
                { src: 'images/Exterior 1.avif', name: 'Cours' }
            ]
        },
        alentours: {
            'Le lac': [
                { src: 'images/Lac.avif', name: 'Le lac' },
                { src: 'images/grandlac.avif', name: 'Le lac' },
                { src: 'images/Lac en hiver.avif', name: 'Le lac' }
            ],
            'Le paysage': [
                { src: 'images/Exteriors.avif', name: 'Plage 1' }
            ]
        }
    };

    function updateGallery(rubrique) {
        currentRubrique = rubrique;
        gallery.innerHTML = '';
        const rubData = imagesData[rubrique];
        if (!rubData) return;

        for (let cat in rubData) {
            const img = rubData[cat][0];
            if (!img) continue;

            const div = document.createElement('div');
            div.className = `pic ${rubrique}`;
            div.dataset.rubrique = rubrique;
            div.dataset.category = cat;
            div.innerHTML = `
                            <img src="${img.src}" alt="${img.name}">
                            <div class="overlay">${cat}</div>
                        `;
            div.addEventListener('click', () => openCategoryPopup(rubrique, cat));
            gallery.appendChild(div);
        }
    }

    function openCategoryPopup(rubrique, cat) {
        const images = imagesData[rubrique][cat];
        showModalGallery(images);
    }

    function openAllImagesPopup() {
        const rubData = imagesData[currentRubrique];
        if (!rubData) return;

        let allImages = [];

        for (let cat in rubData) {
            allImages = allImages.concat(rubData[cat]);
        }

        showModalGallery(allImages);
    }

    function showModalGallery(images) {
        modalGallery.innerHTML = '';
        currentImages = images;
        viewer.style.display = 'none';

        images.forEach((img, i) => {
            const thumb = document.createElement('div');
            thumb.className = 'thumb';
            thumb.innerHTML = `<img src="${img.src}" alt="${img.name}"><span>${img.name}</span>`;
            thumb.addEventListener('click', () => openViewer(i));
            modalGallery.appendChild(thumb);
        });

        modal.style.display = 'flex';
    }

    function openViewer(index) {
        currentIndex = index;
        const img = currentImages[index];
        modalImg.src = img.src;
        imageTitle.textContent = img.name;
        viewer.style.display = 'block';
    }

    nextBtn.addEventListener('click', () => {
        if (currentImages.length === 0) return;
        currentIndex = (currentIndex + 1) % currentImages.length;
        openViewer(currentIndex);
    });

    prevBtn.addEventListener('click', () => {
        if (currentImages.length === 0) return;
        currentIndex = (currentIndex - 1 + currentImages.length) % currentImages.length;
        openViewer(currentIndex);
    });

    closeModalBtn.addEventListener('click', () => {
        modal.style.display = 'none';
        viewer.style.display = 'none';
    });

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelector('.filter-btn.active')?.classList.remove('active');
            btn.classList.add('active');

            const filtre = btn.dataset.filter;

            if (filtre === 'tout') {
                openAllImagesPopup();
            } else {
                updateGallery(filtre);
            }
        });
    });
    // Lier le bouton "Afficher tout" à l'ouverture du popup avec toutes les images de la rubrique actuelle
    document.getElementById('showMoreBtn').addEventListener('click', () => {
        openAllImagesPopup();
    });

    updateGallery('interieur'); // Chargement initial
});
// Gallerie Fin

// Témoignages Début
const temoignageTrack = document.querySelector('.carousel-track');
const temoignageSlides = document.querySelectorAll('.comment');
const temoignagePrevBtn = document.querySelector('.carousel-btn.prev');
const temoignageNextBtn = document.querySelector('.carousel-btn.next');

let temoignageIndex = 0;
const visibleCount = 2; // nombre de commentaires visibles à la fois

function updateTemoignageCarousel() {
    const slideWidth = temoignageSlides[0].offsetWidth + 20; // largeur + margin horizontal
    temoignageTrack.style.transform = `translateX(-${temoignageIndex * slideWidth}px)`;
}

temoignageNextBtn.addEventListener('click', () => {
    if (temoignageIndex < temoignageSlides.length - visibleCount) {
        temoignageIndex++;
    } else {
        temoignageIndex = 0; // retour au début
    }
    updateTemoignageCarousel();
});

temoignagePrevBtn.addEventListener('click', () => {
    if (temoignageIndex > 0) {
        temoignageIndex--;
    } else {
        temoignageIndex = temoignageSlides.length - visibleCount; // aller à la fin
    }
    updateTemoignageCarousel();
});

// défilement automatique
setInterval(() => {
    if (temoignageIndex < temoignageSlides.length - visibleCount) {
        temoignageIndex++;
    } else {
        temoignageIndex = 0;
    }
    updateTemoignageCarousel();
}, 6000);
// Témoignage Fin