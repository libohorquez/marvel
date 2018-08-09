export class Comic {
    public id: number;
    public title: string;
    public thumbnail: ComicThumbnail;
    public description: string;
}

export class ComicThumbnail {
    public path: string;
    public extension: string;
}
