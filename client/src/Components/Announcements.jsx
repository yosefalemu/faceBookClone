import styled from "styled-components";
const Container = styled.div`
  height: 40px;
  background-color: teal;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  font-weight: 500;
  margin: 0px;
`;
const Announcements = () => {
  return (
    <Container>
      Super Deal !!! Discount Shipping On Order Over 10,000 Birr
    </Container>
  );
};

export default Announcements;
