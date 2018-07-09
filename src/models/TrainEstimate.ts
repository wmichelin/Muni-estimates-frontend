interface RouteDirection {
  description: string;
  estimates: number[];
}

type TrainKey = string;

export interface TrainEstimate {
  lineTitle: TrainKey; // 28, 28R, N
  outbound: RouteDirection[];
  inbound: RouteDirection[];
}

export interface TrainEstimateMap extends Map<TrainKey, TrainEstimate>{}