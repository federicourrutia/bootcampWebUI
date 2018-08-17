class Index {
  constructor() {
    this.contentGallery = $('.content-gallery');
    this.init();
	}

  getGenres() {
    fetch('http://localhost:3000/genres')
      .then((response) => {
        return response.json();
      })
      .then((genres) => {
          genres.forEach((genre) => {
            this.contentGallery.append(`<a href="${genre.link}"><img src="${genre.image}"></a>`)
          });
      })
  }

  init() {
    this.getGenres();
  }
}

$(document).ready(() => {
  new Index();
});
