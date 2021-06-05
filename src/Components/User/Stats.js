import React from 'react';
import { STATS_GET } from '../../api';
import Head from '../Helper/Head';
import useFetch from '../../Hooks/useFetch';
import Loading from '../Helper/Loading';
import Error from '../Helper/Error';


const UserStatsGraphs = React.lazy(() => import('./UserStatsGraphs'));

function Stats() {
  const { data, error, loading, request } = useFetch();


  React.useEffect(() => {
    async function getStats() {
      const { url, options } = STATS_GET();
      await request(url, options);
    }
    getStats();
  }, [request]);

  if (loading) return <Loading />;
  if (error) return <Error error={error} />;
  if (data)
    return (
      <React.Suspense fallback={<Loading/>}>
        <Head title="Estísticas"  description="Estatísticas do usuário"/>
        <UserStatsGraphs data={data} />
      </React.Suspense>
    );
  else return null;
}

export default Stats;
