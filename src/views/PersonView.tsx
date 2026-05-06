import { LinkGroup } from '@/components';
import { IMAGE_BASE_URL, PERSON_ENDPOINT } from '@/core/constants';
import { useTmdb } from '@/hooks';
import { Outlet, useNavigate, useParams } from 'react-router-dom';
export const PersonView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data } = useTmdb<any>(`${PERSON_ENDPOINT}/${id}`, {}, [id]);

  if (!data) return <p className="text-center text-gray-400">Loading...</p>;

  return (
    <div className="max-w-[1200px] mx-auto p-5 space-y-5">
      <div className="flex gap-8">
        <img className="w-[220px] h-[330px] object-cover rounded-xl" src={`${IMAGE_BASE_URL}${data.profile_path}`} alt={data.name} />
        <div className="space-y-4">
          <h1 className="text-3xl font-bold">{data.name}</h1>
          <p className="text-gray-300">{data.biography}</p>
        </div>
      </div>
      <LinkGroup
        options={[
          { label: 'Career', to: 'career' },
          { label: 'Images', to: 'images' },
        ]}
      />
      <Outlet />
    </div>
  );
};
