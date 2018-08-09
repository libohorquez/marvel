import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Comic } from '../../models/comic.model';
import { LocalStorageService } from 'angular-2-local-storage';
import { Favourite, FavouriteThumbnail } from '../../models/favourite.model';
import { empty } from 'rxjs';
import { async } from 'rxjs/internal/scheduler/async';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {
  ModalComics: Comic[] = [];
  dataStorage: Favourite[] = [];
  favourites: Favourite[] = [];

  constructor(public dialog: MatDialog, public thisDialogRef: MatDialogRef<ModalComponent>,
    private localStorageService: LocalStorageService, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.thisDialogRef.disableClose = true;
  }

  ngOnInit() {
    this.getFavourites();
    this.ModalComics = this.data;
  }

  // Cerrar modal
  public closeModal(): void {
    this.getFavourites();
    const dialogRef = this.thisDialogRef.close(this.dataStorage);
  }

  // Guardar comic seleccionado en LocalStorage
  async setFavourites(comic) {
    const data = comic;
    if (comic != null || comic !== empty || comic !== undefined) {
      await this.getFavourites();
      if (this.dataStorage === null || this.dataStorage.length === 0) {
        this.dataStorage.push(comic);
        this.localStorageService.set('favourites', this.dataStorage);
      }
      if (!this.dataStorage.some(x => x.id === data.id)) {
        this.dataStorage.push(comic);
        this.localStorageService.set('favourites', this.dataStorage);
      }
    }
    await this.getFavourites();
  }

  // Lista favoritos de LocalStorage
  async getFavourites() {
    this.dataStorage = await <Favourite[]>this.localStorageService.get('favourites');
  }

  // Eliminar favoritos
  deleteFavourites(comic) {
    const index: number = this.favourites.indexOf(comic);
    if (index !== -1) {
      this.favourites.splice(index, 1);
    }
    this.localStorageService.set('favourites', this.favourites);
  }

  async randomize(min: number, max: number) {
    return await Math.floor(Math.random() * (max - min + 1) + min);
  }

  async addRandoms() {
    const arrayLength = this.ModalComics.length;
    console.log('array', arrayLength);
    await this.getFavourites();
    for (let i = 0; i <= 2;) {
      const rndm = await this.randomize(0, this.ModalComics.length - 1);
      console.log('random number: ', rndm);
      if (!this.dataStorage.some(x => x.id === this.ModalComics[rndm].id)) {
        this.dataStorage.push(this.ModalComics[rndm]);
        console.log('se añadio a favoritos ', this.dataStorage);
        this.localStorageService.set('favourites', this.dataStorage);
        i++;
      }
    }

  }


}



