import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NgbModal, NgbModalRef, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { TreeviewItem } from 'ngx-treeview';

import { ProductsServce } from '../../core/api/products.service';
import { ProductTablePreview } from '../shared/models/product-table-preview';
import { availableColumns } from '../../shared/constants/available-columns.const';
import { NotificationsService } from '../../core/notifications/notifications.service';
import { ProductsTableComponent } from '../products-table/products-table.component';
import { Product } from '../../shared/models/product.model';
import { CategoriesService } from '../../core/api/categories.service';
import { Category } from '../../shared/models/category.model';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'psa-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss']
})
export class ProductsListComponent implements OnInit {
  @ViewChild(ProductsTableComponent) datatable: ProductsTableComponent;
  
  isCollapsed = false;
  rows: ProductTablePreview[];
  loadingIndicator = false;
  isModalLoading = false;
  total = 0;
  shown = 0;
  availableCols = availableColumns.products;
  categories: TreeviewItem[];
  selectedCategoryId: string;
  title = 'Товары';
  isMenuToggleShown = false;
  isAddButtonShown = false;

  private modalRef: NgbModalRef;
  private readonly modalConfig: NgbModalOptions = {
    windowClass: 'products-modal',
    backdrop: 'static',
    size: 'sm'
  };
  
  constructor(private modalService: NgbModal,
              private productsService: ProductsServce,
              private categoriesService: CategoriesService,
              private notificationsService: NotificationsService) { }

  ngOnInit() {
    this.categoriesService.getCategories()
      .subscribe((categories: Category[]) => {
        this.categories = categories.map((category: Category) => this.createCategoryTreeviewItem(category));
      });
  }

  onRowsUpdated(rowsAmount: number) {
    this.shown = rowsAmount;
  }

  onCategotySelected(category: { id: string, name: string }) {
    this.title = category.name;
    this.selectedCategoryId = category.id;

    this.loadingIndicator = true;

    Observable.forkJoin(
        this.categoriesService.getById(category.id),
        this.productsService.getProductsByCategory(category.id)
      )
      .finally(() => this.loadingIndicator = false)
      .subscribe(([category, products]) => {
        const availableCols = category.isSizesRequired
          ? availableColumns.products
          : availableColumns.products.filter(col => col !== 'sizes');
        this.datatable.updateColumns(availableCols);
        this.onLoadProductsSuccess(products);
      });
  }

  addProduct(content: ElementRef) {
    this.modalRef = this.modalService.open(content, this.modalConfig);
  }

  saveProduct(product: Product) {
    this.productsService.addProduct(product)
      .subscribe(
        (res: Product) => this.onSaveSuccess(res, product.id ? 'updated' : 'created'),
        () => this.onError('Unable to save Product')
      );
  }

  closeModal() {
    this.modalRef.close();
  }

  toggleCollapseMode() {
    this.isCollapsed = !this.isCollapsed;
  }

  private onLoadProductsSuccess(products) {
    this.rows = products.map((el, index) => new ProductTablePreview(el, index));
    this.total = products.length;
    this.isAddButtonShown = true;
    this.loadingIndicator = false;
  }

  private onError(message: string) {
    this.loadingIndicator = false;
    this.notificationsService.danger('Error', 'Unable to load products');
  }
  
  private onSaveSuccess(product: Product, action: string) {
    if (this.selectedCategoryId !== product.category.id) {
      this.onCategotySelected(product.category);
    }

    this.isModalLoading = false;
    this.closeModal();
    this.notificationsService.success('Success', `Product \"${product.name}\" has been successfully ${action}`);
  }

  private createCategoryTreeviewItem(category) {
    const { id, name } = category;
    const parsedCategory = {
      children: null,
      value: id,
      text: name,
      collapsed: true
    };
    return new TreeviewItem(parsedCategory);
  }
}
