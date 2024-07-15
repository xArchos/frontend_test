import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Data } from "../../../public/models";

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private dataUrl: string = 'data.json';

  constructor(private http: HttpClient) {}

  getData(): Observable<Data> {
    return this.http.get<Data>(this.dataUrl);
  }
}
