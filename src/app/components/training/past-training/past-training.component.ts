import { TrainingService } from './../../../services/trainig.service';
import { Exercise } from './../../../models/exercie.model';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-past-training',
  templateUrl: './past-training.component.html',
  styleUrls: ['./past-training.component.css'],
})
export class PastTrainingComponent implements OnInit {
  dislayColumns = ['date', 'name', 'duration', 'calories', 'state'];
  dataSource = new MatTableDataSource<Exercise>();

  constructor(private trainigService: TrainingService) {}

  ngOnInit(): void {
    this.dataSource.data = this.trainigService.getCompleteOrcancelExeciers();
  }
}
