let currentCategory = "all";

const sliders = document.querySelectorAll('.slider');

sliders.forEach(slider => {

    const slides = slider.querySelectorAll('.slide');
    const dots = slider.querySelectorAll('.dot');
    const prev = slider.querySelector('.prev');
    const next = slider.querySelector('.next');

    let current = 0;

    function showSlide(index){

        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));

        slides[index].classList.add('active');
        dots[index].classList.add('active');

    }

    function nextSlide(){
        current = (current + 1) % slides.length;
        showSlide(current);
    }

    function prevSlide(){
        current = (current - 1 + slides.length) % slides.length;
        showSlide(current);
    }

    next.addEventListener('click', nextSlide);
    prev.addEventListener('click', prevSlide);

    setInterval(nextSlide,2500);

});

const modal = document.getElementById("imageModal");
const modalImg = document.getElementById("modalImage");
const closeModal = document.querySelector(".close-modal");

document.querySelectorAll(".slide").forEach(img => {

    img.addEventListener("click", () => {

        modal.style.display = "flex";
        modalImg.src = img.src;

    });

});

closeModal.addEventListener("click", () => {

    modal.style.display = "none";

});

modal.addEventListener("click", (e) => {

    if(e.target === modal){

        modal.style.display = "none";

    }

});

function openProduct(title, image, description, colors, fits, fabric, whatsappLink){

    document.getElementById("productTitle").innerText = title;
    document.getElementById("productImage").src = image;
    document.getElementById("productDescription").innerText = description;
    document.getElementById("productColors").innerText = colors;
    document.getElementById("productFits").innerText = fits;
    document.getElementById("productFabric").innerText = fabric;

    document.getElementById("productWhatsapp").href = whatsappLink;

    document.getElementById("productModal").style.display = "flex";
}

const productModal = document.getElementById("productModal");
const closeProduct = document.querySelector(".close-product");

if (closeProduct && productModal) {

    closeProduct.onclick = function () {
        productModal.style.display = "none";
    };

    window.addEventListener("click", function (e) {
        if (e.target === productModal) {
            productModal.style.display = "none";
        }
    });

}

// Product Search

function searchProducts(){

    const input = document.getElementById("searchInput").value.toLowerCase();
    const products = document.querySelectorAll(".product-card");
    const sections = document.querySelectorAll(".category-section");

    products.forEach(product => {

        const text = product.innerText.toLowerCase();

        const matchesSearch = text.includes(input);

        const matchesCategory =
            currentCategory === "all" ||
            product.classList.contains(currentCategory);

        if(matchesSearch && matchesCategory){
            product.style.display = "block";
        }else{
            product.style.display = "none";
        }

    });

    sections.forEach(section => {

        const visibleProducts = section.querySelectorAll(".product-card");
        let hasVisible = false;

        visibleProducts.forEach(product => {
            if(product.style.display !== "none"){
                hasVisible = true;
            }
        });

        section.style.display = hasVisible ? "block" : "none";

    });

}

// Product Filters

function filterProducts(category, button){

    currentCategory = category;

    const buttons = document.querySelectorAll(".filter-btn");

    buttons.forEach(btn => btn.classList.remove("active"));
    button.classList.add("active");

    // Re-run the search using the selected category
    searchProducts();

}
