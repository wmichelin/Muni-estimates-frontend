import * as React from 'react';
import { createStructuredSelector } from 'reselect';
import { TrainEstimates } from '@constants/fake-data';
import TrainEstimateListItem from '@components/TrainEstimateListItem'
import { connect } from 'react-redux';

interface OwnProps {}

interface StateProps {
  trainEstimates: TrainEstimate[];
}

type Props = OwnProps & StateProps;

const selector = createStructuredSelector({
  trainEstimates: () => TrainEstimates,
});

const connector = connect<StateProps>(selector);

const TrainEstimateList = (props: Props) => (
  <React.Fragment>
    {
      props.trainEstimates.map((trainEstimate) => (
        <TrainEstimateListItem trainEstimate={ trainEstimate }/>
      ))
    }
  </React.Fragment>
);

export default connector(TrainEstimateList);
