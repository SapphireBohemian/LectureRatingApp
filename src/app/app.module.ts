import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';

// Import HttpClientModule
import { provideHttpClient } from '@angular/common/http';

// Import FormsModule for ngModel
import { FormsModule } from '@angular/forms';

// Import your admin components
import { StudentManagementComponent } from './admin/student-management/student-management.component';
import { LecturerManagementComponent } from './admin/lecturer-management/lecturer-management.component';
import { FeedbackManagementComponent } from './admin/feedback-management/feedback-management.component';
import { AverageRatingsComponent } from './components/average-ratings/average-ratings.component';
import { RatingTrendsComponent } from './components/rating-trends/rating-trends.component';
import { PendingUsersComponent } from './admin/pending-users/pending-users.component';
import { LeaderboardComponent } from './leaderboard/leaderboard.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';

@NgModule({
  declarations: [
    AppComponent,
    // Declare your components here
    StudentManagementComponent,
    LecturerManagementComponent,
    FeedbackManagementComponent,
    AverageRatingsComponent,
    RatingTrendsComponent,
    PendingUsersComponent,
    LeaderboardComponent,
    EditProfileComponent
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule // Add FormsModule here
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideHttpClient()
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
