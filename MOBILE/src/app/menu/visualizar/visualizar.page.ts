import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { ApihubService } from 'src/app/service/apihub.service';

@Component({
  selector: 'app-visualizar',
  templateUrl: './visualizar.page.html',
  styleUrls: ['./visualizar.page.scss'],
})
export class VisualizarPage implements OnInit {

  /**
   * Variable que contiene los repositorios.
   */
  repositorios: any = [];
  commits: any = [];

  cardVisible:boolean = false;

  commitIndex: number | null = null;
  
  commitsTotales: number = 0;

  /**
   * Constructor de la pagina de visualizar.
   * @param apiHub API de github.
   * @param router Router de la pagina.
   */
  constructor(private apiHub: ApihubService, private router: Router) { }


  /**
   * Metodo que se ejecuta al iniciar la pagina.
   */
  ngOnInit() {
    this.obtenerRepositorios();
  }

  /**
   * Metodo que obtiene los repositorios.
   */
  obtenerRepositorios() {
    this.apiHub.Repositorios().subscribe((data: any) => {
      this.repositorios = data.sort((a: any, b: any) => {
        const dateA = new Date(a.updated_at).getTime();
        const dateB = new Date(b.updated_at).getTime();
        return dateB - dateA;
      });
      this.repositorios.forEach((repo: any) => {
        this.apiHub.CommitsRepo(repo.name).subscribe((commitsData: any) => {
          repo.commitsTotales = commitsData.length;
        });
      });
    });
  }

  obtenerCommits(repositorio:string){
    this.apiHub.CommitsRepo(repositorio).subscribe((data:any) => {
      this.commits = data;
      this.commitsTotales = this.commits.length;
    });
  }

  toggleVisibility(index: number, repositorio:string) {
    this.obtenerCommits(repositorio);
    
    this.cardVisible = !this.cardVisible;
    this.commitIndex = index;
    if (this.cardVisible) {
      const item = this.repositorios[index];
    } else {
      this.commitIndex = null;
    }
  } 
  

}
