import { heroAPI } from "../api/hero.api";
import type { HeroesResponse } from "../types/get-heroes-response";


const BASE_URL = import.meta.env.VITE_API_URL;

export const getHeroesByPageAction = async (page: number, limit: number = 6, category = 'all'): Promise<HeroesResponse> => {




    if (isNaN(page) || page < 1) {
        page = 1;
    }

    const { data } = await heroAPI.get<HeroesResponse>('/', {
        params: {
            offset: (page - 1) * limit,
            limit,
            category
        }
    });

    const heroes = data.heroes.map(hero => ({
        ...hero,
        image: `${BASE_URL}/images/${hero.image}`
    })
    )

    return {
        ...data,
        heroes
    }

}
