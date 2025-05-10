import { Offer, HouseType } from '../models/index.js';

export function createOffer(offerData: string): Offer {
  const [
    title, description, createdDate, city, image, photos,
    isPremium, isFavorite, rating, houseType, roomCount, guestCount,
    price, options, username, email, avatarPath, password, userType,
    latitude, longitude
  ] = offerData.replace('\n', '').split('\t');

  return {
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
    user: { username, email, avatarPath, password, userType },
    location: { latitude, longitude },
    commentCount: 0
  };
}
