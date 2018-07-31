import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { FormsModule } from '@angular/forms';
import { SQLite } from '@ionic-native/sqlite';
//import { TasksService } from '../providers/tasks-service/tasks-service';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { InicioPage } from '../pages/inicio/inicio';
import { RegistroPage } from '../pages/registro/registro';
import { TasksServiceProvider } from '../providers/tasks-service/tasks-service';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    InicioPage,
    RegistroPage
  ],
  imports: [
    BrowserModule,
    FormsModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    InicioPage,
    RegistroPage
  ],
  providers: [ //logica del negocio, bd, 
    StatusBar,
    SplashScreen,
    SQLite,
    //TasksService,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    TasksServiceProvider
  ]
})
export class AppModule {}
