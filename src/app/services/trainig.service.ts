import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Exercise } from './../models/exercie.model';
import { map } from 'rxjs/operators';
@Injectable()
export class TrainingService {
  exervisechanged = new Subject<Exercise>();
  exercisesChanged = new Subject<Exercise[]>();
  private avilableExercises: Exercise[] = [];
  private runnigExercise: Exercise;
  private exerciseArr: Exercise[] = [];

  constructor(private db: AngularFirestore) {}

  fechtAvialbelExercises(): any {
    this.db
      .collection('avalibleExercises')
      .snapshotChanges()
      .pipe(
        map((docArr) => {
          return docArr.map((doc) => {
            return {
              id: doc.payload.doc.id,
              name: doc.payload.doc.data()['name'],
              duration: doc.payload.doc.data()['duration'],
              calories: doc.payload.doc.data()['calories'],
            };
          });
        })
      )
      .subscribe((exerceises: Exercise[]) => {
        this.avilableExercises = exerceises;
        this.exercisesChanged.next([...this.avilableExercises]);
      });
  }

  starrEcerice(selectedId: string): any {
    this.runnigExercise = this.avilableExercises.find(
      (ex) => ex.id === selectedId
    );

    this.exervisechanged.next({ ...this.runnigExercise });
  }

  getRunningExcerse(): Exercise {
    return { ...this.runnigExercise };
  }

  completeExercise(): void {
    this.exerciseArr.push({
      ...this.runnigExercise,
      date: new Date(),
      state: 'completed',
    });
    this.runnigExercise = null;
    this.exervisechanged.next(null);
  }

  cancelExercise(progress: number): void {
    this.exerciseArr.push({
      ...this.runnigExercise,
      duration: this.runnigExercise.duration * (progress / 100),
      calories: this.runnigExercise.calories * (progress / 100),
      date: new Date(),
      state: 'cancelled',
    });
    this.runnigExercise = null;
    this.exervisechanged.next(null);
  }

  getCompleteOrcancelExeciers(): any {
    return this.exerciseArr.slice();
  }
}
