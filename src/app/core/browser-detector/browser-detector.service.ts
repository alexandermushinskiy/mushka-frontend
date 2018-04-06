export class BrowserDetectorService {
  isIE (): boolean {
    return /msie\s|trident\//i.test(window.navigator.userAgent);
  }
}
