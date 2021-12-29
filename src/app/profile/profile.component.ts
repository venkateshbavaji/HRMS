import { Component, OnInit } from '@angular/core';
import { EmployeeModel } from '../employee/employee.model';
import { EmployeeService } from '../employee/employee.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  employee = new EmployeeModel();
  constructor(private empService: EmployeeService) {

  }

  ngOnInit(): void {
    let employeeId = localStorage.getItem('employeeId');
    console.log(employeeId);
    this.empService.getById(employeeId)
      .subscribe(
        (response) => {
          this.employee = response
          console.log(response);
        });
  }
}
