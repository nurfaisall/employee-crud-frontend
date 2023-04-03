import { Component, OnInit } from '@angular/core';
import { Employee } from './employee';
import { EmployeeService } from './employee.service';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  public employees: Employee[] = [];

  public data: Employee[] = [];

  public editEmployee: Employee | undefined | null;

  public deleteEmployee: Employee | undefined | null;

  public searchEmployee: Employee[] = [];

  title: String = "hello world";

  constructor(private employeeService: EmployeeService) {

   }


  ngOnInit(): void {
    this.getEmployee();
  }

  public search(key: String):void{
    console.log(key)
    const result: Employee[] = [];
    for(const employee of this.data){
      if(employee.name.toLocaleLowerCase().indexOf(key.toLowerCase()) != -1){
        result.push(employee);
      }
      
    }
    this.employees = result;
    
    if(!key){
      this.getEmployee();
    }
  }

  public getEmployee(): void {
    this.employeeService.getEmployee().subscribe(
      (response: Employee[]) => {
         this.employees = response;
         this.data = response;
         console.log(this.data)
        }),
      (error: HttpErrorResponse) => {
        alert(error.message)
      }
  }

  public modalLogic(employee :Employee | null, mode: String){
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.setAttribute('data-bs-toggle', 'modal');
    button.style.display = 'none';
    if(mode == 'add'){
      button.setAttribute('data-bs-target', '#addModal');
    }
    if(mode == 'update'){
      this.editEmployee = employee;
      button.setAttribute('data-bs-target', '#updateModal');
    }
    if(mode == 'delete'){
      this.deleteEmployee = employee;
      button.setAttribute('data-bs-target', '#deleteModal');
    }
    container?.appendChild(button)
    button.click();
  }

  public onAddEmployee(addForm: NgForm): void{
    document.getElementById('add-employee-button')?.click();
    this.employeeService.addEmployee(addForm.value).subscribe(
      (response :Employee) => {
        console.log(response);
        this.getEmployee();
      }, (error :HttpErrorResponse) => {
        alert(error.message)
      }
      )

  }

  public onUpdateEmployee(employee: Employee): void{
    document.getElementById('update-employee-button')?.click();
    this.employeeService.updateEmployee(employee).subscribe(
      (response: Employee) => {
        console.log(response);
        this.getEmployee();
      }, 
      (error :HttpErrorResponse) => {
        alert(error.message)
        console.log(employee);
      }
      )
  }

  public onDeleteEmployee(id: Number | null | undefined){
    this.employeeService.deleteEmployee(id).subscribe(
      (response :void) => {
        console.log("sudah terhapus")
        this.getEmployee();
      }, (error : HttpErrorResponse) => {
        alert(error.message)
      }
    )

  }

//    data: Employee[] = [];
//    searchData: Employee[] = [];

// public searching(key: String){
//   for(const employee of this.employees){
//     if(employee.name.toLowerCase().indexOf(key.toLocaleLowerCase())){
//       this.searchData.push(employee)
//     }
//     this.data = this.searchData;

//     if(this.employees.length == 0 || !key){
//       this.getEmployee();
//     }
//   }
// }
}


