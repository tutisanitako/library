$(document).ready(function () {
  const booksContainer = $('.books');

  $.getJSON('trending_books.json', function (booksData) {
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

  const latestBooksContainer = $('.books-latest');

  $.getJSON('latest_books.json', function (latestBooksData) {
      latestBooksData.forEach(book => {
          const combinedDescription = `${book.title} by ${book.author}. Rating: ${book.rating}; ${book.description}`;
          const bookElement = `
              <div class="book" data-description="${combinedDescription}" data-title="${book.title}" data-author="${book.author}" data-rating="${book.rating}">
                  <img src="${book.image}" alt="${book.title}" width="120" height="180" />
              </div>
          `;
          latestBooksContainer.append(bookElement);
      });
  });

  let currentTranslateLatest = 0;

  function scrollLatestBooks(direction) {
      const containerWidthLatest = $('.books-container-latest').width();
      currentTranslateLatest += direction * scrollStep;
      currentTranslateLatest = Math.max(
          Math.min(currentTranslateLatest, 0),
          -(latestBooksContainer.width() - containerWidthLatest)
      );
      latestBooksContainer.css('transform', `translateX(${currentTranslateLatest}px)`);
  }

  $('.left-arrow-latest').on('click', function () {
      scrollLatestBooks(-1);
  });

  $('.right-arrow-latest').on('click', function () {
      scrollLatestBooks(1);
  });

  function loadAuthorsData() {
      const authorsContainer = $('.authors');

      $.getJSON('authors.json', function (authorsData) {
          authorsData.forEach(author => {
              const combinedDescription = `${author.name}, ${author.country}. Books: ${author.books}`;
              const authorElement = `
                  <div class="author" data-description="${combinedDescription}" data-name="${author.name}" data-country="${author.country}">
                      <!-- You can add more details as needed -->
                      <img src="${author.image}" alt="${author.name}" width="120" height="180" />
                  </div>
              `;
              authorsContainer.append(authorElement);
          });
      });

      let currentTranslateAuthor = 0;
      const scrollStepAuthor = 600;

      function scrollAuthors(direction) {
          const containerWidthAuthor = $('.authors-container').width();
          currentTranslateAuthor += direction * scrollStepAuthor;
          currentTranslateAuthor = Math.max(
              Math.min(currentTranslateAuthor, 0),
              -(authorsContainer.width() - containerWidthAuthor)
          );
          authorsContainer.css('transform', `translateX(${currentTranslateAuthor}px)`);
      }

      $('.left-arrow-author').on('click', function () {
          scrollAuthors(-1);
      });

      $('.right-arrow-author').on('click', function () {
          scrollAuthors(1);
      });
  }

  loadAuthorsData();

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

  $(window).scroll(function () {
      if ($(this).scrollTop() > 100) {
          $('#back-to-top').fadeIn();
      } else {
          $('#back-to-top').fadeOut();
      }
  });

  $('#back-to-top').click(function () {
      $('html, body').animate({ scrollTop: 0 }, 'slow');
      return false;
  });

  var signUpForm = document.getElementById('submitForm');
    var successMessage = document.getElementById('successMessage');

    signUpForm.addEventListener('submit', function (event) {
        event.preventDefault();

        successMessage.style.display = 'block';

        setTimeout(function () {
            successMessage.style.display = 'none';
        }, 3000);
    });
});
