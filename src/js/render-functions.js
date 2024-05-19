export function getMarkup(imgArray, gallery) {
    const galleryMarkup = imgArray.reduce((acc, img) => {
      return (acc += `<div class="gallery-item">
            <a href="${img.largeImageURL}"><img src="${img.webformatURL}" alt="${img.tags}"  width="360"/></a>
            <div class="info">
                <p>Likes <span></span>${img.likes}</span></p>
                <p>Views <span></span>${img.views}</span></p>
                <p>Comments <span></span>${img.comments}</span></p>
                <p>Downloads <span></span>${img.downloads}</span></p>
            </div>
                </div>`);
    }, '');
    gallery.insertAdjacentHTML('beforeend', galleryMarkup);
  };