import { Component, inject, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { map, Observable } from 'rxjs';
import { AsyncPipe, DatePipe, NgForOf } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-boards',
  imports: [NgForOf, AsyncPipe, MatCardModule, MatChipsModule, DatePipe, FormsModule],
  templateUrl: './boards.component.html',
  styleUrl: './boards.component.scss'
})
export class BoardsComponent implements OnInit {

  apiService = inject(ApiService);
  router = inject(Router);

  name: string = '';

  boards$: Observable<any> = new Observable<any[]>();

  ngOnInit(): void {
    this.getBoards();
  }

  getBoards() {
    this.boards$ = this.apiService.getBoards();
  }

  createBoard(name: string) {
    this.apiService.createBoard(name).subscribe(() => this.getBoards());
  }

  openBoard(id: string) {
    this.router.navigate(['/boards', id])
  }

  deleteBoard(id: string) {
    if (!confirm('Möchtest du dieses Board wirklich löschen?')) return;
    this.apiService.deleteBoard(id).subscribe({
      next: () => {
        this.getBoards();
      },
      error: (err) => console.error(err)
    });
  }

}
