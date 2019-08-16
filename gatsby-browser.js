import MailWidgetWrapper from './src/components/MailWidgetWrapper';

export const wrapPageElement = ({ element, props }) => (
  <MailWidgetWrapper {...props}>{element}</MailWidgetWrapper>
);
