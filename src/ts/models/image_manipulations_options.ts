interface IImageManipulationsFilters {
  brightness :string;
  contrast :string;
  noise :string;
  rgb :string;
  round_corner :string;
  watermark :string;
  [key: string] :string;
}

class ImageManipulationsOptions {
  public size:string;
  public filters:IImageManipulationsFilters;

  constructor() {
    this.filters = <IImageManipulationsFilters> {};
  }

  public join():string {
    let joinedOptions:string = '';
    let joinedFilters:string = '';


    for (let filterKey in this.filters) {
      if (this.filters.hasOwnProperty(filterKey) && typeof this.filters[filterKey] !== 'undefined') {
        joinedFilters += ':' + this.filters[filterKey];
      }
    }

    if (joinedFilters.length) {
      joinedFilters = 'filters' + joinedFilters;

      if (typeof this.size !== 'undefined') {
        joinedOptions = this.size + '/' + joinedFilters;
      } else {
        joinedOptions = joinedFilters;
      }
    } else if (typeof this.size !== 'undefined') {
      joinedOptions = this.size;
    }

    return joinedOptions;
  }
}
