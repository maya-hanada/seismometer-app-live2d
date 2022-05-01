import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';
import { Quake } from './quake';
import { QuakeOut } from './quake-out';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class QuakeService {
  constructor(private http: HttpClient) {}

  private translateScale = {
    10: '1',
    20: '2',
    30: '3',
    40: '4',
    45: '5弱',
    50: '5強',
    55: '6弱',
    60: '6強',
    70: '7',
  } as const;

  /**
   * 地震情報を取得する
   * @return {Observable<QuakeOut[]>}
   * 値が取得できた場合：translateQuakeで変換された値を返す
   * 値が取得できたが空の配列だった場合：[emptyQuake]を返す
   * エラーで落ちた場合：空の配列[]を返す
   */
  getQuake(): Observable<QuakeOut[]> {
    const GET_URL = environment.url + '?limit=1&order=-1';
    const emptyQuake: QuakeOut = {
      time: '',
      hypocenter: '',
      maxScale: '',
    };
    return this.http.get<Quake[]>(GET_URL).pipe(
      map((value) =>
        value.length
          ? value.map((x) => this.translateQuake(x, true))
          : [emptyQuake]
      ),
      tap((_) => console.log('fetched quake')),
      catchError(this.handleError<any>('getQuake', []))
    );
  }

  /**
   * 本日の地震情報を取得する
   * @return {Observable<QuakeOut[]>}
   * 値が取得できた場合：translateQuakeで変換された値を返す
   * 値が取得できたが空の配列だった場合：[emptyQuake]を返す
   * エラーで落ちた場合：空の配列[]を返す
   */
  getTodayQuakes(): Observable<QuakeOut[]> {
    const GET_URL = environment.url + '?limit=15&order=-1';
    const emptyQuake: QuakeOut = {
      time: '',
      hypocenter: '',
      maxScale: '',
    };
    return this.http.get<Quake[]>(GET_URL).pipe(
      map((values) =>
        values.length
          ? values.map((value) => this.translateQuake(value, false))
          : [emptyQuake]
      ),
      tap((_) => console.log('fetched today quakes')),
      catchError(this.handleError<any>('getTodayQuakes', []))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }

  /**
   * 地震情報を加工する
   * @param quake API呼出しで受け取った地震情報
   * @param judge intervalJudgeと比較するかどうか。trueの場合は比較する
   * @return {QuakeOut}
   * judgeがtrue場合：地震発生時刻と現在の時刻を比較し、intervalJudge分以上の場合は値を空文字にして返す。そうでない場合は処理続行。
   * judgeがfalseの場合：translateScaleで変換ができない場合はmaxScaleを空文字にして返す。それ以外の場合はquakeの値をそのまま返す。
   */
  private translateQuake(quake: Quake, judge: boolean): QuakeOut {
    console.log(
      `time:${quake.earthquake.time}, 震源地:${quake.earthquake.hypocenter.name}, 最大震度:${quake.earthquake.maxScale}`
    );

    //地震発生時刻と現在の時刻を比較し、intervalJudge分以上の場合は値を空文字にして返す。
    if (judge) {
      const min = environment.intervalJudge;
      let quakeTime = new Date(quake.earthquake.time);
      let nowTime = new Date();
      let elapsedMins = (nowTime.getTime() - quakeTime.getTime()) / (1000 * 60);

      if (elapsedMins >= min) {
        return {
          time: '',
          hypocenter: '',
          maxScale: '',
        };
      }
    }

    //translateScaleで変換ができない場合はmaxScaleを空文字にして返す。
    if (!this.translateScale[String(quake.earthquake.maxScale)]) {
      return {
        time: quake.earthquake.time,
        hypocenter: quake.earthquake.hypocenter.name,
        maxScale: '',
      };
    }

    return {
      time: quake.earthquake.time,
      hypocenter: quake.earthquake.hypocenter.name,
      maxScale: this.translateScale[String(quake.earthquake.maxScale)],
    };
  }
}
