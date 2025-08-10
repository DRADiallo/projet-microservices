import { Component, OnInit } from '@angular/core';
import { EtudiantService } from 'src/app/services/etudiant.service';
import { ClasseService } from 'src/app/services/classe.service';
import { Etudiant } from 'src/app/models/etudiant';
import { Classe } from 'src/app/models/classe';
import { Color, ScaleType } from '@swimlane/ngx-charts';

@Component({
  selector: 'app-list-statistiques',
  templateUrl: './statistiques-page.component.html',
  styleUrls: ['./statistiques-page.component.css'],
})
export class ListStatistiquesComponent implements OnInit {
  etudiants: Etudiant[] = [];
  classes: Classe[] = [];

  colorScheme: Color = {
    name: 'myScheme',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: ['#6366F1'],
  };

  // Adaptation : ngx-charts attend des objets { name: string, value: number }
  nombreEtudiantsParClasse: { name: string; value: number }[] = [];

  constructor(
    private etudiantService: EtudiantService,
    private classeService: ClasseService
  ) {}

  ngOnInit(): void {
    this.chargerClasses();
    this.chargerEtudiants();
  }

  chargerClasses(): void {
    this.classeService.listerClasses().subscribe({
      next: (data) => {
        this.classes = data;
        this.verifierEtCalculer();
      },
      error: (err) => console.error('Erreur chargement classes:', err),
    });
  }

 chargerEtudiants(): void {
  this.etudiantService.listerEtudiants().subscribe({
    next: (data) => {
      console.log('Étudiants chargés:', data);
      this.etudiants = data;
      this.verifierEtCalculer();
    },
    error: (err) => console.error('Erreur chargement étudiants:', err),
  });
}



  verifierEtCalculer(): void {
    if (this.classes.length > 0 && this.etudiants.length > 0) {
      this.calculerStatistiques();
    }
  }

// calculerStatistiques(): void {
//   this.nombreEtudiantsParClasse = this.classes.map(classe => {
//     const count = this.etudiants.filter(e => {
//       console.log('Comparaison:', e.classeId, classe.id, e.classeId === classe.id);
//       return e.classeId === classe.id;
//     }).length;
//     return { name: classe.libelle, value: count };
//   });

//   console.log('Résultat final:', this.nombreEtudiantsParClasse);
// }

   // Remplacez la fonction calculerStatistiques() par ce code
calculerStatistiques(): void {
  this.nombreEtudiantsParClasse = this.classes.map(classe => {
    const count = this.etudiants.filter(e => {
      // Conversion des IDs en chaînes de caractères pour une comparaison sûre
      // Affiche les valeurs et le résultat dans la console pour le débogage
      console.log('Comparaison:', String(e.classeId), '===', String(classe.id), '=>', String(e.classeId) === String(classe.id));
      return String(e.classeId) === String(classe.id);
    }).length;
    return { name: classe.libelle, value: count };
  });

  console.log('Résultat final:', this.nombreEtudiantsParClasse);
}



}
