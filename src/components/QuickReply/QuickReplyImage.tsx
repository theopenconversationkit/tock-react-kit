import styled, { StyledComponent } from '@emotion/styled';
import { DetailedHTMLProps, ImgHTMLAttributes } from 'react';
import { prop } from 'styled-tools';

const QuickReplyImage: StyledComponent<DetailedHTMLProps<
  ImgHTMLAttributes<HTMLImageElement>,
  HTMLImageElement
>> = styled.img`
  margin-right: inherit;
  max-width: 15px;
  max-height: 15px;
  vertical-align: middle;

  ${prop<any>('theme.overrides.quickReplyImage', '')};
`;

export default QuickReplyImage;
