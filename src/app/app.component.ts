import { Component, OnInit, ViewChild } from '@angular/core';
import { MarvelService } from './services/marvel.service';
import { Character } from './models/character.model';
import { MarvelResponse } from './models/marvel.model';
import { MatDialog } from '@angular/material';
import { ModalComponent } from './components/modal/modal.component';
import { Comic, ComicThumbnail } from './models/comic.model';
import { Favourite, FavouriteThumbnail } from './models/favourite.model';
import { ModalService } from './services/modal.service';
import { empty } from 'rxjs';
import { LocalStorageService } from 'angular-2-local-storage';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css'],
  providers: [
    MarvelService,
    ModalService
  ]
})
export class AppComponent implements OnInit {
  @ViewChild('mat-dialog-1') modalComic: ModalComponent;
  dialogResult: any;
  title = 'Welcome to Marvel World';
  attribution: string;
  characters: Character[] = [];
  shown = 10;
  total: number = null;
  filter = '';
  comic: Comic;
  comics: Comic[] = [];
  favourites: Favourite[] = [];
  dataStorage: Favourite[] = [];

  constructor(
    private _marvelService: MarvelService,
    private _modalService: ModalService,
    public dialog: MatDialog,
    private localStorageService: LocalStorageService,
  ) { }

  async ngOnInit() {
    await this.refreshList();
    this.getFavourites();
  }

  // Carga la lista de personajes dependiendo del número de ítems a mostrar elegido
  async refreshList() {
    const response: MarvelResponse<Character> = await this._marvelService.getCharacters(this.shown, this.filter);
    this.characters = response.data.results;
    this.total = response.data.total;
    this.attribution = response.attributionHTML;
  }

  // Elimina de Favoritos el cómic elegido
  deleteFavourites(comic) {
    const index: number = this.favourites.indexOf(comic);
    if (index !== -1) {
      this.favourites.splice(index, 1);
    }
    this.localStorageService.set('favourites', this.favourites);
  }

// Obtiene la lista de favoritos desde Local Storage
  async getFavourites() {
    this.dataStorage = await <Favourite[]>this.localStorageService.get('favourites');
    this.favourites = this.dataStorage;

  }

  // Despliega el modal
  async openModal(idCharacter: number) {
    const response: MarvelResponse<Comic> = await this._marvelService.getComics(10, idCharacter);
    this.comics = response.data.results;
    const dialogRef = this.dialog.open(ModalComponent, { width: '50%', data: this.comics });
    dialogRef.afterClosed().subscribe(result => {
      console.log('favourites app: ', this.favourites);
      console.log('result app: ', result);
      if (result !== null || result !== empty || result !== undefined) {
        this.favourites = result;
        console.log('Esto es favourites dentro del if', this.favourites);
      }
    });

  }

}
