import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { LoginModel } from '../../models/login.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  ngOnInit(): void {
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['']);
    }
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const loginData: LoginModel = this.loginForm.value;
      this.authService.login(loginData).subscribe({
        next: (res) => {
          localStorage.setItem('authToken', res.token);
          Swal.fire({
            icon: 'success',
            title: 'Has iniciado sesión correctamente',
            text: '¡Bienvenido!',
            confirmButtonText: 'OK',
          }).then(() => {
            this.router.navigate(['']);
          });
        },
        error: (err) => {
          Swal.fire({
            icon: 'error',
            title: 'Error al iniciar sesión',
            text: err.error,
            confirmButtonText: 'OK',
          });
        }
      });
    } else {
      this.loginForm.markAllAsTouched();
    }
  }
}
