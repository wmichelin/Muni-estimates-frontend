import { ESTIMATES_LOADED, ESTIMATES_REQUESTED } from '@actions';
import { TrainEstimate } from '@models/TrainEstimate';

export interface TrainEstimatesState {
  models: TrainEstimate[];
  loading: boolean;
}

const DEFAULT_STATE = {
  models: [],
  loading: false,
};

const trainEstimates = (state=DEFAULT_STATE, action) => {
  switch (action.type) {
    case ESTIMATES_REQUESTED:
      return {
        ...state,
        loading: true,
      };

    case ESTIMATES_LOADED:
      return {
        models: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};

export default trainEstimates;