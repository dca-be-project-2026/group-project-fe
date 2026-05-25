import { Component, inject, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { map, Observable } from 'rxjs';
import { AsyncPipe, DatePipe, NgForOf } from "@angular/common";
import { ActivatedRoute } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { AddTaskComponent } from '../add-task/add-task.component';


@Component({
  selector: 'app-board',
  imports: [DatePipe, NgForOf, AsyncPipe, MatCardModule, MatChipsModule, MatDialogModule],
  templateUrl: './board.component.html',
  styleUrl: './board.component.scss'
})
export class BoardComponent implements OnInit {

  readonly dialog = inject(MatDialog);

  openAddTask(boardId: string) {
    const dialogRef = this.dialog.open(AddTaskComponent, { data: { boardId } });

    dialogRef.afterClosed().subscribe(result => {
      if(result) this.loadTasks();
  });
}

apiService = inject(ApiService);
route = inject(ActivatedRoute);
board: any;
tasks$: Observable<any[]> = new Observable<any[]>();

loadTasks() {
  const boardId = this.route.snapshot.params['boardId'];
  this.apiService.getBoard(boardId).subscribe(res => {
    this.board = res;
  })
  this.tasks$ = this.apiService.getTasksForBoard(boardId).pipe(
    map(res => res.data)
  )
}

ngOnInit(): void {
  this.loadTasks();
}


deleteTask(taskId: string) {
  this.apiService.deleteTask(taskId).subscribe(() => this.loadTasks());
}


}
