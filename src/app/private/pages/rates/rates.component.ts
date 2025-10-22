import {
  Component,
  effect,
  inject,
  OnInit,
  Signal,
  signal,
} from '@angular/core';
import { IRateModel } from './models/rate.model';
import { FAKE_RATES } from '../../../shared/const/fake-rates.const';
import { RateComponent } from './components/rate/rate.component';
import { RatesService } from './services/rates.service';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-rates',
  templateUrl: './rates.component.html',
  styleUrls: ['./rates.component.scss'],
  standalone: true,
  imports: [RateComponent],
  providers: [RatesService],
})
export class RatesComponent {
  private _ratesService: RatesService = inject(RatesService);
  rates: Signal<IRateModel[] | undefined> = toSignal(this._ratesService.rates$);
}
