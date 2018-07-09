import * as React from 'react';
import styled from 'styled-components';
import { TrainEstimate } from '@models/TrainEstimate';

interface OwnProps {
  trainEstimate: TrainEstimate;
}

type Props = OwnProps;

const ListItemContainer = styled.div`
  margin: 32px 0 0 40px;
`;

const CONTAINER_HEIGHT = 120;

const LineTitleHeader = styled.div`
  display: inline-flex;
  align-items: center;
  font-size: 64px;
  justify-content: flex-end;
  padding-right: 24px;
  width: 96px;
  height: ${ CONTAINER_HEIGHT}px;
  border-right: 2px solid black;
`;

const DirectionsContainer = styled.div`
  display: inline-flex;
  justify-content: center;
  vertical-align: top;
  flex-direction: column;
  align-items: flex-start;
  padding-left: 16px;
  height: ${ CONTAINER_HEIGHT}px;
`;

const DirectionHeader = styled.div`
  font-size: 20px;
  margin-bottom: 4px;
`;

const DirectionHeaderText = styled.span`
  font-weight: bolder;
`;

const TrainEstimateListItem = (props: Props) => {
  const {
    lineTitle,
    inbound,
    outbound,
  } = props.trainEstimate;

  const useGivenInboundCopy = inbound.length > 1;
  const useGivenOutboundCopy = outbound.length > 1;

  return (
    <ListItemContainer>
      <LineTitleHeader>
        { lineTitle }
      </LineTitleHeader>
      <DirectionsContainer>
        <React.Fragment>
          {
            inbound.length
              ? inbound.map((inboundItem, idx) => (
                  <React.Fragment key={ `inbound-${ idx }`}>
                    <DirectionHeader>
                      <DirectionHeaderText>
                        {
                          (useGivenInboundCopy ? inboundItem.description : 'Inbound') + ': '
                        }
                      </DirectionHeaderText>
                      {
                        // milliseconds to minutes
                        inboundItem.estimates.map(estimate => {
                          const val = (Number(estimate) / 60000).toFixed(0);
                          return Number(val) === 0
                            ? 'Now'
                            : val;
                        }).join(', ')
                      }
                      { ' minutes'}
                    </DirectionHeader>
                  </React.Fragment>
                ))
              : <React.Fragment key={ `inbound-0`}>
                  <DirectionHeader>
                    <DirectionHeaderText>
                      Inbound:
                    </DirectionHeaderText>
                    &nbsp;No estimates
                  </DirectionHeader>
                </React.Fragment>
          }
        </React.Fragment>
        <React.Fragment>
          {
            outbound.length
              ? outbound.map((outboundItem, idx) => (
                  <React.Fragment key={ `outbound-${ idx }`}>
                    <DirectionHeader>
                      <DirectionHeaderText>
                        {
                          (useGivenOutboundCopy ? outboundItem.description : 'Outbound') + ': '
                        }
                      </DirectionHeaderText>
                      {
                        // milliseconds to minutes
                        outboundItem.estimates.map(estimate => {
                          const val = (Number(estimate) / 60000).toFixed(0);
                          return Number(val) === 0
                            ? 'Now'
                            : val;
                        }).join(', ')
                      }
                      { ' minutes'}
                    </DirectionHeader>
                  </React.Fragment>
                ))
              : <React.Fragment key={ `outbound-0`}>
                  <DirectionHeader>
                    <DirectionHeaderText>
                      Outbound:
                    </DirectionHeaderText>
                    &nbsp;No estimates
                  </DirectionHeader>
                </React.Fragment>

          }
        </React.Fragment>
      </DirectionsContainer>
    </ListItemContainer>
  )
};

export default TrainEstimateListItem;