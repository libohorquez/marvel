import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { ModalComponent } from './components/modal/modal.component';
import { MatDialogModule, MatIconModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LocalStorageModule } from 'angular-2-local-storage';

@NgModule({
    imports: [
        BrowserModule,
        HttpModule,
        FormsModule,
        MatDialogModule,
        BrowserAnimationsModule,
        MatIconModule,
        LocalStorageModule.withConfig({
            prefix: 'Marvel-SPA',
            storageType: 'localStorage'
        })
    ],
    declarations: [ AppComponent, ModalComponent ],
    exports: [ModalComponent],
    entryComponents: [ModalComponent],
    bootstrap: [AppComponent]
})
export class AppModule { }
