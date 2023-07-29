import { Component, OnInit, HostListener } from '@angular/core';
import { HttpClient } from '@angular/common/http'; // Import the HttpClient module
import { libro } from '../Modelo/libro.interface'
import { NgOptimizedImage, CommonModule } from '@angular/common';
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

  imports: [CommonModule, NgOptimizedImage, FormsModule, MatIconModule, MatSidenavModule, MatMenuModule, MatToolbarModule, MatSidenavModule],

  selector: 'app-libros',
  templateUrl: './libros.component.html',
  styleUrls: ['./libros.component.css']
})
export class LibrosComponent {
  constructor(private http: HttpClient, public dialog: MatDialog, private sanitizer: DomSanitizer, private router: Router) { }
  elementosPorPagina = 5;
  paginaActual = 1;
  livto: libro[] = [];
  ngOnInit(): void {
    this.http.get<libro[]>("http://127.0.0.1:8000/api/libros/")
      .subscribe((data) => {
        this.livto = data;
      });
  }

  formularioActivo = false;

  titulo: string = '';
  genero: string = '';
  aniopublicacion: number = 0;
  ISBN: string = '';
  submitForm() {
    // Verificar que todos los campos estén llenos
    if (!this.titulo || !this.genero || !this.aniopublicacion || !this.ISBN) {
      console.error('Por favor, complete todos los campos antes de enviar el formulario.');
      // Puedes mostrar un mensaje de error aquí para informar al usuario que debe completar todos los campos.
      return;
    }

    const userData = {
      titulo: this.titulo,
      genero: this.genero,
      aniopublicacion: this.aniopublicacion,
      ISBN: this.ISBN,

    };

    this.http.post('http://127.0.0.1:8000/api/libros/', userData).subscribe(
      (response: any) => {
        console.log('Registro exitoso:', response);
        //this.registroExitoso = true;

        // Simular un cierre automático después de 3 segundos (3000 ms)
        setTimeout(() => {
          this.formularioActivo = false;
          //this.registroExitoso = false;
        }, 300);
        window.location.reload();
      },
      (error: any) => {
        console.error('Error en el registro:', error);
        // Puedes manejar errores aquí, mostrar mensajes de error, etc.
      }
    );
  }
  formularioValido(): boolean {
    const camposLlenos =
      this.titulo.trim() !== '' &&
      this.genero.trim() !== '' &&
      this.aniopublicacion !== null &&
      this.ISBN.trim() !== '';

    if (!camposLlenos) {
      alert('Por favor, complete todos los campos antes de enviar el formulario.');
    }
    return camposLlenos;

  }
  closeModal() {
    this.formularioActivo = false;
  }
  mostrarFormulario() {
    this.formularioActivo = true;
  }

  eliminarRegistroL(id: number): void {
    const confirmacion = confirm('¿Estás seguro de que deseas eliminar este registro?');

    if (confirmacion) {
      // Realizar la solicitud DELETE a la API para eliminar el registro
      this.http.delete(`http://127.0.0.1:8000/api/libros/${id}`).subscribe(
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

  registroExitoso = false;

  registroSeleccionado: any = {}; // Aquí almacenaremos el registro seleccionado para editar
  verlibro: boolean = false;

  formularioEditarActivo: boolean = false;
  abrirFormularioEditar(registro: any): void {
    this.formularioEditarActivo = true;
    this.registroSeleccionado = registro;


    // Hacemos una copia del registro seleccionado para no modificar el original
  }
  cerrarFormularioEditarL(): void {
    this.formularioEditarActivo = false;
    this.registroSeleccionado = {}; // Reiniciamos el registro seleccionado para futuras ediciones
  }

  actualizarRegistroL(): void {
    const confirmacion = confirm('¿Deseas actualizar el registro?');

    if (!confirmacion) {
      // Si el usuario no confirma los cambios, salimos de la función sin hacer nada
      return;
    }
    if (!this.registroSeleccionado.titulo || !this.registroSeleccionado.genero ||
      !this.registroSeleccionado.aniopublicacion || !this.registroSeleccionado.ISBN ) {
      alert('Por favor, completa todos los campos obligatorios.');
      return;
    }
    const userData2 = {

      titulo: this.registroSeleccionado.titulo,
      genero: this.registroSeleccionado.genero,
      aniopublicacion:  this.registroSeleccionado.aniopublicacion,
      ISBN:  this.registroSeleccionado.ISBN,
    };
    this.http.put('http://127.0.0.1:8000/api/libros/' + this.registroSeleccionado.id, userData2).subscribe(
      (response: any) => {
        console.log('Registro exitoso:', response);
        this.registroExitoso = true;

        // Simular un cierre automático después de 3 segundos (3000 ms)
        setTimeout(() => {

        }, 300); window.location.reload();
      },
      (error: any) => {

        console.error('Error en el registro:', error);
        // Puedes manejar errores aquí, mostrar mensajes de error, etc.
      }
    );


    console.log('Registro actualizado:', this.registroSeleccionado);

    // Una vez que hayas realizado la actualización, cierra el formulario de edición
    this.cerrarFormularioEditarL();
  }

}
