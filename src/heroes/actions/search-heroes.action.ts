import { heroAPI } from "../api/hero.api";
import type { Hero } from "../types/hero.interface";

interface Options {
    name?: string;
    team?: string;
    category?: string;
    status?: string;
    strength?: string;
}

const BASE_URL = import.meta.env.VITE_API_URL;


export const searchHeroesAction = async ({ name = '', team = '', category = '', status = '', strength = '' }: Options): Promise<Hero[]> => {

    if (!name && !team && !category && !status && !strength) {
        return []
    }

    const { data } = await heroAPI.get<Hero[]>('/search', {
        params: {
            name, category, team, status, strength
        }
    });

    const heroes = data.map(hero => ({
        ...hero,
        image: `${BASE_URL}/images/${hero.image}`
    })
    )

    return heroes
}