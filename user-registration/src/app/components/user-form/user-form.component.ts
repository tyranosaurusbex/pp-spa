import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { FormControl, Validators, FormBuilder, FormGroup, FormGroupDirective } from '@angular/forms';
import { COUNTRIES } from 'src/assets/constants';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {
  countries = COUNTRIES;
  @ViewChild(FormGroupDirective) formGroupDirective!: FormGroupDirective;

  form = this.fb.group({ 
    firstname: new FormControl('', [Validators.required]),
    lastname: new FormControl('', [Validators.required]),
    dateOfBirth: new FormControl('' as unknown as Date, [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
    company: new FormControl('', [Validators.required]),
    country: new FormControl('', [Validators.required]),
    state: new FormControl(false, [Validators.required])
  });
  
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
  }

  /**
   * Return custom error for email format
   */
  getErrorMessage() {
    return this.form.get('email')?.hasError('pattern') ? 'Please enter valid email format' : '';
  }

}
