import dayjs from 'dayjs';
import { OfferGenerator } from './offer-generator.interface.js';
import { MockServerData, HouseType } from '../../models/index.js';
import { generatePassword, generateRandomBoolValue, generateRandomValue, getRandomItem, getRandomItems } from '../../utils/index.js';

const MIN_PRICE = 100;
const MAX_PRICE = 100000;

const FIRST_WEEK_DAY = 1;
const LAST_WEEK_DAY = 7;

export class TSVOfferGenerator implements OfferGenerator {
  constructor(private readonly mockData: MockServerData) { }

  public generate(): string {
    const title = getRandomItem<string>(this.mockData.titles);
    const description = getRandomItem<string>(this.mockData.descriptions);
    const createdDate = dayjs()
      .subtract(generateRandomValue(FIRST_WEEK_DAY, LAST_WEEK_DAY), 'day')
      .toISOString();
    const city = getRandomItem<string>(this.mockData.cities);
    const image = getRandomItem<string>(this.mockData.offerImages);
    const photos = getRandomItem<string>(this.mockData.offerImages);
    const isPremium = generateRandomBoolValue();
    const isFavorite = generateRandomBoolValue();
    const rating = generateRandomValue(1, 5, 1).toString();
    const houseType = getRandomItem([HouseType.apartment, HouseType.house, HouseType.room, HouseType.hotel]);
    const roomCount = generateRandomValue(1, 8).toString();
    const guestCount = generateRandomValue(1, 10).toString();
    const price = generateRandomValue(MIN_PRICE, MAX_PRICE).toString();
    const options = getRandomItems<string>(this.mockData.options).join(';');
    const username = getRandomItem<string>(this.mockData.users);
    const email = getRandomItem<string>(this.mockData.emails);
    const avatarPath = getRandomItem(this.mockData.avatars);
    const password = generatePassword();
    const userType = getRandomItem<string>(this.mockData.userTypes);
    const latitude = generateRandomValue(1, 90, 6).toString();
    const longitude = generateRandomValue(1, 90, 6).toString();

    return [
      title, description, createdDate, city, image, photos,
      isPremium, isFavorite, rating, houseType, roomCount, guestCount,
      price, options, username, email, avatarPath, password, userType,
      latitude, longitude
    ].join('\t');
  }
}
