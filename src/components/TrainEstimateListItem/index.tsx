import * as React from 'react';

interface OwnProps {
  trainEstimate: TrainEstimate;
}

type Props = OwnProps;

const TrainEstimateListItem = (props: Props) => (
  <div>
    { JSON.stringify(props.trainEstimate) }
  </div>
);

export default TrainEstimateListItem;