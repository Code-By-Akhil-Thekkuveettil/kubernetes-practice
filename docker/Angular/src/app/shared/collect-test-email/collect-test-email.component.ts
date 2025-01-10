import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-collect-test-email',
  standalone: true,
  imports: [MatDialogModule,MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './collect-test-email.component.html',
  styleUrl: './collect-test-email.component.css'
})
export class CollectTestEmailComponent {
  testEmail : any;
  constructor(
    public dialogRef: MatDialogRef<CollectTestEmailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onConfirm(): void {
    this.dialogRef.close(this.testEmail);
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }
}
