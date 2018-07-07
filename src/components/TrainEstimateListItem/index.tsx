import * as React from 'react';
import styled from 'styled-components';

interface OwnProps {
  trainEstimate: TrainEstimate;
}

type Props = OwnProps;

const ListItemContainer = styled.div`
  border: 1px solid black;
`;

const TrainEstimateListItem = (props: Props) => (
  <ListItemContainer>
    { JSON.stringify(props.trainEstimate) }
  </ListItemContainer>
);

export default TrainEstimateListItem;