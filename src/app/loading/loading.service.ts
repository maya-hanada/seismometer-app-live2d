import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  public isLoading = new BehaviorSubject<boolean>(true);
  constructor() {}
  loadingOn(): void {
    console.log(`loading : on`);
    this.isLoading.next(true);
  }
  loadingOff(): void {
    console.log(`loading : off`);
    this.isLoading.next(false);
  }
}
