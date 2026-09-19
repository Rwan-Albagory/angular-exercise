import { Directive, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appBlockSpecialChars]',
  standalone: true
})
export class BlockSpecialChars {

 @Input() blockedCharts: string[] = [
   '@',
   '&',
   '$',
   '*', 
   '#', 
   '!', 
   '%',
   ' ',
   '.',
   '-',
   '_',
   '/'

  ];


  @HostListener('keydown', ['$event'])
  onkeyDown(event: KeyboardEvent): void{

    if (this.blockedCharts.includes(event.key)){
      event.preventDefault();
    }
  }
}
