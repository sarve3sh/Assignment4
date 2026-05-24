import { ImageGrid } from '@/components';
import { IMAGE_BASE_URL, PERSON_ENDPOINT } from '@/core/constants';
import { useTmdb } from '@/hooks';
import { useNavigate, useParams } from 'react-router-dom';

export const CareerView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data } = useTmdb<any>(`${PERSON_ENDPOINT}/${id}/movie_credits`, {}, [id]);

  if (!data) return <p>Loading...</p>;

  const gridData = data.cast.map((role: any) => ({
    id: role.id,
    imagePath: role.poster_path,
    primaryText: role.title,
    secondaryText: role.release_date?.slice(0, 4),
  }));

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Career</h2>
      <ImageGrid results={gridData} onClick={(id) => navigate(`/movies/${id}`)} />
    </div>
  );
};