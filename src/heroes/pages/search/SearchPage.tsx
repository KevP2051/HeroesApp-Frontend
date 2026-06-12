import { CustomJumbotron } from '@/components/custom/CustomJumbotron';
import { HeroStats } from '@/heroes/components/HeroStats';
import { SearchControls } from './ui/SearchControls';
import { CustomBreadcrumbs } from '@/components/custom/CustomBreadcrumbs';
import { useQuery } from '@tanstack/react-query';
import { searchHeroesAction } from '@/heroes/actions/search-heroes.action';
import { useSearchParams } from 'react-router';
import { HeroGrid } from '../../components/HeroGrid';

export const SearchPage = () => {


  const [searchParams, setSearchParams] = useSearchParams();

  const name = searchParams.get('name') ?? '';
  const category = searchParams.get('category') ?? '';
  const team = searchParams.get('status') ?? '';
  const status = searchParams.get('status') ?? '';
  const strength = searchParams.get('strength') ?? '';



  const { data: searchHeroesResponse = [] } = useQuery({
    queryKey: ['search-heroes', { name, team, category, status, strength }],
    queryFn: () => searchHeroesAction({ name, team, category, status, strength }),
    staleTime: 1000 * 60 * 5
  })

  return (
    <>
      <CustomJumbotron
        title="Búsqueda de SuperHéroes"
        description="Descubre, explora y administra super héroes y villanos"
      />

      <CustomBreadcrumbs
        currentPage="Buscador de héroes"
      // breadcrumbs={[
      //   { label: 'Home1', to: '/' },
      //   { label: 'Home2', to: '/' },
      //   { label: 'Home3', to: '/' },
      // ]}
      />

      {/* Stats Dashboard */}
      <HeroStats />

      {/* Filter and search */}
      <SearchControls />

      <HeroGrid heroes={searchHeroesResponse} />


    </>
  );
};

export default SearchPage;
