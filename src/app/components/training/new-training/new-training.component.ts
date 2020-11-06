import { NgForm } from '@angular/forms';
import { Exercise } from './../../../models/exercie.model';
import { TrainingService } from './../../../services/trainig.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css'],
})
export class NewTrainingComponent implements OnInit {
  exercises: Exercise[] = [];

  constructor(private trainingService: TrainingService) {}

  ngOnInit(): void {
    this.exercises = this.trainingService.getAvialbelExercises();
  }

  onStartTraining(form: NgForm): void {
    this.trainingService.starrEcerice(form.value.exercise);
  }
}
