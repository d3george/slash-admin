import { useMatches } from 'react-router-dom';

function BreadCrumb() {
  const matches = useMatches();

  console.log('matchs', matches);

  return (
    <div className="flex">
      {matches.map((match) => (
        <div key={match.pathname} className="ml-3">
          {match.pathname}
        </div>
      ))}
    </div>
  );
}

export default BreadCrumb;
