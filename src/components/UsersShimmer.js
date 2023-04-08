import styled, { keyframes } from 'styled-components';


const blink = keyframes`
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
  100% {
    opacity: 1;
  }
`;

const ShimmerBox = styled.div`
  width: 1200px;
  height: 50px;
  background: linear-gradient(to right, #bbb 0%, #ddd 50%, #bbb 100%);
  background-size: 1000px 100px;
  animation: ${blink} 1.5s infinite;
  margin-bottom: 10px;
`;

const UsersShimmer = ({ times }) => {
  const boxes = Array.from({ length: times }, (_, i) => <ShimmerBox key={i} />);
  return <div>{boxes}</div>;
};

export default UsersShimmer;
