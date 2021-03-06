import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {TokenService} from "@core";
import {environment} from "environments/environment";


export interface Cat {
  _id: string;
  name: string;
  function: string;
  marge: number;
  picture: string;
  sub_category: [
    _id: string,
    name: string,
    picture: string
  ];
  timestamps: number;
}

export interface Val {
  _id: string;
  name: string;
  array: boolean;
  text: boolean;
  category: string;
  timestamps: number;
}

export interface Val_Array {
  _id: string;
  name: string;
  val_func_id: string;
  value: number;
  timestamps: number;
}

export interface Sub_Cat {
  _id: string;
  name: string;
  picture: string;
  category: string;
  timestamps: number;
}

@Injectable()
export class CategoryDataService {

  catList: Cat[] = [];
  valList: Val[] = [];
  subCatList: Sub_Cat[] = [];

  private _catUrl = environment.apiURL + '/category';
  private _rootCatUrl = environment.apiURL + '/sub-category';
  private _valUrl = environment.apiURL + '/val_func';
  private _selectUrl = environment.apiURL + '/array_val';
  private headers = new HttpHeaders({'Authorization':this._token.getBearerToken()});

  constructor(public _httpClient: HttpClient, private _token: TokenService) {}


  // Category Data

  getData() {
    return this._httpClient.get<Cat[]>(this._catUrl, {headers: this.headers})
  }

  getOneData(id: string) {
    return this._httpClient.get<Cat[]>(this._catUrl + '/' + id, {headers: this.headers})
  }

  putCat(name: string, _function: string, marge: number, root_cat: string, id: string) {
    const body = {name: name, function: _function, marge: marge, sub_category: root_cat};
    return this._httpClient.put<Cat[]>(this._catUrl + '/' + id, body, {headers: this.headers})
  }

  delData(id: string) {
    return this._httpClient.delete(this._catUrl + '/' + id, {headers: this.headers})
  }

  postCat(formData: any) {
    return this._httpClient.post<Cat[]>(this._catUrl, formData, {headers: this.headers})
  }



  // Root-Category Data

  getSubCatData(){
    return this._httpClient.get<Sub_Cat[]>(this._rootCatUrl, {headers: this.headers})
  }

  getSubCatOneData(id: string) {
    return this._httpClient.get<Sub_Cat[]>(this._rootCatUrl + '/' + id, {headers: this.headers})
  }

  postRootCat(formData: any){
    return this._httpClient.post<Sub_Cat[]>(this._rootCatUrl, formData, {headers: this.headers})
  }

  putSubCat(name: string, id: string) {
    const body = {name: name};
    return this._httpClient.put<Sub_Cat[]>(this._rootCatUrl + '/' + id, body, {headers: this.headers})
  }

  delSubCatData(id: string) {
    return this._httpClient.delete(this._rootCatUrl + '/' + id, {headers: this.headers})
  }



  // Array Value Data

  getAllValFuncArrayData() {
    return this._httpClient.get<Val_Array[]>(this._selectUrl, {headers: this.headers})
  }

  getValFuncArrayDataWithVal(id: string) {
    return this._httpClient.get<Val_Array[]>(this._selectUrl + '/val_func/' + id, {headers: this.headers})
  }

  delValArrayWithValId(id: string){
    return this._httpClient.delete(this._selectUrl + '/val_func/' + id, {headers: this.headers})
  }

  delValArray(id: string){
    return this._httpClient.delete(this._selectUrl + '/' + id, {headers: this.headers})
  }

  postValFuncArray(name: string, value: number, valId: string) {
    const body = {name: name, value: value, val_func_id: valId};
    return this._httpClient.post(this._selectUrl, body, {headers: this.headers})
  }

  putValFuncArray(name: string, value: string, valArrayId: string) {
    const body = {name: name, value: value};
    return this._httpClient.put<Val_Array[]>(this._selectUrl + '/' + valArrayId, body, {headers: this.headers})
  }


  // Val Func Data

  getValFuncDataWithCat(id: string) {
    return this._httpClient.get<Val[]>(this._valUrl + '/category/' + id, {headers: this.headers})
  }

  delVal(id: string){
    return this._httpClient.delete(this._valUrl + '/' + id, {headers: this.headers})
  }

  delValWithCatId(id: string) {
    return this._httpClient.delete(this._valUrl + '/category/' + id, {headers: this.headers})
  }

  postVal(name: string, array: boolean, text: boolean, catId: string) {
    const body = {name: name, array: array, text: text, catID: catId};
    return this._httpClient.post<Val[]>(this._valUrl, body, {headers: this.headers})
  }

  putVal(name: string, valId: string) {
    const body = {name: name};
    return this._httpClient.put<Val[]>(this._valUrl + '/' + valId, body, {headers: this.headers})
  }

}
