import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormBuilder, FormGroup } from '@angular/forms';
import { COUNTRIES } from 'src/assets/constants';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {
  countries = COUNTRIES;
  form = this.fb.group({ 
    firstname: new FormControl('', [Validators.required]),
    lastname: new FormControl('', [Validators.required]),
    // dobDay: new FormControl('', [Validators.required]),
    // dobMonth: new FormControl('', [Validators.required]),
    // dobYear: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    company: new FormControl('', [Validators.required]),
    country: new FormControl('', [Validators.required]),
    state: new FormControl(false, [Validators.required])

  });
  
  constructor(private fb: FormBuilder,
    private userService: UserService) { }

  ngOnInit(): void {

    console.log(this.form.valid);
  }

  registerNewUser() {
    const user = this.mapFormToModel();
    this.userService.createUser(user).subscribe((user: User) => {
      console.log('created', user);
    });
  }

  mapFormToModel(): User {
    const user: User = {
      firstName: this.form.get('firstname')?.value as string,
      lastName: this.form.get('lastname')?.value as string,
      dateOfBirth: new Date(),
      company: this.form.get('company')?.value as string,
      email: this.form.get('email')?.value as string,
      country: this.form.get('country')?.value as string,
      state: this.form.get('state')?.value as boolean
    };
    return user;
  }

  getErrorMessage() {
    if (this.form.get('email')?.hasError('required')) {
      return 'You must enter a value';
    }

    return this.form.get('email')?.hasError('email') ? 'Not a valid email' : '';
  }

}
