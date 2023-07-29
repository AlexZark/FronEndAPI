import { Component, OnInit ,HostListener} from '@angular/core';
import { HttpClient } from '@angular/common/http'; // Import the HttpClient module
import{listacliente}from '../Modelo/listacliente.interface'
import { NgOptimizedImage ,CommonModule} from '@angular/common';
import { forkJoin } from 'rxjs'; 
import { MatIconModule } from '@angular/material/icon'; // Import MatIconModule
import { MatSidenavModule } from '@angular/material/sidenav'; // Import MatSidenavModule
import { MatSidenav } from '@angular/material/sidenav';
import { MatMenuModule } from '@angular/material/menu'; // Importa el módulo MatMenuModule
import { MatToolbarModule } from '@angular/material/toolbar'; // Importa el módulo MatToolbarModule
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { MatDialog } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms'; // Asegúrate de agregar esta línea
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
@Component({
  standalone: true,

  imports:[CommonModule,NgOptimizedImage,FormsModule,MatIconModule ,MatSidenavModule,MatMenuModule,MatToolbarModule,MatSidenavModule],

  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  constructor(private http: HttpClient,public dialog: MatDialog, private sanitizer: DomSanitizer, private router: Router) { }

  Usuarios: listacliente[]=[];
  elementosPorPagina = 5;
  paginaActual = 1;
  ngOnInit(): void {
    this.http.get<listacliente[]>("http://127.0.0.1:8000/api/clientes")
    .subscribe((data) => {
      this.Usuarios = data;
    });
  }
  formularioActivo = false;
  nombres :string='';
  apellidos:string='';
  edad:number=0 ;
  email:string='';
  password:string='';
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
mostrarFormulario() {
  this.formularioActivo = true;
}
eliminarRegistro(id: number): void {
  const confirmacion = confirm('¿Estás seguro de que deseas eliminar este registro?');

  if (confirmacion) {
    // Realizar la solicitud DELETE a la API para eliminar el registro
    this.http.delete(`http://127.0.0.1:8000/api/clientes/${id}`).subscribe(
      (response) => {
        // Si la eliminación fue exitosa, actualizar la lista de registros en el componente
        
        alert('Registro eliminado exitosamente.');
        window.location.reload();
      },
      (error) => {
        console.error('Error al eliminar el registro:', error);
        alert('Se produjo un error al eliminar el registro. Vuelva a intentarlo más tarde.');
      }
    );
  }
}
registroSeleccionado: any = {}; // Aquí almacenaremos el registro seleccionado para editar
verlibro: boolean = false;

formularioEditarActivo: boolean = false;
abrirFormularioEditar(registro: any): void {
  this.formularioEditarActivo = true;
  this.registroSeleccionado = registro;


  // Hacemos una copia del registro seleccionado para no modificar el original
}
cerrarFormularioEditar(): void {
  this.formularioEditarActivo = false;
  this.registroSeleccionado = {}; // Reiniciamos el registro seleccionado para futuras ediciones
}
mostrarDetalleLibro(libro: any) {
  this.registroSeleccionado = libro;
  this.verlibro = true;
  if (event) {
    event.stopPropagation();
  }
}

actualizarRegistro(): void {  
  const confirmacion = confirm('¿Deseas actualizar el registro?');

if (!confirmacion) {
  // Si el usuario no confirma los cambios, salimos de la función sin hacer nada
  return;
}
if (! this.registroSeleccionado.nombres || ! this.registroSeleccionado.apellidos ||
  ! this.registroSeleccionado.edad || ! this.registroSeleccionado.email|| ! this.registroSeleccionado.password) {
  alert('Por favor, completa todos los campos obligatorios.');
  return;
}
    const userData2 = {
      
      nombres: this.registroSeleccionado.nombres,
      apellidos: this.registroSeleccionado.apellidos,
      edad:  this.registroSeleccionado.edad,
      email:  this.registroSeleccionado.email,
      password:  this.registroSeleccionado.password,
    };
    this.http.put('http://127.0.0.1:8000/api/clientes/'+this.registroSeleccionado.id, userData2).subscribe(
      (response: any) => {
        console.log('Registro exitoso:', response);
        this.registroExitoso = true;

        // Simular un cierre automático después de 3 segundos (3000 ms)
        setTimeout(() => {
         
        }, 300);          window.location.reload();
      },
      (error: any) => {
        
        console.error('Error en el registro:', error);
        // Puedes manejar errores aquí, mostrar mensajes de error, etc.
      }
    );
  

  console.log('Registro actualizado:', this.registroSeleccionado);

  // Una vez que hayas realizado la actualización, cierra el formulario de edición
  this.cerrarFormularioEditar();
}
}