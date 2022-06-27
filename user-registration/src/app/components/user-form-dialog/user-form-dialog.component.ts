import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { UserFormComponent } from '../user-form/user-form.component';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-user-form-dialog',
  templateUrl: './user-form-dialog.component.html',
  styleUrls: ['./user-form-dialog.component.scss']
})
export class UserFormDialogComponent implements OnInit {
  @ViewChild(UserFormComponent, { static: true }) public userFormComponent!: UserFormComponent;

  form!: FormGroup;
  userId!: number;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
  public dialogRef: MatDialogRef<UserFormDialogComponent>,
  private userService: UserService) {
    console.log('data to dialog', data)
    this.userId = data.user.id as number;
  }

  ngOnInit(): void {
    this.userService.getById(this.userId).subscribe((user: User) => {
      console.log(user)
      this.userFormComponent.form.setValue({ 
        firstname: user.firstName,
        lastname: user.lastName,
        dateOfBirth: user?.dateOfBirth as Date,
        email: user.email,
        company: user.company,
        country: user.country,
        state: user.state
      });
    })
  }

  /**
   * Call API to update user
   */
  updateUser() {
    const user = this.userService.mapFormToModel(this.userFormComponent.form);
    this.userService.updateUser(this.userId, user).subscribe(() => {
      this.dialogRef.close();
    });
  }
}
