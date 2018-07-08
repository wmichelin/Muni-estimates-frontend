import axios from  'axios';
import { TrainEstimate } from '@models/TrainEstimate';

export const ESTIMATES_REQUESTED = 'ESTIMATES__ESTIMATES_REQUESTED';
export const ESTIMATES_LOADED = 'ESTIMATES__ESTIMATES_LOADED';

const normalizeEstimatesResponse = (data): TrainEstimate[] => data.map(
  estimateResult => ({
    lineTitle: estimateResult.lineTitle,
    stopDescription: estimateResult.stopDescription,
    directions: estimateResult.directionResults.map(directionResult => ({
      description: directionResult.directionDescription,
      estimates: directionResult.estimates,
    })),
  })
);

export const estimatesRequested = () => async (dispatch) => {
  const response = await axios.get(process.env.REACT_APP_API_ESTIMATES_ENDPOINT!);
  const { data } = response;

  if (data) {
    dispatch(estimatesLoaded(
      normalizeEstimatesResponse(data)
    ));
  }

  return {
    type: ESTIMATES_REQUESTED,
  }
};

const estimatesLoaded = (payload) => ({
  payload,
  type: ESTIMATES_LOADED,
});