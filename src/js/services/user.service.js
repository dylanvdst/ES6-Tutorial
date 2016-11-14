export default class User {
  constructor(JWT, AppConstants, $http, $state, $q){
    'ngInject';

    this._AppConstants = AppConstants;
    this._$http = $http;
    this._JWT = JWT;
    this._$state = $state;
    this._$q = $q;

    //user properties
    this.current = null;
  }

  //Authentication by registering or logging in
  attemptAuth(type, credentials){
    let route = (type === 'login') ? '/login' : '';
    return this._$http({
      url: this._AppConstants.api + '/users' + route,
      method: 'POST',
      data: {
        user: credentials
      }
    }).then(
      (res) => {
        //Set the JWT token
        this._JWT.save(res.data.user.token);

        //Store tue user's info for easy lookup
        this.current = res.data.user;

        return res;
      }
    );
  }

  logout(){
    this.current = null;
    this._JWT.destroy();
    //Do a hard reload of current state to ensure all data is flushed
    this._$state.go(this._$state.$current, null, {reload: true});
  }

  verifyAuth()
  {
    let deferred = this._$q.defer();

    //Check for JWT token first
    if(!this._JWT.get()){
      deferred.resolve(false);
      return deferred.promise;
    }

    //If there's a JWT & user is already set
    if(this.current){
      deferred.resolve(true);
    }else{
      this._$http({
        url: this._AppConstants.api + '/user',
        method: 'GET',
        headers: {
          Authorization: 'Token ' + this._JWT.get()
        }
      }).then(
        (res) => {
          this.current = res.data.user;
          deferred.resolve(true);
        },
        (err) => {
          this._JWT.destroy();
          deferred.resolve(false);
        }
      );
    }
    return deferred.promise;
  }
}
