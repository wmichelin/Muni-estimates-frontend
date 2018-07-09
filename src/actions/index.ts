import axios from  'axios';
import { TrainEstimateMap } from '@models/TrainEstimate';

export const ESTIMATES_REQUESTED = 'ESTIMATES__ESTIMATES_REQUESTED';
export const ESTIMATES_LOADED = 'ESTIMATES__ESTIMATES_LOADED';

const INBOUND_TOKEN = 'inbound';
const OUTBOUND_TOKEN = 'outbound';

const getKeyFromRawEstimate = (rawEstimate) => rawEstimate.lineTitle.split('-')[0];

const normalizeEstimatesResponse = (rawEstimates): TrainEstimateMap => rawEstimates.reduce((acc, rawEstimate) => {
  const key = getKeyFromRawEstimate(rawEstimate);
  if (!acc[key]) {
    acc[key] = {
      lineTitle: key,
      outbound: [],
      inbound: [],
    }
  }

  const record = acc[key];
  rawEstimate.directionResults.forEach(directionResult => {
    const token = directionResult.directionDescription.toLowerCase().includes(INBOUND_TOKEN) ? INBOUND_TOKEN : OUTBOUND_TOKEN;
    record[token].push({
      description: directionResult.directionDescription,
      estimates: directionResult.estimates,
    })
  });

  acc[key] = record;
  return acc;
}, {});

export const estimatesRequested = () => async (dispatch) => {
  axios.get(process.env.REACT_APP_API_ESTIMATES_ENDPOINT!).then((response) => {
    const { data } = response;
    if (data) {
      dispatch(estimatesLoaded(
        normalizeEstimatesResponse(data)
      ));
    }
  });

  dispatch({
    type: ESTIMATES_REQUESTED,
  });
};

const estimatesLoaded = (payload) => ({
  payload,
  type: ESTIMATES_LOADED,
});