import { FileReader } from './file-reader.interface.js';
import { readFileSync } from 'node:fs';
import { Offer, HouseType } from '../../models/index.js';

export class TSVFileReader implements FileReader {
    private rawData = '';

    constructor(
        private readonly filename: string
    ) { }

    public read(): void {
        this.rawData = readFileSync(this.filename, { encoding: 'utf-8' });
    }

    public toArray(): Offer[] {
        if (!this.rawData) {
            throw new Error('File was not read');
        }

        return this.rawData
            .split('\n')
            .filter((row) => row.trim().length > 0)
            .map((line) => line.split('\t'))
            .map(([title, description, createdDate, city, image, photos,
                isPremium, isFavorite, rating, houseType, roomCount, guestCount,
                price, options, name, email, avatarPath, password, userType, latitude, longitude]) => ({
                    title,
                    description,
                    postDate: new Date(createdDate),
                    city,
                    image,
                    photos,
                    isPremium: JSON.parse(isPremium),
                    isFavorite: JSON.parse(isFavorite),
                    rating: Number(rating),
                    houseType: HouseType[houseType as 'apartment' | 'house' | 'room' | 'hotel'],
                    roomCount: Number(roomCount),
                    guestCount: Number(guestCount),
                    price: Number(price),
                    options: options.split(';').map((name) => ({ name })),
                    user: { name, email, avatarPath, password, userType },
                    location: { latitude, longitude },
                    commentCount: 0
                }));
    }
}