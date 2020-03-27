import styled from "styled-components";
import { Button, Typography } from "antd";

const CardWrapper = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  @media (min-width: 768px) {
    flex-direction: row;
  }
`;
const ButtonResponsive = styled(Button)`
  left: 0%;
  position: relative;
  @media (min-width: 778px) {
    left: 5%;
  }
  @media (min-width: 900px) {
    left: 10%;
  }
`;

const TextResponsive = styled(Typography.Title)`
  text-align: center;
  margin-bottom: 0px !important;
`;

export { CardWrapper, ButtonResponsive, TextResponsive };
