import { Component, OnInit } from '@angular/core';
import { EmpService } from '../../services/emp.service';
import { TokenStorageService } from '../../services/token-storage.service';
import { Emp } from '../../model/emp';

@Component({
  selector: 'app-emp-list',
  templateUrl: './emp-list.component.html',
  styleUrl: './emp-list.component.css',
})
export class EmpListComponent implements OnInit {
  employees?: any;
  errormessage?: string;
  currentEmployee: Emp = new Emp(0, '', 0, '');
  currentIndex = -1;
  name = '';
  isAdmin: boolean = false;

  constructor(
    private empService: EmpService,
    private tokenStorageService: TokenStorageService
  ) {}
  ngOnInit(): void {
    this.empService.getAll().subscribe({
      next: (data) => {
        this.employees = data;
        if (this.tokenStorageService.hasRole('ADMIN')) {
          this.isAdmin = true;
        }
      },

      error: (err) => {
        this.errormessage = JSON.parse(err.error).message;
      },

      complete: () => console.log('completed'),
    });
  }
}
