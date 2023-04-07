import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nuevoPrimerPilar',
  templateUrl: './nuevoPrimerPilar.component.html',
  styleUrls: ['./nuevoPrimerPilar.component.css']
})
export class NuevoPrimerPilarComponent implements OnInit {
  httpOptions: any;
  token: any;

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit() {
    let token = localStorage.getItem('jwt');
    console.log(token);

    this.httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + token,
        'Content-Type': 'application/json'
      })
    };
  }

  newPilar() {
    const fechaCreacion = new Date().toISOString();
    const numFDS = (<HTMLInputElement>document.getElementById('FinSemana')).value;
    const numMatrinoniosVivieron = (<HTMLInputElement>document.getElementById('MatrimoniosVividos')).value;
    const numSacerdotesVivieron = (<HTMLInputElement>document.getElementById('SacerdotesVividos')).value;
    const numReligiososVivieron = (<HTMLInputElement>document.getElementById('ReligiososVividos')).value;
    const numReligiosasVivieron = (<HTMLInputElement>document.getElementById('ReligiosasVividos')).value;
    const newPrimerPilar = {
      fechaCreacion,
      numFDS,
      numMatrinoniosVivieron,
      numSacerdotesVivieron,
      numReligiososVivieron,
      numReligiosasVivieron
    };
    const jsonPrimerPilar = JSON.stringify(newPrimerPilar); // Convertir el objeto en una cadena JSON
    console.log(jsonPrimerPilar);
    console.log(this.httpOptions);

    if (this.httpOptions) {
      this.http.post('https://encuentro-matrimonial-backend.herokuapp.com/pilar/primerPilar/create', jsonPrimerPilar, this.httpOptions)
      .subscribe(data => {
        console.log(data);
        alert('Registro creado exitosamente');
        this.router.navigate(['/primerPilarGrid']);
      }, error => {
        console.error(error);
      });
    } else {      
      console.log('httpOptions no está definido');
    }
  }
}