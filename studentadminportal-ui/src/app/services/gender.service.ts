import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable,of, from } from 'rxjs';
import { Gender } from '../models/api-models/gender.model';

@Injectable({
  providedIn: 'root'
})
export class GenderService {

  private baseApiUrl = 'https://localhost:7091'

  constructor(private httpClient:HttpClient) { }

  getGenders(): Observable<Gender[]> {
    return this.httpClient.get<Gender[]>(this.baseApiUrl + '/genders')
  }
}
