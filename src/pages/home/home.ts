import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';

import { InicioPage } from './../inicio/inicio';
import { RegistroPage } from './../registro/registro';

import { TasksServiceProvider } from '../../providers/tasks-service/tasks-service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  usuario : string = "";
  contrasena : string = "";
  iniciar : boolean = true;
  msj_obligatorio : string = "Campo obligatorio";
  alertas: boolean[] = [false,false];

  paginaInicio = InicioPage;
  paginaRegistro = RegistroPage;

  tasks: any[] = [];

  constructor(private NavParams: NavParams ,private navCtrl: NavController, public alertCtrl: AlertController, public tasksService: TasksServiceProvider) {

  }

  validaInicio(){
    this.iniciar = true;
    this.alertas = [false,false];
    if(this.usuario == ""){
      this.iniciar = false;
      this.alertas[0] = true;
    }
    if(this.contrasena == ""){
      this.iniciar = false;
      this.alertas[1] = true;
    }
  }

  AlertInicio() {
    this.validaInicio();
    if(this.iniciar){
      let alert = this.alertCtrl.create({
        title: 'Login',
        subTitle: 'Sesión iniciada...Hola: ' + this.usuario.toUpperCase()
        /*buttons: [{
          text: 'Iniciar',
          handler: data => {
            console.log(data);
            this.navCtrl.push(this.paginaInicio,{ 'nombre':this.usuario });
          }
        }]*/
      });
      console.log('recibe: ' + this.usuario);
      alert.present();
    }
  }

  AlertRegistro() {
    this.navCtrl.push(this.paginaRegistro,{ 'nombre':this.usuario });    
    console.log('recibe: ' + this.usuario);
  }

  showAlertRecuperar() {
    let alert = this.alertCtrl.create({
      title: 'Recuperar Contraseña',
      subTitle: 'Escribe tu correo para recuperar tu contraseña.',
      inputs : [{
          placeholder: 'Correo electrónico'
        }
      ],
      buttons: [
        {
          text: 'Enviar correo',
          handler: data => {
            console.log(data);
            this.showAlertConfirmaRecuperar(data);
          }
        }
      ]
    });
    alert.present();
  }

  showAlertConfirmaRecuperar(data) {
    let alert = this.alertCtrl.create({
      title: 'Recuperar Contraseña',
      subTitle: 'Acabamos de enviarte un mensaje a tu correo: ' + data[0],
      buttons: ['OK']
    });
    alert.present();
  }

/************************************************* */
  ionViewDidLoad(){
    this.getAllTasks();
  }

  deleteTask(task: any, index){
    this.tasksService.delete(task)
    .then(response => {
      console.log( response );
      this.tasks.splice(index, 1);
    })
    .catch( error => {
      console.error( error );
    })
  }

  getAllTasks(){
    this.tasksService.getAll()
    .then(tasks => {
      console.log(tasks);
      this.tasks = tasks;
    })
    .catch( error => {
      console.error( error );
    });
  }

  openAlertNewTask(){
    let alert = this.alertCtrl.create({
      title: 'Crear tarea',
      message: 'escribe el nombre de la tarea',
      inputs: [
        {
          name: 'title',
          placeholder: 'Digitar nueva tarea.',
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          handler: () =>{
            console.log('cancelar');
          }
        },
        {
          text: 'Crear',
          handler: (data)=>{ 
            data.completed = false;
            this.tasksService.create(data)
            .then(response => {
              this.tasks.unshift( data );
            })
            .catch( error => {
              console.error( error );
            })
          }
        }
      ]
    });
    alert.present();
  }

  updateTask(task, index){
    task = Object.assign({}, task);
    task.completed = !task.completed;
    this.tasksService.update(task)
    .then( response => {
      this.tasks[index] = task;
    })
    .catch( error => {
      console.error( error );
    })
  }

}
