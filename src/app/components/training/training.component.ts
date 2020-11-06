import { TrainingService } from './../../services/trainig.service';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.css'],
})
export class TrainingComponent implements OnInit {
  onGoingTraining = false;
  exerceseSubscription: Subscription;

  constructor(private trainingServices: TrainingService) {}

  ngOnInit(): void {
    this.exerceseSubscription = this.trainingServices.exervisechanged.subscribe(
      (execersice) => {
        if (execersice) {
          this.onGoingTraining = true;
        } else {
          this.onGoingTraining = false;
        }
      }
    );
  }
}
