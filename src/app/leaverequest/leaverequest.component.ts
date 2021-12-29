
import { Component, OnInit } from '@angular/core';
import { LeaveModel } from '../leave/leave.model';
import { LeaveService } from '../leave/leave.service';

@Component({
  selector: 'app-leave-request',
  templateUrl: './leaverequest.component.html',
  styleUrls: ['./leaverequest.component.css']
})
export class LeaveRequestComponent implements OnInit {

  lstLeave: LeaveModel[] = [];
  constructor(private leaveService: LeaveService) {

  }
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
  approveLeaveRequest(leaveModel: LeaveModel) {
    leaveModel.status = 'Approved';
    this.leaveService.update(leaveModel.leaveId, leaveModel);
  }
  rejectLeaveRequest(leaveModel: LeaveModel) {
    leaveModel.status = 'Rejected';
    this.leaveService.update(leaveModel.leaveId, leaveModel);
  }
}