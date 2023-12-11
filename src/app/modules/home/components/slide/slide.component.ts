import { Component, Input } from '@angular/core';
import { ISlidePartialModel } from './slide.model';

@Component({
  selector: 'app-slide',
  templateUrl: './slide.component.html',
  styleUrl: './slide.component.scss',
})
export class SlideComponent {
  @Input() public slides: ISlidePartialModel[] = [];
}
