import { Subject } from 'rxjs';
import { Exercise } from './../models/exercie.model';

export class TrainingService {
  exervisechanged = new Subject<Exercise>();
  private avilableExercises: Exercise[] = [
    { id: 'crunches', name: 'Crunches', duration: 30, calories: 8 },
    { id: 'touch-toes', name: 'Touch Toes', duration: 180, calories: 15 },
    { id: 'side-lunges', name: 'Side Lunges', duration: 120, calories: 18 },
    { id: 'burpees', name: 'Burpees', duration: 60, calories: 8 },
  ];

  private runnigExercise: Exercise;
  private exerciseArr: Exercise[] = [];

  getAvialbelExercises(): any {
    return this.avilableExercises.slice();
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
