import { TV_ENDPOINT } from '@/core/constants';
import type { SeasonResponse } from '@/core/types';
import { useTmdb } from '@/hooks';
import { useParams } from 'react-router-dom';

export const EpisodeView = () => {
  const { id, episodeNumber } = useParams();
  const { data } = useTmdb<SeasonResponse>(`${TV_ENDPOINT}/${id}/season/${episodeNumber}`, {}, [id, episodeNumber]);

  if (!data) return <p>Loading...</p>;

  return (
    <div>
      {data.episodes.map((episode) => (
        <div key={episode.id}>
          <p>{episode.episode_number}. {episode.name}</p>
          <p>{episode.overview}</p>
        </div>
      ))}
    </div>
  );
};