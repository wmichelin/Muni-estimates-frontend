import * as React from 'react';
import { createStructuredSelector } from 'reselect';
import TrainEstimateListItem from '@components/TrainEstimateListItem'
import { connect } from 'react-redux';
import { estimatesRequested } from '@actions';
import { TrainEstimateMap } from '@models/TrainEstimate';
import LoadingSpinner from '@components/LoadingSpinner';

interface OwnProps {}

interface StateProps {
  trainEstimates: TrainEstimateMap;
  isLoading: boolean;
}

interface DispatchProps {
  estimatesRequested(): void;
}

type Props = OwnProps & StateProps & DispatchProps;

const selector = createStructuredSelector({
  trainEstimates: (state) => state.trainEstimates.models,
  isLoading: (state) => state.trainEstimates.loading,
});

const dispatcher = (dispatch) => ({
  estimatesRequested: () => dispatch(estimatesRequested()),
});

const connector = connect<StateProps, DispatchProps>(selector, dispatcher);

class TrainEstimateList extends React.PureComponent<Props> {
  interval: NodeJS.Timer;

  componentDidMount() {
    this.props.estimatesRequested();
    this.interval = setInterval(() => this.props.estimatesRequested(), 4000);
  }
  
  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    const { trainEstimates } = this.props;

    return (
      <React.Fragment>
        {
            this.props.isLoading
              ? <LoadingSpinner />
              : null
        }
        {
          Object.keys(trainEstimates).map(
            (key, idx) => (
              <TrainEstimateListItem
                key={ key }
                trainEstimate={ trainEstimates[key] }
              />
            )
          )
        }
      </React.Fragment>
    )
  }
}

export default connector(TrainEstimateList);
