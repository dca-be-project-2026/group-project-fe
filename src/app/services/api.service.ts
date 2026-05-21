import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

interface BoardsResponse {
  data: any[];
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  getBoards() {
    return this.http.get<BoardsResponse>('http://localhost:3000/boards');
  }

  createBoard(name: string) {
    return this.http.post<BoardsResponse>('http://localhost:3000/boards', { name })
  }

  deleteBoard(id: string) {
    return this.http.delete<BoardsResponse>(`http://localhost:3000/boards/${id}`)
  }

}
