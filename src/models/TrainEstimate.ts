interface RouteDirection {
  description: string;
  estimates: number[];
}

export interface TrainEstimate {
  lineTitle: string;
  stopDescription: string;
  directions: RouteDirection[];
}