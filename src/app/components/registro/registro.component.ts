import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  logo = 'https://img.freepik.com/vector-premium/libro-abierto-leer-vector-simbolo_599395-337.jpg?w=740'

  correo: string = '';
  contrasena: string = '';
  loading: boolean = false; // Var

  constructor(private http: HttpClient,public dialog: MatDialog, private router: Router) { }


  ngOnInit(): void {
  }
  formularioActivo = false;
  nombres: string = '';
  apellidos: string = '';
  edad: number = 0;
  email: string = '';
  password: string = '';
  formularioValido(): boolean {
    const camposLlenos =
      this.nombres.trim() !== '' &&
      this.apellidos.trim() !== '' &&
      this.edad !== null &&
      this.email.trim() !== '' &&
      this.password.trim() !== '';

    if (!camposLlenos) {
      alert('Por favor, complete todos los campos antes de enviar el formulario.');
    }
    return camposLlenos;

  }
  registroExitoso = false;

  submitForm() {
    // Verificar que todos los campos estén llenos
    if (!this.nombres|| !this.apellidos || !this.edad || !this.email || !this.password) {
      console.error('Por favor, complete todos los campos antes de enviar el formulario.');
      // Puedes mostrar un mensaje de error aquí para informar al usuario que debe completar todos los campos.
      return;
    }
  
    const userData = {
      nombres: this.nombres,
      apellidos: this.apellidos,
      edad:this.edad,
      email: this.email,
      password: this.password,
      
    };
  
    this.http.post('http://127.0.0.1:8000/api/clientes', userData).subscribe(
      (response: any) => {
        console.log('Registro exitoso:', response);
        this.registroExitoso = true;
  
        // Simular un cierre automático después de 3 segundos (3000 ms)
        setTimeout(() => {
          this.formularioActivo = false;
          this.registroExitoso = false;
        }, 300);
        window.location.reload();
      },
      (error: any) => {
        console.error('Error en el registro:', error);
        // Puedes manejar errores aquí, mostrar mensajes de error, etc.
      }
    );
  }
  closeModal() {
    this.formularioActivo = false;
  }
  
  ingresar(){
    this.router.navigateByUrl('/login');
  }
  
}
