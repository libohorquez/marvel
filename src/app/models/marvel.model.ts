import { Character } from './character.model';

export abstract class MarvelResponse<T> {
    public status: string;
    public attributionHTML: string;
    public data: MarvelList<T>;
    public code: number;
}

export class MarvelList<T> {
    public count: number;
    public offset: number;
    public limit: number;
    public total: number;
    public results: T[];
}
