import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { delay, Observable } from 'rxjs';
import { UserInfo } from '../models/basicInfoUser';
import { StorageService } from './storage.service';
import { TableDataResponse } from '../models/catalogTableData';
import { Categories, DetailedAPI, Endpoints, Param, SpecificEndpoint, Response } from '../models/detailedApiData';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor(
    private http: HttpClient,
    private storageService: StorageService
  ) {}

  verifyGoogle(body: any): Observable<any> {
    return this.http
      .post('http://localhost:4000/users/auth/google', body)
      .pipe(delay(1000));
  }

  verifyMS(body: any): Observable<any> {
    return this.http
      .post('http://localhost:4000/users/auth/ms', body)
      .pipe(delay(1000));
  }

  registerUser(body: any) {
    return this.http.post('http://localhost:4000/users', body);
  }

  getUserData(data: any): Observable<UserInfo[]> {
    let params = new HttpParams();
    params = params.append('email', data);
    return this.http.get<UserInfo[]>('http://localhost:4000/users/email/', {
      params: params,
    });
  }

  setJsonValue(key: string, value: UserInfo) {
    this.storageService.secureStorage.setItem(key, value);
  }

  getJsonValue(key: string) {
    return this.storageService.secureStorage.getItem(key);
  }

  clearToken() {
    return this.storageService.secureStorage.clear();
  }

  getEntries(): Observable<TableDataResponse> {
    return this.http.get<TableDataResponse>("http://localhost:4000/apis/table");
  }

  getDetailedAPI(id_api:Number): Observable<DetailedAPI> {
    return this.http.get<DetailedAPI>("http://localhost:4000/apis/" + id_api);
  }

  sendGetRequest(url: string) {
    return this.http.get(url);
  }

  sendPostRequest(url: string) {
    return this.http.post(url, {});
  }

  public postAPI(body:any){
    return this.http.post("http://localhost:4000/apis", body);
  }

  getCategoriesByID(id_api:Number){
    return this.http.get<Categories[]>("http://localhost:4000/categories/" + id_api);
  }

  getEndpointsByCat(){
    return this.http.get<Endpoints[]>("http://localhost:4000/endpoints/");
  }

  getSpecificEndpointByID(id_end:Number){
    return this.http.get<SpecificEndpoint>("http://localhost:4000/endpoints/" + id_end);
  }

  getEndpointParams(id_end:Number){
    return this.http.get<Param[]>("http://localhost:4000/query/" + id_end);
  }

  getEndpointResponse(id_end:Number){
    return this.http.get<Response[]>("http://localhost:4000/response/" + id_end);
  }

}