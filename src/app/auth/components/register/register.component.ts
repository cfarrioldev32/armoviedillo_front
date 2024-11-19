import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { RegisterModel } from '../../models/register.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  private passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,12}$/;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['']);
    }
    this.registerForm = this.fb.group({
      name: ['', [Validators.required]],
      surname: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern(this.passwordPattern)]],
      birthday: ['', [Validators.required]],
    });
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      const registerData: RegisterModel = this.registerForm.value;
      this.authService.register(registerData).subscribe({
        next: (response) => {
          Swal.fire({
            icon: 'success',
            title: 'Registro exitoso',
            text: '¡Te has registrado correctamente!.',
            confirmButtonText: 'OK',
          }).then(() => {
            this.router.navigate(['/auth/login']);
          });
        },
        error: (error) => {
          Swal.fire({
            icon: 'error',
            title: 'Registro fallido',
            text: error.error,
            confirmButtonText: 'OK',
          });
        }
      });
    } else {
      Swal.fire({
        icon: 'warning',
        title: 'Formulario invalido',
        text: 'Formulario invalido, por favor rellena los campos correctamente',
        confirmButtonText: 'OK',
      });
    }
  }
}
