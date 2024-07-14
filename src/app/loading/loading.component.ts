import { Component, OnInit } from '@angular/core';
import { LoadingService } from './loading.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss'],
})
export class LoadingComponent implements OnInit {
  public isLoading: BehaviorSubject<boolean> = this.loadingService.isLoading;

  constructor(public loadingService: LoadingService) {}

  ngOnInit(): void {}
}
