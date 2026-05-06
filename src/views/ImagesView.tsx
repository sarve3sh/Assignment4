import { PERSON_ENDPOINT } from '@/core/constants';
import { IMAGE_BASE_URL } from '@/core/constants';
import { useTmdb } from '@/hooks';
import { useParams } from 'react-router-dom';

export const ImagesView = () => {
  const { id } = useParams();
  const { data } = useTmdb<any>(`${PERSON_ENDPOINT}/${id}/images`, {}, [id]);

  if (!data) return <p>Loading...</p>;

  return (
    <div className="grid grid-cols-5 gap-4">
      {data.profiles.map((image: any) => (
        <img key={image.file_path} src={`${IMAGE_BASE_URL}${image.file_path}`} className="rounded-xl" />
      ))}
    </div>
  );
};