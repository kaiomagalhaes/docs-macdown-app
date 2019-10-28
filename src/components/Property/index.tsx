import React from 'react';
import PropTypes from 'prop-types';

import { PropertyModel } from '../../models/property-model';

import styles from './Property.module.scss';

const propTypes = {
  property: PropTypes.object,
};

// @TODO: research about the proper way to use typescript with propTypes
const Property = ({ property }: { property: PropertyModel }) => (
  <div key={`property-${property.id}`} className={styles.container}>
    <span> {property.name} </span>
  </div>
);

Property.propTypes = propTypes;

export default Property;
