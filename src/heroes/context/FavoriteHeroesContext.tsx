import { createContext, useEffect, useState, type PropsWithChildren } from "react";
import type { Hero } from '../types/hero.interface';


interface FavoriteHeroesContextType {

    //State
    favoriteHeroes: Hero[]
    favoriteCount: number;

    //Functions
    isFavorite: (hero: Hero) => boolean;
    toggleFavorite: (hero: Hero) => void;

}


// eslint-disable-next-line react-refresh/only-export-components
export const FavoriteHeroesContext = createContext<FavoriteHeroesContextType>({} as FavoriteHeroesContextType);


const getFavoritesFromLocalStorage = (): Hero[] => {
    const favorites = localStorage.getItem('favorites');
    return favorites ? JSON.parse(favorites) : [];
}


export const FavoriteHeroesProvider = ({ children }: PropsWithChildren) => {

    const [favoriteHeroes, setFavoriteHeroes] = useState<Hero[]>(getFavoritesFromLocalStorage);

    const toggleFavorite = (hero: Hero) => {
        const heroExist = favoriteHeroes.find(h => h.id === hero.id);

        if (heroExist) {
            setFavoriteHeroes(favoriteHeroes.filter(h => h.id !== hero.id))
            return;
        }

        setFavoriteHeroes([...favoriteHeroes, hero])
    }

    const isFavorite = (hero: Hero) => {
        return favoriteHeroes.some(h => h.id === hero.id)
    }

    useEffect(() => {
        localStorage.setItem('favorites', JSON.stringify(favoriteHeroes))
    }, [favoriteHeroes]);


    return (<FavoriteHeroesContext.Provider value={{
        favoriteCount: favoriteHeroes.length,
        favoriteHeroes: favoriteHeroes,
        isFavorite: isFavorite,
        toggleFavorite: toggleFavorite

    }}>
        {children}
    </FavoriteHeroesContext.Provider>)
}