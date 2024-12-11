import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { provideHttpClient } from '@angular/common/http';
import { AppComponent } from './app.component';  // 此處不需要再聲明其他組件

@NgModule({
  declarations: [],
  imports: [
    BrowserModule,
    AppRoutingModule,
    
  ],
  providers: [
    provideHttpClient()
  ],
  bootstrap: [AppComponent]  // 只需要引導 AppComponent
})
export class AppModule { }
