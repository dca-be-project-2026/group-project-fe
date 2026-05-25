import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

interface BoardsResponse {
  data: any[];
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  API_URL = 'http://localhost:3000'

  constructor(private http: HttpClient) { }

  getBoards() {
    return this.http.get<BoardsResponse>(this.API_URL + '/boards');
  }

  getBoard(id: string) {
    return this.http.get<{data: any}>(`${this.API_URL}/boards/${id}`);
  }

  getTasks(boardId: string) {
    return this.http.get<{data: any}>(`${this.API_URL}/boards/${boardId}/tasks`);
  }

  createBoard(name: string) {
    return this.http.post<BoardsResponse>(this.API_URL + '/boards', { name })
  }

  deleteBoard(id: string) {
    return this.http.delete<BoardsResponse>(`${this.API_URL}/boards/${id}`)
  }

}
