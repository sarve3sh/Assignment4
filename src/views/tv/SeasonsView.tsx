import { TV_ENDPOINT } from '@/core/constants';
import type { TvShowResponse } from '@/core/types';
import { useTmdb } from '@/hooks';
import { useNavigate, useParams } from 'react-router-dom';

export const SeasonsView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data } = useTmdb<TvShowResponse>(`${TV_ENDPOINT}/${id}`, {}, [id]);

  if (!data) return <p>Loading...</p>;

  return (
    <div>
      {data.seasons.map((season) => (
        <div key={season.id} onClick={() => navigate(`/tv/${id}/seasons/${season.season_number}`)}>
          {season.name}
        </div>
      ))}
    </div>
  );
};
