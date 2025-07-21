class ColorSwatches extends HTMLElement {
  connectedCallback() {
    this.selectors = {
      colorSwatchImage: '.grid-product__color-image',
      colorSwatch: '.color-swatch--with-image',
      gridItemLink: '.grid-item__link',
      gridProductImageWrap: '.grid-product__image-wrap'
    }

    this.gridItemLink = this.closest(this.selectors.gridItemLink)
    this.gridProductImageWrap = this.gridItemLink.querySelector(this.selectors.gridProductImageWrap)
    this.colorImages = this.gridProductImageWrap.querySelectorAll(this.selectors.colorSwatchImage)

    if (this.colorImages.length) {
      this.swatches = this.querySelectorAll(this.selectors.colorSwatch)
      this.colorSwatchClicking()
    }
  }

  colorSwatchClicking() {
    this.swatches.forEach((swatch) => {
      swatch.addEventListener('click', (evt) => {
        evt.preventDefault()
        this.setActiveColorImage(swatch)
      })
    })
  }

  setActiveColorImage(swatch) {
    const id = swatch.dataset.variantId
    const image = swatch.dataset.variantImage

    // Unset all active swatch images
    this.colorImages.forEach((el) => {
      el.classList.remove('is-active')
    })

    // Unset all active swatches
    this.swatches.forEach((el) => {
      el.classList.remove('is-active')
    })

    // Set active image and swatch
    const imageEl = this.gridProductImageWrap.querySelector('.grid-product__color-image--' + id)
    imageEl.style.backgroundImage = 'url(' + image + ')'
    imageEl.classList.add('is-active')
    swatch.classList.add('is-active')

    // Update product grid item href with variant URL
    const variantUrl = swatch.dataset.url
    const gridItem = swatch.closest('.grid-item__link')
    if (gridItem) {
                   var currentUrlElement = gridItem.querySelector('.current_url');
                    if (currentUrlElement) {
                        currentUrlElement.setAttribute('href', variantUrl);
                      }
                    }
    gridItem.setAttribute('href', variantUrl)
  }
}

customElements.define('color-swatches', ColorSwatches)