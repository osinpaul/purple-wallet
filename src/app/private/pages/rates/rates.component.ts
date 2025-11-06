import { Component, inject, Signal } from '@angular/core';
import { IRateModel } from './models/rate.model';
import { RateComponent } from './components/rate/rate.component';
import { RatesService } from './services/rates.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormControl, FormGroup } from '@angular/forms';

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
  rates: Signal<IRateModel[] | undefined> = toSignal(
    this._ratesService.filteredRates$
  );

  form: FormGroup = new FormGroup({
    search: new FormControl(''),
  });
}
