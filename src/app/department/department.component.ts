
import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { DepartmentModel } from "./department.model";
import { DepartmentService } from "./department.service";

@Component({
  selector: 'department',
  templateUrl: './department.component.html'
})

export class DepartmentComponent implements OnInit {
  lstDepartment: DepartmentModel[] = [];
  departmentModel = new DepartmentModel();
  title: string = "Add Department";
  alertMessage: string = '';

  deptForm = new FormGroup({
    name: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
  })
  get name() {
    return this.deptForm.get('name');
  }
  get description() {
    return this.deptForm.get('description');
  }
  constructor(private deptService: DepartmentService, private toasterService: ToastrService) {

  }
  ngOnInit(): void {
    this.loadData()
  }
  loadData() {
    this.deptService.getAll()
      .subscribe(response => {
        console.log(response);
        this.lstDepartment = response.map((data) => {
          return {
            id: data.payload.doc.id,
            ...data.payload.doc.data() as DepartmentModel
          }
        });
        console.log(this.lstDepartment);
      })
  }
  addDepartment() {
    this.title = "Add Course";
    this.departmentModel = new DepartmentModel();
  }
  editDepartment(departmentModel: DepartmentModel) {
    this.title = "Edit Department";
    this.departmentModel = departmentModel;
  }
  deleteDepartment(id: string) {
    if (confirm('Are you sure you want to delete')) {
      this.deptService.delete(id)
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
  saveDepartment() {
    if (this.departmentModel.id) {
      this.deptService.update(this.departmentModel.id, this.departmentModel)
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
      this.deptService.create(this.departmentModel)
        .then(response => {
          console.log(response);
          this.toasterService.success("Created successfully....")
        })
        .catch((error: Response) => {
          console.log(error);
          this.toasterService.error(error.statusText);
        })
    }
    this.departmentModel = new DepartmentModel();
    this.loadData();
  }
}
