$(document).ready(function () {
    const booksContainer = $('.books');

    $.getJSON('books.json', function (booksData) {
        booksData.forEach(book => {
            const combinedDescription = `${book.title} by ${book.author}. Year: ${book.year}; ${book.description}`;
            const bookElement = `
                <div class="book" data-description="${combinedDescription}" data-title="${book.title}" data-author="${book.author}" data-year="${book.year}">
                    <img src="${book.image}" alt="${book.title}" width="120" height="180" />
                </div>
            `;
            booksContainer.append(bookElement);
        });
    });

    let currentTranslate = 0;
    const scrollStep = 600;

    function scrollBooks(direction) {
        const containerWidth = $('.books-container').width();
        currentTranslate += direction * scrollStep;
        currentTranslate = Math.max(
            Math.min(currentTranslate, 0),
            -(booksContainer.width() - containerWidth)
        );
        booksContainer.css('transform', `translateX(${currentTranslate}px)`);
    }

    $('.left-arrow').on('click', function () {
        scrollBooks(-1);
    });

    $('.right-arrow').on('click', function () {
        scrollBooks(1);
    });
    
    let slideIndex = 0;
    let slideshowInterval;
    
    function showSlides() {
      let i;
      const slides = document.getElementsByClassName("mySlides");
      const dots = document.getElementsByClassName("dot");
      for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
      }
      slideIndex++;
      if (slideIndex > slides.length) {
        slideIndex = 1;
      }
      for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
      }
      slides[slideIndex - 1].style.display = "block";
      dots[slideIndex - 1].className += " active";
    }
    
    function currentSlide(n) {
      clearInterval(slideshowInterval); 
      slideIndex = n - 1;
      showSlides();
    }
    
    function startSlideshow() {
      slideshowInterval = setInterval(showSlides, 4000); 
    }
    
    showSlides(); 
    
    document.querySelectorAll('.dot').forEach((dot, index) => {
      dot.addEventListener('click', () => {
        currentSlide(index + 1);
      });
    });
    
    document.querySelector('.slideshow-container').addEventListener('click', () => {
      startSlideshow();
    });

    startSlideshow();
});
