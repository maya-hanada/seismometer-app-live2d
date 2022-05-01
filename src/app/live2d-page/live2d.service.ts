import { Injectable } from '@angular/core';
import {
  loading_live2d,
  dispose_live2d,
  onresize_live2d,
  changeMotion_live2d,
} from './src/main';

@Injectable({
  providedIn: 'root',
})
export class Live2dService {
  constructor() {}

  loading_live2d(): void {
    loading_live2d();
  }

  dispose_live2d(): void {
    dispose_live2d();
  }

  onresize_live2d(): void {
    onresize_live2d();
  }

  changeMotion_live2d(no: number): void {
    changeMotion_live2d(no);
  }
}
