import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { provideHttpClient } from '@angular/common/http';
import { AppComponent } from './app.component';  // 此處不需要再聲明其他組件
import { ReactiveFormsModule } from '@angular/forms';
//import { HttpClientModule } from '@angular/common/http'; 改用provideHttpClient因為版本問題
import { PostCreateComponent } from './post/postcreate/postcreate.component';
import { FormsModule } from '@angular/forms'; 

@NgModule({
  declarations: [],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AppComponent,
    PostCreateComponent,
    BrowserModule,
    ReactiveFormsModule,
    FormsModule, 
  ],
  providers: [
    provideHttpClient()
  ],
  bootstrap: [AppComponent] 
})
export class AppModule { }
