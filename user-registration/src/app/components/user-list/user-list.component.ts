import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { User } from 'src/app/models/user';
import { MatPaginator } from '@angular/material/paginator';
import { UserService } from 'src/app/services/user.service';
import { UserFormComponent } from '../user-form/user-form.component';
import { UserFormDialogComponent } from '../user-form-dialog/user-form-dialog.component';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'dateOfBirth', 'company', 'email', 'country', 'state', 'actions'];
  dataSource = new MatTableDataSource<User>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private userService: UserService,
              public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getUsers();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.filterPredicate();
  }

  /**
   * Make request to get all users from API
   */
  getUsers() {
    this.userService.getAllUsers().subscribe((users: User[]) => {
      this.dataSource = new MatTableDataSource(users);
      this.dataSource.paginator = this.paginator;
    });
  }

  /**
   * Definate custom filter predicate for searching by id only
   */
  filterPredicate() {
    // ensure str search converted to Number for comparison
    this.dataSource.filterPredicate = (user, filter: string): boolean => {
      const parseFilter = Number(filter);
      return user.id === parseFilter;
    };
  }

  /**
   * Apply filter to data table
   * @param event event
   */
  applyFilter(event: Event) {
    let filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue;
    this.filterPredicate();
    this.dataSource.paginator = this.paginator;
  }

  /**
   * Open dialog to edit user
   * @param id id of user
   */
  openEditDialog(user: User): void {
    console.log('open dialog', user)
    const dialog = this.dialog.open(UserFormDialogComponent, {
      width: '800px',
      data: {
        user: user // pass in our user to set form data
      },
    });

    // listen for when dialog closes, refresh table data
    dialog.afterClosed().subscribe(() => {
      this.getUsers();
    });
  }
}
