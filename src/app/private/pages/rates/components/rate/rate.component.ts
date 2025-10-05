import { Component, Input } from '@angular/core';
import { IRateModel } from '../../models/rate.model';
import {
  DecimalPipe,
  NgClass,
  NgOptimizedImage,
  PercentPipe,
} from '@angular/common';
import { LegacyUpperCasePipe } from '../../../../../shared/pipes/legacy-uppercase.pipe';

@Component({
  selector: 'app-rate',
  templateUrl: './rate.component.html',
  styleUrls: ['./rate.component.scss'],
  imports: [
    NgOptimizedImage,
    LegacyUpperCasePipe,
    NgClass,
    PercentPipe,
    DecimalPipe,
  ],
})
export class RateComponent {
  @Input() data: IRateModel | null = null;
}
