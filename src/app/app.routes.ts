import { Routes } from '@angular/router';
import { BoardsComponent } from './boards/boards.component';
import { BoardComponent } from './board/board.component';

export const routes: Routes = [
    { path: '', component: BoardsComponent },
    { path: 'boards/:boardId', component: BoardComponent}
];
