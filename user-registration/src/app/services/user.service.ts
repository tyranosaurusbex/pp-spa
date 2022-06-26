import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { User } from '../models/user';



@Injectable({
  providedIn: 'root'
})
export class UserService {

  api = 'http://localhost:8080/users';
  constructor(private http: HttpClient) { }

  createUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.api}/user`, user);
  }
}
