import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-delete-confirm-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule, MatIconModule],
  template: `
    <div class="dialog-container glass-card">
      <div class="dialog-header">
        <div class="warning-icon">
          <mat-icon>warning</mat-icon>
        </div>
        <h2 mat-dialog-title>Confirm Deletion</h2>
      </div>
      
      <mat-dialog-content class="dialog-content">
        <p>You are about to remove <strong>{{ data.name }}</strong> from the enterprise directory.</p>
        <p class="warning-text">This action is permanent and cannot be undone.</p>
      </mat-dialog-content>

      <mat-dialog-actions align="end" class="dialog-actions">
        <button mat-button (click)="onNoClick()" class="cancel-btn">
          Discard
        </button>
        <button mat-raised-button color="warn" [mat-dialog-close]="true" class="delete-btn">
          Confirm Deletion
        </button>
      </mat-dialog-actions>
    </div>
  `,
  styles: [`
    .dialog-container {
      padding: 10px;
      overflow: hidden;
    }
    .dialog-header {
      display: flex;
      align-items: center;
      gap: 15px;
      margin-bottom: 20px;
    }
    .warning-icon {
      width: 45px;
      height: 45px;
      background: rgba(244, 67, 54, 0.1);
      color: #f44336;
      border-radius: 12px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    h2 {
      margin: 0 !important;
      font-weight: 700;
      color: #fff;
    }
    .dialog-content {
      color: var(--text-secondary);
      font-size: 1rem;
      line-height: 1.5;
    }
    .warning-text {
      color: #f44336;
      font-weight: 500;
      font-size: 0.9rem;
      margin-top: 10px;
    }
    .dialog-actions {
      padding: 20px 0 10px;
      border-top: 1px solid var(--glass-border);
      margin-top: 20px;
    }
    .cancel-btn { color: var(--text-secondary); }
    .delete-btn {
      height: 45px;
      padding: 0 25px !important;
      border-radius: 8px;
      font-weight: 600;
    }
  `]
})
export class DeleteConfirmDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<DeleteConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { name: string }
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
