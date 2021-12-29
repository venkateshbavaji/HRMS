import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LeaveModel } from './leave.model';
import { LeaveService } from './leave.service';

@Component({
  selector: 'app-leave',
  templateUrl: './leave.component.html',
  styleUrls: ['./leave.component.css']
})
export class LeaveComponent implements OnInit {
  lstLeave: LeaveModel[] = [];
  leaveModel = new LeaveModel();
  title = "Add Leave";
  leaveForm = new FormGroup({
    leaveId: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    fromDate: new FormControl('', Validators.required),
    noOfDays: new FormControl('', Validators.required),
    reason: new FormControl('', Validators.required),
    reportingPersonId: new FormControl('', Validators.required),
    status: new FormControl('', Validators.required),
    toDate: new FormControl('', Validators.required),
    userId: new FormControl('', Validators.required),
  })
  toasterService: any;
  get leaveId() {
    return this.leaveForm.get('leaveId');
  }
  get description() {
    return this.leaveForm.get('description');
  }
  get fromDate() {
    return this.leaveForm.get('fromDate');
  }
  get noOfDays() {
    return this.leaveForm.get('noOfDays');
  }
  get reason() {
    return this.leaveForm.get('reason');
  }
  get reportingPersonId() {
    return this.leaveForm.get('reportingPersonId');
  }
  get status() {
    return this.leaveForm.get('status');
  }
  get toDate() {
    return this.leaveForm.get('toDate');
  }
  get userId() {
    return this.leaveForm.get('userId');
  }
  constructor(private leaveService: LeaveService) { }

  ngOnInit(): void {
    this.loadData()
  }
  loadData() {
    this.leaveService.getAll()
      .subscribe(response => {
        console.log(response);
        this.lstLeave = response.map((data) => {
          return {
            leaveId: data.payload.doc.id,
            ...data.payload.doc.data() as LeaveModel
          }
        });
        let employeeId = localStorage.getItem('employeeId');
        let role = localStorage.getItem('role');
        if (role === 'manager') {
          this.lstLeave = this.lstLeave.filter(x => x.reportingPersonId === employeeId);
        }
        console.log(this.lstLeave);
      })
  }
  addLeave() {
    this.title = "Add Leave";
    this.leaveModel = new LeaveModel();
  }
  /*  editLeave(leaveModel: LeaveModel) {
     this.title = "Edit Leave";
     this.leaveModel = leaveModel;
   }
   deleteLeave(id: string) {
     if (confirm('Are you sure you want to delete')) {
       this.leaveService.delete(id)
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
   } */
  saveLeave() {
    if (this.leaveModel.leaveId) {
      this.leaveService.update(this.leaveModel.leaveId, this.leaveModel)
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
      this.leaveModel.reportingPersonId = localStorage.getItem('reportingPersonId');
      this.leaveModel.status = 'Pending';
      this.leaveModel.userId = localStorage.getItem('userId');
      this.leaveService.create(this.leaveModel)
        .then(response => {
          console.log(response);
          this.toasterService.success("Created successfully....")
        })
        .catch((error: Response) => {
          console.log(error);
          this.toasterService.error(error.statusText);
        })
    }
    this.leaveModel = new LeaveModel();
    this.loadData();
  }

}
