export default class User {
  constructor(JWT, AppConstants, $http){
    'ngInject';

    this._AppConstants = AppConstants;
    this._$http = $http;
    this._JWT = JWT;

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
}
