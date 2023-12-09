import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http'


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { BookListComponent } from './components/book-list/book-list.component';
import { AuthorComponent } from './pages/author/author.component';
import { AuthorBookComponent } from './components/author-book/author-book.component'
import { BookComponent } from './pages/book/book.component';
import { UserProfileComponent } from './pages/user-profile/user-profile.component';
import { AdminProfileComponent } from './pages/admin-profile/admin-profile.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { BannerComponent } from './components/banner/banner.component';
import { SignInComponent } from './pages/sign-in/sign-in.component';
import { NewArriveComponent } from './components/new-arrive/new-arrive.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { CreateBookModalComponent } from './components/create-book-modal/create-book-modal.component';
import { HomeComponent } from './pages/home/home.component';
import { AuthService } from './services/auth.service';
import { ModalComponent } from './components/modal/modal.component';
import { UpdateBookModalComponent } from './components/update-book-modal/update-book-modal.component';



@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        FooterComponent,
        AuthorComponent,
        AuthorBookComponent,
        BookComponent,
        UserProfileComponent,
        AdminProfileComponent,
        SignInComponent,
        HomeComponent,
        NewArriveComponent,
        SignUpComponent,
        BookListComponent,
        CreateBookModalComponent,
        SearchBarComponent,
        ModalComponent,
        UpdateBookModalComponent


    ],
    providers: [AuthService],
    bootstrap: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        RouterModule,
        BannerComponent,
        CommonModule,
        ReactiveFormsModule,
        HttpClientModule,
        BrowserAnimationsModule
    
    ]
})
export class AppModule { }
