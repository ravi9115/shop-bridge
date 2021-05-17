import { Component, ChangeDetectionStrategy, OnInit, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

import { RequestFactory, ProductDTO, getErrorsMap } from '@app/shared';

@Component({
  selector: 'app-product-management-modal',
  templateUrl: './product-management-modal.component.html',
  styleUrls: ['./product-management-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductManagementModalComponent implements OnInit {
  @Input() productInfo: ProductDTO;

  form: FormGroup = this.fb.group({
    name: ['', [Validators.required]],
    description: ['', [Validators.required]],
    price: ['', [Validators.required, Validators.max(1000), Validators.min(1)]],
    quantity: ['', [Validators.required, Validators.max(150)]],
    discount: ['', [Validators.required, Validators.max(150)]],
  });

  busy: Subscription = new Subscription();
  errors: ValidationErrors;

  nameErrors: ValidationErrors = getErrorsMap('Name');
  descriptionErrors: ValidationErrors = getErrorsMap('Description');
  priceErrors: ValidationErrors = getErrorsMap('Price');
  quantityErrors: ValidationErrors = getErrorsMap('Quantity');
  discountErrors: ValidationErrors = getErrorsMap('Discount');

  get name(): FormControl {
    return this.form.get('name') as FormControl;
  }

  get description(): FormControl {
    return this.form.get('description') as FormControl;
  }

  get price(): FormControl {
    return this.form.get('price') as FormControl;
  }

  get quantity(): FormControl {
    return this.form.get('quantity') as FormControl;
  }

  get discount(): FormControl {
    return this.form.get('discount') as FormControl;
  }

  constructor(
    public activeModal: NgbActiveModal,
    private api: RequestFactory,
    private fb: FormBuilder,
  ) {}

  ngOnInit(): void {
    if (this.productInfo) {
      const { name, description, price, quantity, discount } = this.productInfo;
      console.log(this.productInfo);
      this.form.patchValue({ name, description, price, quantity, discount });
    }
  }

  save(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const payload: Partial<ProductDTO> = { ...this.form.value };

    if (this.productInfo) {
      this.busy = this.api.updateProduct(this.productInfo.id, payload).subscribe(
        res => this.activeModal.close(res),
        (err: HttpErrorResponse) => this.errorOptions(err),
      );
    } else {
      this.busy = this.api.addProduct(payload).subscribe(
        res => this.activeModal.close(res),
        (err: HttpErrorResponse) => this.errorOptions(err),
      );
    }
  }

  errorOptions(err: HttpErrorResponse): void {
    this.errors = err.error;
    this.name.setErrors(this.errors.name);
    this.description.setErrors(this.errors.description);
    this.price.setErrors(this.errors.price);
    this.quantity.setErrors(this.errors.quantity);
    this.discount.setErrors(this.errors.discount);
    this.form.markAllAsTouched();
  }
}
