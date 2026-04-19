import { Component, input } from '@angular/core';
import { IAssetModel } from '../../models/asset.model';
import { NgClass, NgOptimizedImage, UpperCasePipe } from '@angular/common';

@Component({
  selector: 'app-asset',
  templateUrl: './asset.component.html',
  styleUrls: ['./asset.component.scss'],
  imports: [NgOptimizedImage, UpperCasePipe, NgClass],
})
export class AssetComponent {
  data = input.required<IAssetModel>();
}
