import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { Subscription, interval } from 'rxjs';
import { retry, take } from 'rxjs/operators';

import { Live2dService } from './live2d.service';
import { QuakeService } from './quake.service';
import { QuakeOut } from './quake-out';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-live2d-page',
  templateUrl: './live2d-page.component.html',
  styleUrls: ['./live2d-page.component.css'],
})
export class Live2dPageComponent implements OnInit, OnDestroy {
  public quake: string = 'データ取得中...';

  public todayQuakes: QuakeOut[] = [
    {
      time: '',
      hypocenter: '',
      maxScale: '',
    },
  ];

  public translateScale = {
    '0': 0,
    '1': 1,
    '2': 2,
    '3': 3,
    '4': 4,
    '5弱': 5,
    '5強': 5,
    '6弱': 5,
    '6強': 5,
    '7': 5,
  } as const;

  private subscription: Subscription;

  constructor(
    private live2dService: Live2dService,
    private quakeService: QuakeService
  ) {}

  @HostListener('window:resize')
  onResize() {
    this.live2dService.onresize_live2d();
  }

  ngOnInit(): void {
    console.log('onInit');
    this.live2dService.loading_live2d();
    this.subscription = interval(1000 * 60 * environment.connectMins).subscribe(
      () => {
        this.getLatestData(true);
      }
    );
    this.getLatestData(false);
  }

  ngOnDestroy(): void {
    console.log('onDestroy');
    this.live2dService.dispose_live2d();
    this.subscription.unsubscribe();
  }

  getOnceQuake(move: boolean): void {
    const alterState = (value: QuakeOut[]): void => {
      if (!value.length) {
        this.quake = '通信エラー';
        console.log('failed: API call getQuake()');
        return;
      }

      if (value[0].maxScale) {
        this.quake = `${value[0].time} ${value[0].hypocenter} 震度${value[0].maxScale}`;
        let translatedScale = this.translateScale[value[0].maxScale];
        if (move && translatedScale != 0) {
          this.changeMotion(translatedScale);
        }
      } else {
        this.quake = '';
        console.log('no value: maxScale');
      }
    };

    this.quakeService.getQuake().pipe(take(1), retry(3)).subscribe(alterState);
  }

  getOnceTodayQuakes(): void {
    const alterStates = (values: QuakeOut[]) => {
      if (values.length) {
        if (values[0].time) {
          console.log(`Today Quakes : ${values.length}`);
          this.todayQuakes = values.filter((value) => {
            return value.maxScale && value.hypocenter;
          });
        } else {
          console.log(`Today Quakes : none`);
          this.todayQuakes = [];
        }
      } else {
        this.quake = '通信エラー';
        this.todayQuakes = [];
        console.log('failed: API call getTodayQuakes()');
      }
    };

    this.quakeService
      .getTodayQuakes()
      .pipe(take(1), retry(3))
      .subscribe(alterStates);
  }

  changeMotion(no: number): void {
    console.log(`changeMotion: ${no}`);
    this.live2dService.changeMotion_live2d(no);
  }

  getLatestData(move: boolean): void {
    this.getOnceQuake(move);
    this.getOnceTodayQuakes();
  }
}
