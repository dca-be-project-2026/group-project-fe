import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogModule, MatDialogRef } from "@angular/material/dialog";
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-add-task',
  imports: [MatDialogActions, MatDialogModule, MatFormFieldModule, MatInputModule, MatSelectModule, ReactiveFormsModule],
  templateUrl: './add-task.component.html',
  styleUrl: './add-task.component.scss'
})
export class AddTaskComponent {

  apiService = inject(ApiService);
  data = inject(MAT_DIALOG_DATA);
  dialogRef = inject(MatDialogRef<AddTaskComponent>);

  form = new FormGroup({
    title: new FormControl(''),
    description: new FormControl(''),
    status: new FormControl('todo'),
    priority: new FormControl('medium'),
    dueDate: new FormControl('')
  });

  submit() {
    const form = {
      title: this.form.value.title,
      description: this.form.value.description,
      status: this.form.value.status,
      priority: this.form.value.priority,
      dueDate: this.form.value.dueDate
    }
    this.apiService.addTask(this.data.boardId, form).subscribe(() => { this.dialogRef.close(true) });
  }
}
