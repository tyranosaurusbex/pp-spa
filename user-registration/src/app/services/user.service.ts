import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { FormGroup } from '@angular/forms';



@Injectable({
  providedIn: 'root'
})
export class UserService {

  api = 'http://localhost:8080/users';
  constructor(private http: HttpClient) { }

  /**
   * Create new user
   * @param user User
   */
  createUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.api}/user`, user);
  }

  /**
   * Get all users from API
   */
  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.api}`);
  }

  /**
   * Call API to update user
   * @param user User to update
   */
  updateUser(id: number, user: User): Observable<void> {
    return this.http.put<void>(`${this.api}/user/${id}`, user);
  }

  /**
   * Get user by id
   * @param id user id
   */
  getById(id: number): Observable<User> {
    return this.http.get<User>(`${this.api}/${id}`);
  }

  /**
   * Helper function map form to user obj
   */
  mapFormToModel(form: FormGroup): User {
    const user: User = {
      firstName: form.get('firstname')?.value as string,
      lastName: form.get('lastname')?.value as string,
      dateOfBirth: form.get('dateOfBirth')?.value as unknown as Date,
      company: form.get('company')?.value as string,
      email: form.get('email')?.value as string,
      country: form.get('country')?.value as string,
      state: form.get('state')?.value as boolean
    };
    return user;
  }
}
