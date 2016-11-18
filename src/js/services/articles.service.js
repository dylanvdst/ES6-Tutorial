export default class Articles{
  constructor(AppConstants, $http){
    'ngInject';

    this._AppConstants = AppConstants;
    this._$http = $http;
  }

  save(article){
    let request = {
      //no '' but `` (alt gr + µ)
      url: `${this._AppConstants.api}/articles`,
      method: 'POST',
      data: {article: article}
    };

    return this._$http(request).then((res) => res.data.article);
  }
}
