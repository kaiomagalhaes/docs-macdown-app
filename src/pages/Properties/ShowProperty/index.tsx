import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import Property from 'components/Property';

import { PROPERTY_QUERY } from './graphql';

// @TODO: research how to organize typescript VS proptypes
const PropertyPage = (props: any) => {
  const { id } = props.match.params;

  const { loading, error, data } = useQuery(PROPERTY_QUERY, {
    variables: { id: parseInt(id) },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  const { property } = data;
  return (
    <div className="App">
      <header className="App-header">
        <h1>Properties</h1>
      </header>
      <div>
        <Property key={`property-${property.id}`} property={property} />
      </div>
    </div>
  );
};

export default PropertyPage;
