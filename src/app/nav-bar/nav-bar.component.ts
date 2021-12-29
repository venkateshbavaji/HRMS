import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeModel } from '../employee/employee.model';
import { EmployeeService } from '../employee/employee.service';

@Component({
  selector: 'nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  IsLoggedIn: boolean = false;
  //employeeModel = new EmployeeModel();



  constructor(private router: Router, private activatedRoute: ActivatedRoute, private employeeService: EmployeeService) {
    let employeeId = localStorage.getItem('employeeId');
    if (employeeId) {
      this.IsLoggedIn = true;
      this.router.navigate(['/home']);
    }
  }


  ngOnInit(): void {
    /*   let departmentId = this.activatedRoute.snapshot.paramMap.get('departmentId');
      this.employeeService.getById(departmentId)
        .subscribe(response => {
          this.employeeModel = response;
          console.log(this.employeeModel.fullName);
        }) */
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']).then(() => {
      window.location.reload();
    });
  }

}
