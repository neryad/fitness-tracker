import { TrainingService } from './../../../services/trainig.service';
import { Exercise } from './../../../models/exercie.model';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-past-training',
  templateUrl: './past-training.component.html',
  styleUrls: ['./past-training.component.css'],
})
export class PastTrainingComponent implements OnInit, AfterViewInit {
  dislayColumns = ['date', 'name', 'duration', 'calories', 'state'];
  dataSource = new MatTableDataSource<Exercise>();

  @ViewChild(MatSort) sort: MatSort;

  constructor(private trainigService: TrainingService) {}

  ngOnInit(): void {
    this.dataSource.data = this.trainigService.getCompleteOrcancelExeciers();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }
}
