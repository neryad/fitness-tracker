import { Exercise } from './../../../models/exercie.model';
import { TrainingService } from './../../../services/trainig.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css'],
})
export class NewTrainingComponent implements OnInit {
  @Output() trainingStart = new EventEmitter();
  exercises: Exercise[] = [];

  constructor(private trainingService: TrainingService) {}

  ngOnInit(): void {
    this.exercises = this.trainingService.getAvialbelExercises();
  }

  onStartTraining(): void {
    this.trainingStart.emit();
  }
}
