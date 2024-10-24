import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

// Import HttpClientModule
import { provideHttpClient } from '@angular/common/http';

// Import FormsModule for ngModel
import { FormsModule } from '@angular/forms';

// Import your admin components
import { StudentManagementComponent } from './admin/student-management/student-management.component';
import { LecturerManagementComponent } from './admin/lecturer-management/lecturer-management.component';
import { FeedbackManagementComponent } from './admin/feedback-management/feedback-management.component';

@NgModule({
  declarations: [
    AppComponent,
    // Declare your components here
    StudentManagementComponent,
    LecturerManagementComponent,
    FeedbackManagementComponent,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    FormsModule // Add FormsModule here
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideHttpClient()
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
