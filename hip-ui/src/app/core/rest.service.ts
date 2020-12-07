import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HipRequest } from '../shared/model/HipRequest'

const endpoint = 'http://localhost:443';

@Injectable({
  providedIn: 'root'
})

export class RestService {

  constructor(private http: HttpClient) { }

  public getRequests(): Observable<HipRequest[]>{
    return this.http.get<HipRequest[]>(endpoint + '/v1/requests')
  }

  public cancelRequest(id): Observable<HipRequest> {
    return this.http.put<HipRequest>(endpoint + '/v1/requests/' + id, { state: 'cancel'})
  }

  
}
