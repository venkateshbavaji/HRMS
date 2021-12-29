import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { EmployeeModel } from "./employee.model";

@Injectable({ providedIn: 'root' })
export class EmployeeService {
    constructor(private fireStore: AngularFirestore) {

    }
    getAll() {
        return this.fireStore.collection('employee').snapshotChanges();
    }
    getById(departmentId: string) {
        console.log(departmentId);
        return this.fireStore.doc<EmployeeModel>('employee/' + departmentId).valueChanges();
    }
    create(employeeModel: EmployeeModel) {
        return this.fireStore.collection('employee').add({ ...employeeModel });
    }
    update(departmentId: string, employeeModel: EmployeeModel) {
        return this.fireStore.doc('employee/' + departmentId).update({ ...employeeModel });
    }
    delete(departmentId: string) {
        return this.fireStore.doc('employee/' + departmentId).delete();
    }
}
