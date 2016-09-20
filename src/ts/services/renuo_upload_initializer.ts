/// <reference path="../../../typings/all.d.ts" />

interface IShowResult { (result: IRenuoUploadResult): void;
}

class RenuoUploadInitializer {
  constructor() {
    const dropzoneOptions = {
      acceptedFiles: 'image/*',
      dictDefaultMessage: 'Drop a image or a file into this area or just click into it.',
      dictFallbackMessage: 'Sorry renuo-upload dose not work in old browsers! Please update your browser.',
      dictInvalidFileType: 'Wrong filetype. Only images are allowed.',
      dictFileTooBig: 'File is to large.'
    };

    const showResult: IShowResult = function (result) {
      const imagePublicUrl = 'https:' + result.publicUrl;
      const imagePreview = $('#image-preview');

      imagePreview.attr('src', imagePublicUrl);
      imagePreview.data('src', imagePublicUrl);

      $('.result').show();
      $('.container-info').show();
      $('.container-info-top').show();

      setTimeout(()=>{
      $('html, body').animate({
        'scrollTop': $('#info').offset().top
      }, 1000);
      }, 1000);
    };


    new RenuoUpload($('.renuo-upload'), dropzoneOptions, showResult);
  }
}
