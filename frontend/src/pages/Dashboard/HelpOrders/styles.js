import styled from 'styled-components';

export const Container = styled.div`
  width: 700px;
  margin: 0 auto;
`;

export const Header = styled.div`
  width: 100%;
  padding: 10px 0;

  > span {
    font-size: 16px;
    font-weight: 600;
    color: #444;
  }
`;

export const List = styled.ul`
  list-style: none;
`;

export const ListItem = styled.li`
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 20px 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  font-size: 16px;
  color: #666;
`;

export const AnswerButton = styled.button`
  border: none;
  background: transparent;
  color: #4d85ee;
`;

export const ModalContent = styled.div`
  width: 100%;
  height: 100%;
  padding: 30px;
`;

export const QuestionTitle = styled.span`
  width: 100%;
  font-size: 14px;
  color: #444;
  font-weight: 600;
`;
export const QuestionContainer = styled.div`
  width: 100%;
  height: auto;
  padding: 10px 0;
  margin-bottom: 20px;
`;
export const Question = styled.div`
  font-size: 16px;
`;

export const AnswerTitle = styled.span`
  width: 100%;
  font-size: 14px;
  color: #444;
  font-weight: 600;
`;
export const AnswerContainer = styled.div`
  width: 100%;
  height: auto;
  padding: 10px 0;
`;

export const PaginationContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
`;
