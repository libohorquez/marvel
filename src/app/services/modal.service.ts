import { Injectable } from '@angular/core';
import { Md5 } from 'ts-md5/dist/md5';
import { Http } from '@angular/http';
import { MarvelResponse } from '../models/marvel.model';
import { Comic } from '../models/comic.model';
import { MarvelService } from './marvel.service';

@Injectable()
export class ModalService {
    private _marvelCharacterUrl = 'https://gateway.marvel.com:443/v1/public/characters';
    private _publicKey = '3c647ac77e07e57709fa4da9b9e20e01';
    private _privateKey = 'f1df8756e9a11035ed797012de52939b97bba512';
    private _comicId: number;
    public comics: Comic[] = [];
    constructor(private _httpService: Http, private marvelService: MarvelService) { }

    // Crea el hash
    private getHash(timeStamp: string): string {
        const hashGenerator: Md5 = new Md5();
        hashGenerator.appendStr(timeStamp);
        hashGenerator.appendStr(this._privateKey);
        hashGenerator.appendStr(this._publicKey);
        const hash: string = hashGenerator.end().toString();
        return hash;
    }

    private getTimeStamp(): string {
        return new Date().valueOf().toString();
    }

}


