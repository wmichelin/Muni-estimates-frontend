import * as React from 'react';
import styled, { css } from 'styled-components';
import { TrainEstimate } from '@models/TrainEstimate';

interface OwnProps {
  trainEstimate: TrainEstimate;
}

type Props = OwnProps;

const noMarginStyles = css`
  margin: 0;
`;

const ListItemContainer = styled.div`
  border: 1px solid black;
`;

const LineTitleHeader = styled.h3`
  ${ noMarginStyles }
`;

const StopDescriptionHeader = styled.h4`
  ${ noMarginStyles }
`;

const TrainEstimateListItem = (props: Props) => {
  const {
    lineTitle,
    stopDescription,
    directions,
  } = props.trainEstimate;

  return (
    <ListItemContainer>
      <LineTitleHeader>
        { lineTitle }
      </LineTitleHeader>
      <StopDescriptionHeader>{ stopDescription }</StopDescriptionHeader>
      <div>
        { JSON.stringify(directions) }
      </div>
    </ListItemContainer>
  )
};

export default TrainEstimateListItem;