import { Component, OnInit, Input, Output, EventEmitter, ElementRef, ViewChild } from '@angular/core';
import { NgbModalRef, NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs/Subject';

import { UnsubscriberComponent } from '../../shared/hooks/unsubscriber.component';
import { Category } from '../../shared/models/category.model';
import { CategoriesService } from '../../core/api/categories.service';
import { NotificationsService } from '../../core/notifications/notifications.service';

@Component({
  selector: 'psa-categories-nav',
  templateUrl: './categories-nav.component.html',
  styleUrls: ['./categories-nav.component.scss']
})
export class CategoriesNavComponent extends UnsubscriberComponent implements OnInit {
  @ViewChild('confirmDeleteModalCategory') confirmDeleteModalCategory: ElementRef;
  @Input() selectedCategory: Category;
  @Output() onCategorySelected = new EventEmitter<Category>();
  @Output() onEditCategory = new EventEmitter<Category>();
  @Output() onDeleteCategory = new EventEmitter<string>();
  
  categories: Category[];
  categoryToDelete: Category;
  keywords = '';
  isSaving = false;
  private delayedLoad$ = new Subject<string>();

  private modalRef: NgbModalRef;
  private readonly modalConfig: NgbModalOptions = {
    windowClass: 'category-modal',
    backdrop: 'static',
    size: 'sm'
  };
  
  get filteredCategories(): Category[] {
    return this.keywords.length > 0
      ? this.categories.filter(view => view.name.toLowerCase().includes(this.keywords.toLowerCase()))
      : this.categories;
  }
  
  constructor(private categoriesService: CategoriesService,
              private modalService: NgbModal,
              private notificationsService: NotificationsService) {
    super();
  }

  ngOnInit() {
    this.categoriesService.getCategories()
      .takeUntil(this.ngUnsubscribe$)
      .subscribe((res: Category[]) => this.categories = res);

    this.delayedLoad$
      .debounceTime(100)
      .takeUntil(this.ngUnsubscribe$)
      .subscribe((res) => this.keywords = res);
  }

  create(content) {
    this.selectedCategory = null;
    this.modalRef = this.modalService.open(content, this.modalConfig);
  }

  edit(category: Category, content) {
    this.selectedCategory = {...category};
    this.modalRef = this.modalService.open(content, this.modalConfig);
  }

  delete(category: Category) {
    this.modalRef = this.modalService.open(this.confirmDeleteModalCategory);
    this.categoryToDelete = category;
  }

  confirmDelete() {
    this.isSaving = true;
    this.categoriesService.delete(this.categoryToDelete.id)
      .subscribe(
        () => this.onSavedSucces(this.categoryToDelete.name, 'deleted'),
        () => this.onError('Unable to delete category'),
        () => {
          this.isSaving = false;
          this.closeModal();
        }
      );
  }

  selectCategory(category: Category) {
    this.selectedCategory = category;
    this.onCategorySelected.emit(category);
  }

  saveCategory(category: Category) {
    this.isSaving = true;

    (category.id ? this.categoriesService.update(category) : this.categoriesService.create(category))
      .subscribe(
        () => this.onSavedSucces(category.name, category.id ? 'updated' : 'created'),
        () => this.onError('Unable to save category'),
        () => {
          this.isSaving = false;
          this.closeModal();
        }
      );
  }

  onSearch(keywords: string) {
    this.selectedCategory = null;
    this.delayedLoad$.next(keywords);
  }

  closeModal() {
    this.modalRef.close();
  }

  private onSavedSucces(categoryName: string, action: 'updated' | 'created' | 'deleted') {
    this.notificationsService.success('Success', `Category \"${categoryName}\" has been successfully ${action}`);
  }

  private onError(message: string) {
    this.notificationsService.danger('Error', message);
  }
}
