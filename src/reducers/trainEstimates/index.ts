import { ESTIMATES_LOADED } from '@actions';
import { TrainEstimate } from '@models/TrainEstimate';

export interface TrainEstimatesState {
  models: TrainEstimate[];
}

const DEFAULT_STATE = {
  models: [],
};

const trainEstimates = (state=DEFAULT_STATE, action) => {
  switch (action.type) {
    case ESTIMATES_LOADED:
      return {
        models: action.payload,
      };
    default:
      return state;
  }
};

export default trainEstimates;