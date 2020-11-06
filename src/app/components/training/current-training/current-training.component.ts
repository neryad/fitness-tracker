import { TrainingService } from './../../../services/trainig.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { StopTrainingComponent } from './stop-training.component';
@Component({
  selector: 'app-current-training',
  templateUrl: './current-training.component.html',
  styleUrls: ['./current-training.component.css'],
})
export class CurrentTrainingComponent implements OnInit {
  progress = 0;
  timer: number;
  constructor(
    private dialog: MatDialog,
    private trainingServices: TrainingService
  ) {}

  ngOnInit(): void {
    this.starrOrResumeTimer();
  }

  starrOrResumeTimer(): void {
    const step =
      (this.trainingServices.getRunningExcerse().duration / 100) * 1000;
    this.timer = setInterval(() => {
      this.progress = this.progress + 1;
      if (this.progress >= 100) {
        this.trainingServices.completeExercise();
        clearInterval(this.timer);
      }
    }, step);
  }

  onStop(): void {
    clearInterval(this.timer);
    const dialogRef = this.dialog.open(StopTrainingComponent, {
      data: { progress: this.progress },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.trainingServices.cancelExercise(this.progress);
      } else {
        this.starrOrResumeTimer();
      }
    });
  }

  // openDialog() {}
}
