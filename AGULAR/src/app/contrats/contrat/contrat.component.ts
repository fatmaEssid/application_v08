import { Component, OnInit } from '@angular/core';
import { ClientService } from 'src/app/shared/client.service';
import { ContratService } from 'src/app/shared/contrat.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Client } from 'src/app/shared/client.model';
import { FinalClient } from 'src/app/shared/final-client.model';
import { FinalClientService } from 'src/app/shared/final-client.service';
import { NgForm, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { toDate } from '@angular/common/src/i18n/format_date';

@Component({
  selector: 'app-contrat',
  templateUrl: './contrat.component.html',
  styles: []
})
export class ContratComponent implements OnInit {
  clientList:Client[];
  finalClientList:FinalClient[];
  isValid : boolean = true;
  //reglage de la date 
 minDate = new Date();

  
  constructor(private service:ContratService, 
    private clientService:ClientService,
    private finalClientService:FinalClientService,
    private router:Router,
    public snackBar: MatSnackBar,private currentRouter:ActivatedRoute) { }

  ngOnInit() {

    this.resetForm();
    this.clientService.getClientList().then(res=> this.clientList = res as Client[]);
  
   
  }
 updateID(ctrl){
  if(ctrl.selectedIndex==0)
  this.finalClientList=[];
 
  else
  this.finalClientService.getFinalClientsList(this.clientList[ctrl.selectedIndex - 1].client_id).then(res=> this.finalClientList = res as FinalClient[]);
  }


resetForm(form?:NgForm){
       if(form = null)
    this.resetForm(form);
    this.service.formData = {
      contrat_id:null,
      final_client_id:0,
      client_id:0,
      description:'',
      prix_unitaire:0,
      date_debut:null,
      date_fin:null,
      final_client_nom:'',
      client_nom:''

 };
   
  }
  /*onSubmit(form: NgForm){
   
    this.service.saveOrUpdateContrat().subscribe(res=> {
      this.resetForm();
      this.openSnackBar('Contrat', 'Bien Enregistrée');
      this.router.navigate(['/contrats']);
    });
    }*/
    onSubmit(form: NgForm){
    if (form.value.contrat_id == null) 
    this.insertRecord(form);
    else
    this. updateRecord(form);
  }
  insertRecord(form: NgForm){
    this.service.postContrat(form.value).subscribe(res => {
      this.openSnackBar('Contrat', 'Enregistré avec succès');
      this.resetForm(form);
      this.service.refreshList();
    });
  }
 updateRecord(form: NgForm){
    this.service.putContrat(form.value).subscribe(res => {
      this.openSnackBar('Contrat', 'Modifié avec succès');
      this.resetForm(form);
      this.service.refreshList();
    });
  } 
    openSnackBar(message: string, action: string) {
      this.snackBar.open(message, action, {
         duration: 4000,
         verticalPosition: 'top',
        
         
      });
   }
  
}//FIN DE LA CLASSE ♣♥♥☻☺♦♣♠○◘•♀♀♫☼►☺◄☼►
/*  onSubmit(form: NgForm){
    if (form.value.ID == null) 
    this.insertRecord(form);
    else
    this. updateRecord(form);
  }
  insertRecord(form: NgForm){
    this.service.postClient(form.value).subscribe(res => {
      this.toastr.success('Inséré avec succès!', 'Registre de client');
      this.resetForm(form);
      this.service.refreshList();
    });
  }

  updateRecord(form: NgForm){
    this.service.putClient(form.value).subscribe(res => {
      this.toastr.info('Modifié avec succès!', 'Registre de client');
      this.resetForm(form);
      this.service.refreshList();
    });
  }*/