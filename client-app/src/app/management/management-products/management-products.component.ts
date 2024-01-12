import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProductService } from 'src/libs/api/src/lib/product/product.service';
import { ProductData } from 'src/libs/requestsData/ProductData';

@Component({
  selector: 'app-management-products',
  templateUrl: './management-products.component.html',
  styleUrls: ['./management-products.component.scss']
})
export class ManagementProductsComponent {
  productForm: FormGroup;
  product: ProductData | undefined;
  selectedFile: File | undefined;

  constructor(private fb: FormBuilder, private productService: ProductService, private snackbar: MatSnackBar) {
    this.productForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0)]],
      availability: ['', [Validators.required, Validators.min(0)]],
    });
  }

  onSubmit() {
    if (this.productForm.valid) {
      const productData: ProductData = this.productForm.value;

      if (!this.selectedFile) {
        return;
      }

      const formData = new FormData();
      formData.append('price', productData.price.toString());
      formData.append('availability', productData.availability.toString());
      formData.append('description', productData.description);
      formData.append('title', productData.title);
      formData.append('image', this.selectedFile);

      // Send the product data to the backend
      this.productService.create(formData).subscribe();
      this.snackbar.open('Product created successfully', 'Close', {
        duration: 3000,
        panelClass: ['custom-snackbar']
      });
    }
  }

  onFileSelect(event: any) {
    this.selectedFile = event.target.files[0];
  }

}
