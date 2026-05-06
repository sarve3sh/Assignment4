import { PERSON_ENDPOINT } from '@/core/constants';
import { useTmdb } from '@/hooks';
import { useNavigate, useParams } from 'react-router-dom';
import { IMAGE_BASE_URL } from '@/core/constants';

export const CareerView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data } = useTmdb<any>(`${PERSON_ENDPOINT}/${id}/movie_credits`, {}, [id]);

  if (!data) return <p>Loading...</p>;

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Career</h2>
      {data.cast.map((role: any) => (
        <div key={role.id} className="cursor-pointer" onClick={() => navigate(`/movies/${role.id}`)}>
          <p>{role.title} ({role.release_date?.slice(0, 4)})</p>
        </div>
      ))}
    </div>
  );
};