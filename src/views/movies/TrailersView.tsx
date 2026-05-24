import { MOVIE_ENDPOINT } from '@/core/constants';
import { useTmdb } from '@/hooks';
import { useParams } from 'react-router-dom';

export const TrailersView = () => {
  const { id } = useParams();
  const { data } = useTmdb<any>(`${MOVIE_ENDPOINT}/${id}/videos`, {}, [id]);

  if (!data) return <p>Loading...</p>;

  const trailers = data.results.filter((v: any) => v.type === 'Trailer' && v.site === 'YouTube').slice(0, 2);

  return (
    <div className="grid grid-cols-2 gap-4">
      {trailers.map((video: any) => (
        <div key={video.key}>
          <p className="font-bold mb-2">{video.name}</p>
          <iframe
            className="w-full aspect-video rounded-xl"
            src={`https://www.youtube.com/embed/${video.key}`}
            allowFullScreen
          />
        </div>
      ))}
    </div>
  );
};