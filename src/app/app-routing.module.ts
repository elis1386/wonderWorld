import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminProfileComponent } from './pages/admin-profile/admin-profile.component';
import { BookComponent } from './pages/book/book.component';
import { SignInComponent } from './pages/sign-in/sign-in.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { UserProfileComponent } from './pages/user-profile/user-profile.component';
import { HomeComponent } from './pages/home/home.component';
import { AuthorComponent } from './pages/author/author.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'sign-in', component: SignInComponent },
  { path: 'sign-up', component: SignUpComponent },
  { path: 'book/:isbn', component: BookComponent },
  { path: 'admin', component: AdminProfileComponent },
  { path: 'user', component: UserProfileComponent },
  { path: 'authors/:id', component: AuthorComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
