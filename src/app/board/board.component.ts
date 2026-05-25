import { Component, inject, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { map, Observable } from 'rxjs';
import { AsyncPipe, DatePipe, NgForOf } from "@angular/common";
import { ActivatedRoute } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';


@Component({
  selector: 'app-board',
  imports: [DatePipe, NgForOf, AsyncPipe, MatCardModule, MatChipsModule],
  templateUrl: './board.component.html',
  styleUrl: './board.component.scss'
})
export class BoardComponent implements OnInit {

  apiService = inject(ApiService);
  route = inject(ActivatedRoute);
  board: any;
  tasks$: Observable<any[]> = new Observable<any[]>();

  ngOnInit(): void {
    const boardId = this.route.snapshot.params['boardId'];
    this.apiService.getBoard(boardId).subscribe(res => {
      this.board = res;
    })
    this.tasks$ = this.apiService.getTasks(boardId).pipe(
      map(res => res.data)
    );
  }


}
