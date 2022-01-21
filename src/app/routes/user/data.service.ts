import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {TokenService} from "@core";


export interface User {
  _id: string;
  username: string;
  password: string;
  timestamps: number;
}

@Injectable()
export class UserDataService {

  userList: User[] = [];

  private _userUrl = 'http://localhost:3000/user';
  private _createUserUrl = 'http://localhost:3000/user/signup';
  private headers = new HttpHeaders({'Authorization':this._token.getBearerToken()});

  constructor(public _httpClient: HttpClient, private _token: TokenService) {
  }

  getData() {
    return this._httpClient.get<User[]>(this._userUrl,{headers: this.headers})
  }

  delData(id: string) {
    return this._httpClient.delete(this._userUrl + '/' + id, {headers: this.headers})
  }

  postUser(username: string, password: string) {
    const body = {username: username, password: password};
    return this._httpClient.post<User[]>(this._createUserUrl, body, {headers: this.headers})
  }
}
