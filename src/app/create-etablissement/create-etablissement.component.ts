import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms'
import {HttpClient} from "@angular/common/http";

interface listeTypeDptandEtablishment {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'cf-create-etablissement',
  templateUrl: './create-etablissement.component.html',
  styleUrls: ['./create-etablissement.component.css']
})
export class CreateEtablissementComponent implements OnInit {
  date = new FormControl(new Date());

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  /**
   * liste departement
   * doit provenir d'une API
   */
  dpt: listeTypeDptandEtablishment[] = [
    /*{value: '', viewValue: 'Département'},*/
    {value: '01', viewValue: 'Ain'},
    {value: '35', viewValue: 'Ille-et-Villaine'},
    {value: '22', viewValue: "Côtes-d'Armor"}
  ];
  /**
   * Liste type d'etablissement
   */
  typeEta: listeTypeDptandEtablishment[] = [
    /*{value: '0', viewValue: 'Type établissement'},  */
    {value: '1', viewValue: 'Etablissement'},
    {value: '2', viewValue: 'Organisme'},
    {value: '3', viewValue: 'Internat'},
    {value: '4', viewValue: 'Fournisseur'},
    {value: '5', viewValue: 'Groupes scolaires'},
  ];
  title = 'newMat';
  isLinear = true;
  selectedoui = 'oui' ;
  selectednon = 'non' ;
  firstFormGroup!: FormGroup;
  secondFormGroup!: FormGroup;
/*Array for retrieved data from api    */
  li:any;
  listeDelegue:any;
  listeDioces:any;
  listeDptmt:any;
  listeTypeEtabl:any;
  constructor(private _formBuilder: FormBuilder, private http:HttpClient) {
  }

  ngOnInit() {
    /**
     * Retrieve data for "source de mise à jour "
                         */
                        this.http.get('http://localhost/ONPC/public/extract/sourcemaj')
                          .subscribe(Response => {
                            if(Response){
                              this.li=Response;
                            }
                          });
     /**
     * Retrieve data for "delegues"
     */
                  this.http.get('http://localhost/ONPC/public/liste/delegues')
                    .subscribe(Response => {
                      if(Response){
                        this.listeDelegue=Response;
                      }
                    });
/**
     * Retrieve data for "diocese"
     */
                  this.http.get('http://localhost/ONPC/public/extract/diocese')
                    .subscribe(Response => {
                      if(Response){
                        this.listeDioces=Response;
                      }
                    });

      /**
      * Retrieve data for departement
      */
                  this.http.get('http://localhost/ONPC/public/extract/dptmt')
                    .subscribe(Response => {
                      if(Response){
                        this.listeDptmt=Response;
                      }
                    });
    /**
     * Retrieve data for type etablissement
     */
                  this.http.get('http://localhost/ONPC/public/extract/typeetabl')
                    .subscribe(Response => {
                      if(Response){
                        this.listeTypeEtabl=Response;
                      }
                    });

    /**
     * formulaire "departement et type etablissement"
     */
          this.firstFormGroup = this._formBuilder.group({
            /**
             * champs obligatoires
             */
                department: ['', Validators.required],
                typeEtablissement: ['', Validators.required]
          });

          /**
           * formulaire coordonnées
           */
          this.secondFormGroup = this._formBuilder.group({

            /**
             * champs obligatoires
             */
                  exportweb: [''],
                  presencepapier: [''],
                  optionprint:[''],
                  presenceweb: [''],
                  presencegratuite: [''],
                  SourceMaj: [''],
                  dateDerniereModif: [''],
                  dateDEnvoiMailMAj: [''],
                  mailGestionEdito1: [''],
                  mailGestionEdito2: [''],
                  horsSecteur: [''],
                  delegue: ['',Validators.required],
                  rubriqueprincipale: ['',Validators.required],
                  typeetablissement1  : ['',Validators.required],


          });

  }


  submit() {
    console.log(this.firstFormGroup.value);
    console.log(this.secondFormGroup.value);
  }
}
