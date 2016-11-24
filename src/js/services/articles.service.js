export default class Articles{
  constructor(AppConstants, $http, $q){
    'ngInject';

    this._AppConstants = AppConstants;
    this._$http = $http;
    this._$q = $q;
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

  get(slug){
    let deferred = this._$q.defer();

    //check blank title
    if(!slug.replace(" ", "")){
      deferred.reject("Article slug is empty");
      return deferred.promise;
    }

    this._$http({
      url: this._AppConstants.api + '/articles/' + slug,
      method: 'GET'
    }).then(
      (res) => deferred.resolve(res.data.article),
      (err) => deferred.reject(err)
    );
    return deferred.promise;
  }

  //Delete article
  destroy(slug){
    return this._$http({
      url: this._AppConstants.api + '/articles/' + slug,
      method: 'DELETE'
    });
  }

  //Favorite an article
  favorite(slug){
    return this._$http({
      url: this._AppConstants.api + '/articles/' + slug + '/favorite',
      method: 'POST'
    });
  }

  //Unfavorite an article
  unfavorite(slug){
    return this._$http({
      url: this._AppConstants.api + '/articles/' + slug + '/favorite',
      method: 'DELETE'
    });
  }

  save(article){
    let request = {};

    if(article.slug){
      request.url = `${this._AppConstants.api}/articles/${article.slug}`;
      request.method = 'PUT';
      delete article.slug;
    } else {
      request.url = `${this._AppConstants.api}/articles`;
      request.method = 'POST';
    }

    request.data = {article: article};
    return this._$http(request).then((res) => res.data.article);
  }
}
