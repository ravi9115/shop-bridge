/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

import { ApiConfig, ProductDTO, RequestFactory, NotifyService } from '@app/shared';
import { AppDataSource } from '@app/table';
import { environment } from '@environment';
import { ProductManagementModalComponent } from './product-management-modal/product-management-modal.component';
import { ProductManagementService } from './product-management.service';
import { ConfirmModalComponent } from './confirm-modal/confirm-modal.component';

@Component({
  selector: 'app-product-management',
  templateUrl: './product-management.component.html',
  styleUrls: ['./product-management.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductManagementComponent implements OnInit, OnDestroy {
  tableDS!: AppDataSource<any>;
  desktopColumns = ['name', 'description', 'price', 'quantity', 'discount', 'actions'];
  mobileColumns = ['name_price', 'details'];

  private productManagementEndpoint = `${environment.apiPath}${ApiConfig.productManagement}`;
  private instance: NgbModalRef;

  constructor(
    private modal: NgbModal,
    private productService: ProductManagementService,
    private api: RequestFactory,
    private notify: NotifyService,
    private title: Title,
  ) {
    this.title.setTitle('Product Management');
  }

  ngOnInit(): void {
    this.tableDS = new AppDataSource(
      this.productService,
      this.productManagementEndpoint + '?_page=1',
    );
  }

  ngOnDestroy(): void {
    this.closeModal();
  }

  openAddProductModal(data: Partial<ProductDTO> | null = null): NgbModalRef {
    this.closeModal();
    const instance = this.modal.open(ProductManagementModalComponent, {
      windowClass: 'modal-small add-product-modal',
      backdrop: 'static',
    });
    instance.componentInstance.productInfo = data;
    this.instance = instance;
    return instance;
  }

  createProduct(): void {
    this.openAddProductModal()
      .result.then(res => {
        if (!!res) {
          this.closeModal();
          this.notify.success('Product Added', 'Product Added');
          this.tableDS.refresh();
        }
      })
      .catch(() => {});
  }

  editProduct(row: Partial<ProductDTO>): void {
    this.openAddProductModal(row)
      .result.then(res => {
        if (typeof res === 'boolean' && res === true) {
          this.deleteProduct(row);
        }
        if (typeof res !== 'boolean' && !!res) {
          this.tableDS.refresh();
          this.notify.success('Product details updated', 'Product Updated');
        }
      })
      .catch(() => {});
  }

  deleteProduct(row: Partial<ProductDTO>): void {
    this.closeModal();
    this.instance = this.modal.open(ConfirmModalComponent, {
      windowClass: 'modal-small modal-product-menu',
      backdrop: 'static',
    });
    const modalComponent = this.instance.componentInstance;
    modalComponent.header = 'Delete Product';
    modalComponent.text = `
      You are about to
      <b class="delete">delete</b>
      <b>${row.name}</b>.
      Please confirm.
    `;
    modalComponent.cancelButtonText = 'Cancel';
    modalComponent.okButtonText = 'Yes, delete';

    this.instance.result
      .then(() => {
        this.api.deleteProduct(row.id).subscribe(
          () => {
            const data = this.tableDS.state.filter(value => value.id !== row.id);
            this.tableDS.updateData(data);
            this.notify.success('Product deleted', 'Product Deleted');
          },
          () => this.notify.error('Please try again', 'Product Deletion Error'),
        );
      })
      .catch(() => {});
  }

  closeModal(): void {
    if (this.instance) {
      this.instance.dismiss('Opened to times');
      this.instance = null;
    }
  }
}
