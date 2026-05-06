import { MOVIE_ENDPOINT } from '@/core/constants';
import { useTmdb } from '@/hooks';
import { useParams } from 'react-router-dom';

export const TrailersView = () => {
  const { id } = useParams();
  const { data } = useTmdb<any>(`${MOVIE_ENDPOINT}/${id}/videos`, {}, [id]);

  if (!data) return <p>Loading...</p>;

  return (
    <div className="space-y-4">
      {data.results.map((video: any) => (
        <div key={video.key}>
          <p className="font-bold">{video.name}</p>
          <iframe
            className="w-full rounded-xl"
            src={`https://www.youtube.com/embed/${video.key}`}
            allowFullScreen
          />
        </div>
      ))}
    </div>
  );
};