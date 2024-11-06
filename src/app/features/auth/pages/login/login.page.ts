// src/app/features/auth/pages/login/login.page.ts
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';
import { ToastService } from '../../../../core/services/toast.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss']
})
export class LoginPage {
  loginForm: FormGroup;
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private toastService: ToastService
  ) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
      remember: [false]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.isLoading = true;
      const { username, password } = this.loginForm.value;
      
      this.authService.login({ username, password }).subscribe({
        next: async (response) => {
          this.isLoading = false;
          await this.toastService.showSuccess('¡Inicio de sesión exitoso!');
          setTimeout(() => {
            this.router.navigate(['/products']);
          }, 1000);
        },
        error: async (error) => {
          console.error('Error en login:', error);
          this.isLoading = false;
          await this.toastService.showError('Credenciales inválidas');
        }
      });
    } else {
      this.toastService.showError('Por favor, complete todos los campos');
    }
  }
}