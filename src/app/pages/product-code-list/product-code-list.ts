import { Component, OnInit } from '@angular/core';
import { ProductCode, ProductCodeService } from '../../services/product-code';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-product-code-list',
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  templateUrl: './product-code-list.html',
  styleUrl: './product-code-list.scss',
})
export class ProductCodeListComponent implements OnInit {
  codes: ProductCode[] = [];
  displayedColumns = ['code', 'actions'];
  newCode: string = '';

  constructor(private service: ProductCodeService) {}

  ngOnInit(): void {
    this.load();
  }

  load() {
    console.log('doing');
    this.service.getAll().subscribe((data) => (this.codes = data));
  }

  delete(id: number) {
    this.service.delete(id.toString()).subscribe({
      next: () => {
        Swal.fire({
          icon: 'success',
          title: 'Deleted!',
          text: 'The record has been deleted successfully.',
          confirmButtonText: 'OK',
        }).then(() => {
          window.location.reload();
        });
      },
      error: (err) => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: err?.error?.message || 'An error occurred while deleting the record.',
          confirmButtonText: 'OK',
        });
      },
    });
  }

  showQrCode(id: number) {
    this.service.getQr(id, { responseType: 'blob' }).subscribe((data) => {
      let blob: Blob;
      if (data instanceof Blob) {
        blob = data;
      } else if (data instanceof ArrayBuffer) {
        blob = new Blob([data], { type: 'image/png' });
      } else {
        throw new Error('Unexpected response type for QR code');
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        Swal.fire({
          title: 'QR Code',
          imageUrl: reader.result as string,
          imageAlt: 'QR Code',
          showCloseButton: true,
          confirmButtonText: 'ปิด',
        });
      };
      reader.readAsDataURL(blob);
    });
  }

  create() {
    const code = this.newCode?.trim().toUpperCase();
    const noDash = /^[A-Z0-9]{30}$/;
    const withDash = /^[A-Z0-9]{5}(-[A-Z0-9]{5}){5}$/;

    if (!noDash.test(code) && !withDash.test(code)) {
      Swal.fire({
        icon: 'warning',
        title: 'Invalid Code Format',
        text: 'Please enter a valid code.',
        confirmButtonText: 'OK',
      });
      return;
    }

    this.service.create(code).subscribe({
      next: () => {
        Swal.fire({
          icon: 'success',
          title: 'Created!',
          text: 'The record has been created successfully.',
          confirmButtonText: 'OK',
        }).then(() => {
          window.location.reload();
        });
      },
      error: (err) => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: err?.error?.message || 'An error occurred while creating the record.',
          confirmButtonText: 'OK',
        });
      },
      complete: () => {
        console.log('Create request completed.');
      },
    });
  }

  onDelete(id: number) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you really want to delete this record?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        console.log(`Deleting product with ID: ${id}`);
        this.delete(id);
      }
    });
  }

  onProductCodeInput(event: Event) {
    const input = event.target as HTMLInputElement;
    let value = input.value.toUpperCase().replace(/[^A-Z0-9]/g, '');
    value = value.match(/.{1,5}/g)?.join('-') || '';
    input.value = value;
    this.newCode = value;
  }
}
