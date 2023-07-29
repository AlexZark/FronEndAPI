import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http'; // Import the HttpClient module
import{listacliente}from '../Modelo/listacliente.interface'

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent {
  constructor( private http: HttpClient) { }
  Usuarios: listacliente[]=[];
  ngOnInit(): void {
    this.http.get<listacliente[]>("http://127.0.0.1:8000/api/usuarios")
    .subscribe((data) => {
      this.Usuarios = data;
    });
  }

}
