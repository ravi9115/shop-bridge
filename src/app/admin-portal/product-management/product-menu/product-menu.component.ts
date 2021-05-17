/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  Component,
  ChangeDetectionStrategy,
  OnInit,
  Input,
  EventEmitter,
  Output,
} from '@angular/core';

import { IProductModel } from '@app/shared';

@Component({
  selector: 'app-product-menu',
  templateUrl: './product-menu.component.html',
  styleUrls: ['./product-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductMenuComponent implements OnInit {
  @Input() row: IProductModel;
  @Output() deleteProductEmitter: EventEmitter<Partial<IProductModel>> = new EventEmitter();
  @Output() editProductEmitter: EventEmitter<Partial<IProductModel>> = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  editProduct($event: Event): void {
    $event.preventDefault();
    this.editProductEmitter.next(this.row);
  }

  deleteProduct($event: Event): void {
    $event.preventDefault();
    this.deleteProductEmitter.next(this.row);
  }
}
