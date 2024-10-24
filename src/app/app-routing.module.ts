//app-routing.module.ts
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

// Define the routes for the application
const routes: Routes = [
  // Redirect the root path to the home page
  { path: '', redirectTo: 'home', pathMatch: 'full' }, 
  { path: 'home', loadChildren: () => import('./home/home.module').then(m => m.HomePageModule) }, // Home page route
  
  // Lazy-load the feedback module when navigating to the 'feedback' route
  { path: 'feedback', loadChildren: () => import('./feedback/feedback.module').then(m => m.FeedbackPageModule) },

  // Lazy-load the feedback list module when navigating to the 'feedback-list' route
  { path: 'feedback-list', loadChildren: () => import('./feedback-list/feedback-list.module').then(m => m.FeedbackListPageModule) },

  // Lazy-load the login module when navigating to the 'login' route
  { path: 'login', loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule) },

  // Lazy-load the register module when navigating to the 'register' route
  { path: 'register', loadChildren: () => import('./register/register.module').then(m => m.RegisterPageModule) }
];

@NgModule({
  imports: [
    // Configure the router with the routes and preload all lazy-loaded modules
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule] // Export the RouterModule for use throughout the app
})
export class AppRoutingModule { }
