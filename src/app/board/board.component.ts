import { Component, inject, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { map, Observable } from 'rxjs';
import { AsyncPipe, NgForOf } from "@angular/common";


@Component({
  selector: 'app-board',
  imports: [NgForOf, AsyncPipe],
  templateUrl: './board.component.html',
  styleUrl: './board.component.scss'
})
export class BoardComponent implements OnInit {

  apiService = inject(ApiService);

  boards$: Observable<any> = new Observable<any[]>();

  ngOnInit(): void {
    this.getBoards();
  }

  getBoards() {
    this.boards$ = this.apiService.getBoards().pipe(
      map(response => response.data)
    );
  }

}
