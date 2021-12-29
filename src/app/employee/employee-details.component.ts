import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { EmployeeModel } from "./employee.model";
import { EmployeeService } from "./employee.service";


@Component({
    selector: 'employee-details',
    templateUrl: './employee-details.component.html'
})
export class EmployeeDetailsComponent implements OnInit {
    employeeModel = new EmployeeModel();
    constructor(private activatedRoute: ActivatedRoute, private employeeService: EmployeeService) { }

    ngOnInit(): void {
        let departmentId = this.activatedRoute.snapshot.paramMap.get('departmentId');
        this.employeeService.getById(departmentId)
            .subscribe(response => {
                this.employeeModel = response;
                console.log('121');
            })
    }



    /* departmentModel = new DepartmentModel();
    constructor(private activatedRoute: ActivatedRoute, private deptService: DepartmentService) { }

    ngOnInit(): void {
        let id = this.activatedRoute.snapshot.paramMap.get('id');
        this.deptService.getById(id)
            .subscribe(response => {
                this.departmentModel = response;
                console.log('121');
            })
    } */


}