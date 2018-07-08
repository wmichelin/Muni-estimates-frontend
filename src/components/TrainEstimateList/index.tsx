import * as React from 'react';
import { createStructuredSelector } from 'reselect';
import TrainEstimateListItem from '@components/TrainEstimateListItem'
import { connect } from 'react-redux';
import { estimatesRequested } from '@actions';
import { TrainEstimate } from '@models/TrainEstimate';

interface OwnProps {}

interface StateProps {
  trainEstimates: TrainEstimate[];
}

interface DispatchProps {
  estimatesRequested(): void;
}

type Props = OwnProps & StateProps & DispatchProps;

const selector = createStructuredSelector({
  trainEstimates: (state) => state.trainEstimates.models,
});

const dispatcher = (dispatch) => ({
  estimatesRequested: () => dispatch(estimatesRequested()),
});

const connector = connect<StateProps, DispatchProps>(selector, dispatcher);

class TrainEstimateList extends React.PureComponent<Props> {
  interval: NodeJS.Timer;

  componentDidMount() {
    this.interval = setInterval(() => this.props.estimatesRequested(), 1000);
  }
  
  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    return (
      <React.Fragment>
        {
          this.props.trainEstimates.map((trainEstimate, idx) => (
            <TrainEstimateListItem key={ idx } trainEstimate={ trainEstimate }/>
          ))
        }
      </React.Fragment>
    )
  }
}

export default connector(TrainEstimateList);
