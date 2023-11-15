import { OverlayContainer } from '@angular/cdk/overlay';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  constructor(private overlay: OverlayContainer) {}

//   toggleTheme(isDark: boolean): void {
//     this.overlay.getContainerElement().classList.toggle('dark-theme', isDark);
//   // constructor() { }
// }

toggleTheme(isDark: boolean): void {
  this.overlay.getContainerElement().classList.toggle('dark-theme', isDark);
}
}
