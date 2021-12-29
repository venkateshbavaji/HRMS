import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { EmployeeModel } from './employee.model';
import { EmployeeService } from './employee.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  lstEmployee: EmployeeModel[] = [];
  employeeModel = new EmployeeModel();
  title: string = "Add Employee";
  alertMessage: string = '';

  employeeForm = new FormGroup({
    departmentId: new FormControl('', Validators.required),
    emailAddress: new FormControl('', Validators.required),
    firstName: new FormControl('', Validators.required),
    fullName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    reportingPersonId: new FormControl('', Validators.required),
    role: new FormControl('', Validators.required)
  })
  get departmentId() {
    return this.employeeForm.get('departmentId');
  }
  get emailAddress() {
    return this.employeeForm.get('emailAddress');
  }
  get firstName() {
    return this.employeeForm.get('firstName');
  }
  get fullName() {
    return this.employeeForm.get('fullName');
  }
  get lastName() {
    return this.employeeForm.get('lastName');
  }
  get password() {
    return this.employeeForm.get('password');
  }
  get reportingPersonId() {
    return this.employeeForm.get('reportingPersonId');
  }
  get role() {
    return this.employeeForm.get('role');
  }

  constructor(private employeeService: EmployeeService, private toasterService: ToastrService) {

  }
  ngOnInit(): void {
    this.loadData()
  }
  loadData() {
    this.employeeService.getAll()
      .subscribe(response => {
        console.log(response);
        this.lstEmployee = response.map((data) => {
          return {
            id: data.payload.doc.id,
            ...data.payload.doc.data() as EmployeeModel
          }
        });
        console.log(this.lstEmployee);
      })
  }
  addEmployee() {
    this.title = "Add Employee";
    this.employeeModel = new EmployeeModel();
  }
  editEmployee(employeeModel: EmployeeModel) {
    this.title = "Edit Employee";
    this.employeeModel = new EmployeeModel;
  }
  deleteEmployee(departmentId: string) {
    if (confirm('Are you sure you want to delete')) {
      this.employeeService.delete(departmentId)
        .then(response => {
          console.log(response);
          this.toasterService.success("Delete successfully...")
        })
        .catch((error: Response) => {
          console.log(error);
          this.toasterService.error(error.statusText);
        })
      this.loadData();
    }
  }
  saveEmployee() {
    if (this.employeeModel.departmentId) {
      this.employeeService.update(this.employeeModel.departmentId, this.employeeModel)
        .then(response => {
          console.log(response);
          this.toasterService.success("Update successfully....");
        })
        .catch((error: Response) => {
          console.log(error);
          this.toasterService.error(error.statusText);
        })
    }
    else {
      // this.leaveModel.reportingPersonId = localStorage.getItem('reportingPersonId');
      // this.leaveModel.status = 'Pending';
      // this.leaveModel.userId = localStorage.getItem('userId');
      this.employeeService.create(this.employeeModel)
        .then(response => {
          console.log(response);
          this.toasterService.success("Created successfully....")
        })
        .catch((error: Response) => {
          console.log(error);
          this.toasterService.error(error.statusText);
        })
    }
    this.employeeModel = new EmployeeModel();
    this.loadData();
  }
}

