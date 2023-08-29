import { useMatches } from 'react-router-dom';

function BreadCrumb() {
  const matches = useMatches();

  return (
    <div>
      {matches.map((match) => (
        <div>{match.pathname}</div>
      ))}
    </div>
  );
}

export default BreadCrumb;
