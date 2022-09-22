import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConnectableObservable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'CadastroTelefone';
  usuario : string = '';
  telefone : string = '';
  pessoas : Array<any> = [];


  constructor(private httpClient : HttpClient){

  }

  public cadastro(){
    this.httpClient.post('http://localhost:3017/cadastro', {nome : this.usuario, telefone : this.telefone}).toPromise().then((response : any)=> {
      this.listar();
      this.usuario = '';
      this.telefone = '';
    })
  }

  public listar(){
    this.httpClient.get('http://localhost:3017/cadastro').toPromise().then((response : any) => {
      console.log(response);
      this.pessoas = response;
    });
  }

}