import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EmployeeService } from '../employee.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NotificationBarService } from '../notification-bar/notification-bar.service';
import { NotificationBarModel, NotificationBarType } from '../notification-bar/notification-bar.model';
// import { NotifyService } from 'notify-angular/notify.service';
// import { NotifyModule, NotifyService } from 'notify-angular';

@Component({
  selector: 'app-emp-add-edit',
  templateUrl: './emp-add-edit.component.html',
  styleUrls: ['./emp-add-edit.component.css'],
})
export class EmpAddEditComponent implements OnInit {
  empForm: FormGroup;
  error = false;
  info = false;
  success = false;
  warning = false;
  education: string[] = [
    'Matric',
    'Diploma',
    'Intermediate',
    'Graduate',
    'Post Graduate',
  ];

  taskStatus: string[] = [
    'Design',
    'UC Review',
    'Development',
    'Review',
    'Test',
    'Completed',
    'Rejected'
  ];
  showSuccessMsg = false;
  constructor(
    private empService: EmployeeService,
    private dialogRef: MatDialogRef<EmpAddEditComponent>,
    private formBuilder: FormBuilder,
    // private notify: NotifyService,
    public notificationBarService: NotificationBarService,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.empForm = this.formBuilder.group({
      // firstName: ['', Validators.required],
      taskName: ['', Validators.required],
      taskDescription: ['', Validators.required],
      taskStatus: ['', Validators.required],
      taskAssignee: ['', Validators.required],
      // lastName: [],
      // email: [],
      // dob: [],
      // gender: [],
      // education: [],
      // company: [],
      // experience: [],
      // salary: []
    });
  }

  ngOnInit(): void {
    this.empForm.patchValue(this.data);
  }

  onSubmit() {
    this.showSuccessMsg = false;
    if (this.empForm.valid) {
      if (this.data) {
        this.empService
          .updateEmployee(this.data.id, this.empForm.value)
          .subscribe({
            next: (val: any) => {
              alert('Employee details updated!');
              this.dialogRef.close(true);
            },
            error: (err: any) => {
              console.error(err);
              alert("Error while updating the employee!");
            },
          });
      } else {
        this.empService.addEmployee(this.empForm.value).subscribe({
          next: (val: any) => {
            // this.notify.success('Employee added successfully!');
            alert('Employee added successfully!');
            // this._snackBar.open("Employee added successfully!", "Success");
            this.showSuccessMsg = true;
            this.empForm.reset();
            this.dialogRef.close(true);
          },
          error: (err: any) => {
            console.error(err);
            alert("Error while adding the employee!");
          },
        });
      }
    }
  }

  onNotificationAction(event: NotificationBarModel) {
    console.log('onNotificationAction->', event)
  }
}
