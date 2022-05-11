import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { PostInterceptorService  } from 'src/app/_helper/interceptor-service/post-interceptor.service';
import { PreInterceptorService } from 'src/app/_helper/interceptor-service/pre-interceptor.service';
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: PreInterceptorService, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: PostInterceptorService, multi: true },
  ],
  bootstrap: [AppComponent],
  
})
export class AppModule { }
