import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { CustomJumbotron } from '@/components/custom/CustomJumbotron';
import { HeroStats } from '@/heroes/components/HeroStats';
import { HeroGrid } from '@/heroes/components/HeroGrid';
import { use, useMemo } from 'react';
import { CustomPagination } from '@/components/custom/CustomPagination';
import { CustomBreadcrumbs } from '@/components/custom/CustomBreadcrumbs';
import { useSearchParams } from 'react-router';
import useHeroSummary from '@/heroes/hooks/useHeroSummary';
import usePaginatedHero from '@/heroes/hooks/usePaginatedHero';
import { FavoriteHeroesContext } from '@/heroes/context/FavoriteHeroesContext';


export const HomePage = () => {

  const [searchParams, setSearchParams] = useSearchParams();

  const activeTab = searchParams.get('tab') ?? 'all';
  const page = searchParams.get('page') ?? '1';
  const limit = searchParams.get('limit') ?? '6';
  const category = searchParams.get('category') ?? 'all';

  const { favoriteCount, favoriteHeroes } = use(FavoriteHeroesContext);


  const selectedTab = useMemo(() => {
    const validTabs = ['all', 'favorites', 'heroes', 'villains'];
    return validTabs.includes(activeTab) ? activeTab : 'all';
  }, [activeTab])

  const { data: heroesResponse } = usePaginatedHero(+page, +limit, category);

  const { data: summaryResponse } = useHeroSummary();


  const handleTabClick = (clickedTab: string, selectedCategory: string) => {
    setSearchParams((prev) => {
      prev.set('tab', clickedTab);
      prev.set('category', selectedCategory);
      prev.set('page', '1');
      return prev;
    });
  }


  return (
    <>
      <>
        {/* Header */}
        <CustomJumbotron
          title="Universo de SuperHéroes"
          description="Descubre, explora y administra super héroes y villanos"
        />

        <CustomBreadcrumbs currentPage="Super Héroes" />

        {/* Stats Dashboard */}
        <HeroStats />

        {/* Tabs */}
        <Tabs value={selectedTab} className="mb-8">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="all" onClick={() => handleTabClick('all', 'all')}>
              All Characters ({summaryResponse?.heroCount ?? 0})
            </TabsTrigger>
            <TabsTrigger
              value="favorites"
              className="flex items-center gap-2"
              onClick={() => handleTabClick('favorites', 'favorites')}
            >
              Favorites ({favoriteCount})
            </TabsTrigger>
            <TabsTrigger value="heroes" onClick={() => handleTabClick('heroes', 'hero')}>
              Heroes ({summaryResponse?.heroCount ?? 0})
            </TabsTrigger>
            <TabsTrigger
              value="villains"
              onClick={() => handleTabClick('villains', 'villain')}
            >
              Villains ({summaryResponse?.villainCount ?? 0})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all">
            {/* Mostrar todos los personajes */}
            <HeroGrid heroes={heroesResponse?.heroes || []} />
          </TabsContent>
          <TabsContent value="favorites">
            {/* Mostrar todos los personajes favoritos */}
            <HeroGrid heroes={favoriteHeroes} />
          </TabsContent>
          <TabsContent value="heroes">
            {/* Mostrar todos los héroes */}
            <HeroGrid heroes={heroesResponse?.heroes || []} />
          </TabsContent>
          <TabsContent value="villains">
            {/* Mostrar todos los Villanos */}
            <h1>Villanos</h1>
            <HeroGrid heroes={heroesResponse?.heroes || []} />
          </TabsContent>
        </Tabs>

        {/* Pagination */}
        <CustomPagination totalPages={heroesResponse?.pages ?? 1} />
      </>
    </>
  );
};
