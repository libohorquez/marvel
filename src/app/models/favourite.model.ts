export class Favourite {
    public id: number;
    public title: string;
    public thumbnail: FavouriteThumbnail;
    public description: string;
}

export class FavouriteThumbnail {
    public path: string;
    public extension: string;
}
