import { Employee } from './employee';
import { Injectable } from "@angular/core";
import {HttpClient} from "@angular/common/http"
import { Observable } from 'rxjs';
import { enviroment } from 'src/enviroment/enviroment';

@Injectable({
    providedIn: "root"
})
export class EmployeeService {
    constructor(private http: HttpClient){

    }

    apiUrl:String = enviroment.api;

    public getEmployee(): Observable<Employee[]> {
        return this.http.get<any>(`${this.apiUrl}/api/all`);
    }

    public addEmployee(employee : Employee): Observable<Employee>{
        return this.http.post<Employee>(`${this.apiUrl}/api/add`, employee);
    }

    public updateEmployee(employee :Employee): Observable<Employee>{
        return this.http.put<Employee>(`${this.apiUrl}/api/update`,employee)
    }

    public deleteEmployee(id :Number | undefined | null): Observable<void>{
        return this.http.delete<void>(`${this.apiUrl}/api/delete/${id}`);
    }
}