import { Component, OnInit } from '@angular/core';
import { Router,NavigationExtras  } from '@angular/router';
import { HttpClient } from '@angular/common/http'; // Import the HttpClient module
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  logo = 'https://img.freepik.com/vector-premium/libro-abierto-leer-vector-simbolo_599395-337.jpg?w=740';
  correo: string = '';
  contrasena: string = '';
  loading: boolean = false; // Variable para controlar la visibilidad del mat-progress-spinner

  constructor(private router: Router , private http: HttpClient) { }

  ngOnInit(): void {
    
  }
  

  ingresar() {
    // Simulamos una carga de 2 segundos antes de redirigir
    
    this.http.get<any[]>('http://127.0.0.1:8000/api/clientes/').subscribe(
      (users: any[]) => {
        // Find the user with matching email and password
        const matchingUser = users.find(user => user.nombres === this.correo && user.password === this.contrasena);
  
        if (matchingUser) {
          // If a matching user is found, navigate to the next window (e.g., '/products')
          localStorage.setItem('currentUser', JSON.stringify(matchingUser));
          const navigationExtras: NavigationExtras = {
            state: {
              from: 'dashboard', // Indicar que viene desde la página de login
              userData: users
            }
          };
          this.loading = true;
    setTimeout(() => {
      this.router.navigateByUrl('/dashboard',navigationExtras);
      this.loading = false;
    }, 2000);
        } else {
          // If no matching user is found, show an error or notification (you can customize this part based on your requirements)
          alert('Credenciales no válidas. Por favor revise su correo electrónico y contraseña.');
        }
      },
      
    );
    
  }

  registrar() {
    this.router.navigateByUrl('/registro');
  }

  validarCamposRellenos(): boolean {
    return this.correo.trim() !== '' && this.contrasena.trim() !== '';
  }
}
