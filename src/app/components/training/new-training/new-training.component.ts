import { AngularFirestore } from '@angular/fire/firestore';

import { NgForm } from '@angular/forms';
import { Exercise } from './../../../models/exercie.model';
import { TrainingService } from './../../../services/trainig.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css'],
})
export class NewTrainingComponent implements OnInit, OnDestroy {
  exercises: Exercise[];
  exerciseSubs: Subscription;

  constructor(private trainingService: TrainingService) {}
  ngOnDestroy(): void {
    this.exerciseSubs.unsubscribe();
  }

  ngOnInit(): void {
    this.exerciseSubs = this.trainingService.exercisesChanged.subscribe(
      (exercises) => (this.exercises = exercises)
    );
    this.trainingService.fechtAvialbelExercises();
  }

  onStartTraining(form: NgForm): void {
    this.trainingService.starrEcerice(form.value.exercise);
  }
}
