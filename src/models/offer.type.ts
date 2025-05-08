import { HouseType } from "./house-type.enum.js"
import { Location } from "./location.type.js"
import { Option } from "./option.type.js"
import { User } from "./user.type.js"

export type Offer = {
    title: string
    description: string
    postDate: Date
    city: string
    image: string
    photos: string
    isPremium: boolean
    isFavorite: boolean
    rating: number
    houseType: HouseType
    roomCount: number
    guestCount: number
    price: number
    options: Option[]
    user: User
    location: Location
    commentCount: number
}