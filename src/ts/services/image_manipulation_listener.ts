/// <reference path="../models/image_manipulations_options.ts"/>

class ImageManipulationListener {
  private options: ImageManipulationsOptions;

  constructor() {
    this.options = new ImageManipulationsOptions();

    $('#crop-image-preview').click((event) => {
      if (this.toggleActive(<HTMLLinkElement> event.target)) {
        this.options.size = '300x300';
      } else {
        this.options.size = undefined;
      }
      this.manipulateImage();
    });

    $('#brightness-image-preview').click(this.clickFilterCallback('brightness', 'brightness(-40)'));
    $('#contrast-image-preview').click(this.clickFilterCallback('contrast', 'contrast(40)'));
    $('#noise-image-preview').click(this.clickFilterCallback('noise', 'noise(200)'));
    $('#rgb-image-preview').click(this.clickFilterCallback('rgb', 'rgb(20,-20,40)'));
    $('#round-corner-image-preview').click(this.clickFilterCallback('round_corner', 'round_corner(100,255,255,255)'));
    $('#watermark-image-preview').click(
      this.clickFilterCallback('watermark', 'watermark(https://www.renuo.ch/images/logo.png,-10,-10,50)'
      ));
  }

  toggleActive(element: HTMLLinkElement): boolean {
    let jQueryElement = $(element);
    jQueryElement.toggleClass('active');
    return jQueryElement.hasClass('active');
  }

  manipulateImage(): void {
    const image = $('#image-preview');
    const imageOptions = this.options.join();

    if (imageOptions.length) {
      image.attr('src', image.data('src').replace('/o/', '/t/' + imageOptions + '/u/o/'));

    } else {
      image.attr('src', image.data('src'));
    }
  }

  clickFilterCallback = (key: string, value: string): Function => {
    const callback = (event: JQueryEventObject) => {
      event.preventDefault();
      if (this.toggleActive(<HTMLLinkElement> event.target)) {
        this.options.setFilter(key, value);
      } else {
        this.options.setFilter(key, undefined);
      }
      this.manipulateImage();
    };
    return callback;
  }
}
