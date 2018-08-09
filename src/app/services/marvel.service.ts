import { Injectable } from '@angular/core';
import { Md5 } from 'ts-md5/dist/md5';
import { Http } from '@angular/http';
import { Character } from '../models/character.model';
import { MarvelResponse } from '../models/marvel.model';
import { Comic } from '../models/comic.model';

@Injectable()
export class MarvelService {
    private _marvelCharacterUrl = 'https://gateway.marvel.com:443/v1/public/characters';
    private _publicKey = '3c647ac77e07e57709fa4da9b9e20e01';
    private _privateKey = 'f1df8756e9a11035ed797012de52939b97bba512';
    constructor(private _httpService: Http) { }
    // Construye el hash
    private getHash(timeStamp: string): string {
        const hashGenerator: Md5 = new Md5();
        hashGenerator.appendStr(timeStamp);
        hashGenerator.appendStr(this._privateKey);
        hashGenerator.appendStr(this._publicKey);
        const hash: string = hashGenerator.end().toString();
        return hash;
    }

    // Obtiene fecha y hora actual para pasar el timestamp a la solicitud del api
    private getTimeStamp(): string {
        return new Date().valueOf().toString();
    }

    // Obtiene todos los personajes
    public async getCharacters(limit: number = 10, prefix: string = null): Promise<MarvelResponse<Character>> {
        const timeStamp = this.getTimeStamp();
        const hash = this.getHash(timeStamp);
        let requestUrl = this._marvelCharacterUrl + '?limit=' + limit + '&ts=' + timeStamp + '&apikey=' + this._publicKey + '&hash=' + hash;
        if (prefix) {
            requestUrl += '&nameStartsWith=' + prefix;
        }
        const response = await this._httpService.get(requestUrl).toPromise();
        return response.json();
    }

    // Obtiene los comics por id del personaje elegido
    public async getComics(limit: number = 10, id: number = null): Promise<MarvelResponse<Comic>> {
        const timeStamp = this.getTimeStamp();
        const hash = this.getHash(timeStamp);
        const requestUrl = this._marvelCharacterUrl + '/' + id + '/' + 'comics' + '?ts=' + timeStamp + '&apikey='
            + this._publicKey + '&hash=' + hash;
        const response = await this._httpService.get(requestUrl).toPromise();
        return response.json();
    }

}
