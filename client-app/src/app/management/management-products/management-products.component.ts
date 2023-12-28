import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from 'src/libs/api/src/lib/product/product.service';
import { ProductData } from 'src/libs/requestsData/ProductData';

@Component({
  selector: 'app-management-products',
  templateUrl: './management-products.component.html',
  styleUrls: ['./management-products.component.scss']
})
export class ManagementProductsComponent implements OnInit {
  productForm: FormGroup;
  product: ProductData | undefined;
  selectedFile: File | undefined;

  constructor(private fb: FormBuilder, private productService: ProductService) {
    this.productForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0)]],
      availability: ['', [Validators.required, Validators.min(0)]],
    });
  }

  ngOnInit(): void {
    // Initialization logic here
  }

  onSubmit() {
    if (this.productForm.valid) {
      const productData: ProductData = this.productForm.value;

      if (!this.selectedFile) {
        return;
      }

      console.log(productData);
      console.log(this.selectedFile);

      const formData = new FormData();
      formData.append('price', productData.price.toString());
      formData.append('availability', productData.availability.toString());
      formData.append('description', productData.description);
      formData.append('title', productData.title);
      formData.append('image', this.selectedFile);

      console.log('FormData values:');
      for (let value of formData.getAll('image')) {
        console.log(value);
      }

      // Send the product data to the backend
      this.productService.create(formData).subscribe(
        () => {
          // Handle success if needed
        },
        (error) => {
          console.error('Error creating product:', error);
        }
      );
    }
  }

  onFileSelect(event: any) {
    this.selectedFile = event.target.files[0];
    console.log(this.selectedFile);
  }



  //   async onSubmit() {
  //     if (this.productForm.valid) {
  //       const productData: ProductData = this.productForm.value;

  //       if (!this.selectedFile) {
  //         return;
  //       }

  //       try {
  //         const fileByteArray: Uint8Array = await this.convertFileToByteArray(this.selectedFile);
  //         let numberArray = Array.from(fileByteArray);
  //         let base64String = btoa(String.fromCharCode.apply(null, numberArray));
  //         console.log(fileByteArray);
  //         console.log(numberArray);
  //         console.log(base64String);

  //         this.product = {
  //           price: productData.price,
  //           availability: productData.availability,
  //           description: productData.description,
  //           title: productData.title,
  //           image: base64String
  //         };

  //         console.log(this.product);

  //         // Send the product data to the backend
  //         this.productService.create(this.product).subscribe(
  //           () => {
  //             // Handle success if needed
  //           },
  //           (error) => {
  //             console.error('Error creating product:', error);
  //           }
  //         );
  //       } catch (error) {
  //         console.error('Error converting file to byte array:', error);
  //       }
  //     }
  //   }



  //   private convertFileToByteArray(file: File): Promise<Uint8Array> {
  //     return new Promise((resolve, reject) => {
  //       const reader = new FileReader();

  //       reader.onload = (e) => {
  //         const fileContent: ArrayBuffer = (e.target as any).result;
  //         const byteArray = new Uint8Array(fileContent);
  //         resolve(byteArray);
  //       };

  //       reader.onerror = (error) => {
  //         reject(error);
  //       };

  //       reader.readAsArrayBuffer(file);
  //     });
  //   }
}
