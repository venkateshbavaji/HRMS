import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { LeaveModel } from "./leave.model";
import { LeaveService } from "./leave.service";


@Component({
    selector: 'leave-details',
    templateUrl: './leave-details.component.html'
})
export class LeaveDetailsComponent implements OnInit {
    leaveModel = new LeaveModel();
    constructor(private activatedRoute: ActivatedRoute, private leaveService: LeaveService) { }

    ngOnInit(): void {
        let leaveId = this.activatedRoute.snapshot.paramMap.get('leaveId');
        this.leaveService.getById(leaveId)
            .subscribe(response => {
                this.leaveModel = response;
                console.log('121');
            })
    }

}