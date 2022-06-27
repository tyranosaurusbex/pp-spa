import { Component, OnInit, ViewChild } from '@angular/core';
import { UserFormComponent } from '../user-form/user-form.component';
import { UserService } from 'src/app/services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {

  @ViewChild(UserFormComponent, { static: true }) public userFormComponent!: UserFormComponent;
  constructor(private userService: UserService,
    private snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  registerNewUser() {
    const user = this.userService.mapFormToModel(this.userFormComponent.form);
    this.userService.createUser(user).subscribe((user: User) => {
      this.userFormComponent.formGroupDirective.resetForm(); 
      this.snackBar.open('User successfully registered', '', {
          horizontalPosition: 'right',
          verticalPosition: 'top',
          duration: 5000,
        });  
    });
  }

}
