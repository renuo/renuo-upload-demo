/// <reference path="../models/image_manipulations_options.ts"/>

class ImageManipulationListener {
  private options: ImageManipulationsOptions;

  constructor() {
    this.options = new ImageManipulationsOptions();

    $('#crop-image-preview').click((event) => {
      if (this.isActive(<HTMLLinkElement> event.target)) {
        this.options.size = '300x300';
      } else {
        this.options.size = undefined;
      }
      this.manipulateImage();
    });

    $('#brightness-image-preview').click(() => {
      if (this.isActive(<HTMLLinkElement> event.target)) {
        this.options.filters.brightness = 'brightness(-40)';
      } else {
        this.options.filters.brightness = undefined;
      }
      this.manipulateImage();
    });

    $('#contrast-image-preview').click(() => {
      if (this.isActive(<HTMLLinkElement> event.target)) {
        this.options.filters.contrast = 'contrast(40)';
      } else {
        this.options.filters.contrast = undefined;
      }
      this.manipulateImage();
    });

    $('#noise-image-preview').click(() => {
      if (this.isActive(<HTMLLinkElement> event.target)) {
        this.options.filters.noise = 'noise(200)';
      } else {
        this.options.filters.noise = undefined;
      }
      this.manipulateImage();
    });

    $('#rgb-image-preview').click(() => {
      if (this.isActive(<HTMLLinkElement> event.target)) {
        this.options.filters.rgb = 'rgb(20,-20,40)';
      } else {
        this.options.filters.rgb = undefined;
      }
      this.manipulateImage();
    });

    $('#round-corner-image-preview').click(() => {
      if (this.isActive(<HTMLLinkElement> event.target)) {
        this.options.filters.round_corner = 'round_corner(100,255,255,255)';
      } else {
        this.options.filters.round_corner = undefined;
      }
      this.manipulateImage();
    });

    $('#watermark-image-preview').click(() => {
      if (this.isActive(<HTMLLinkElement> event.target)) {
        this.options.filters.watermark = 'watermark(https://www.renuo.ch/images/logo.png,-10,-10,50)';
      } else {
        this.options.filters.watermark = undefined;
      }
      this.manipulateImage();
    });
  }

  isActive(element: HTMLLinkElement):boolean {
    let el = $(element);
    el.toggleClass('active');
    return el.hasClass('active');
  }

  manipulateImage() {
    const image = $('#image-preview');
    const imageOptions = this.options.join();

    if (imageOptions.length) {
      image.attr('src', image.data('src').replace('/o/', '/t/' + imageOptions + '/u/o/'));

    } else {
      image.attr('src', image.data('src'));
    }
  }
}
