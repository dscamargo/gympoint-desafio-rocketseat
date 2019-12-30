import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  editStudentRequest,
  getStudentDetailsRequest,
} from '~/store/modules/students/actions';

import FormHeader from '~/components/FormHeader';
import FormBoard from '~/components/FormBoard';
import Input from '~/components/Input';
import WeightInput from '~/components/WeightInput';
import AgeInput from '~/components/AgeInput';
import HeightInput from '~/components/HeightInput';

import history from '~/services/history';

import { Container, LinhaInputs } from './styles';

export default function StudentEdit({ match }) {
  const dispatch = useDispatch();

  const student = useSelector(state => state.students.studentDetails);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [weight, setWeight] = useState('');
  const [age, setAge] = useState('');
  const [height, setHeight] = useState('');

  const [nameRequired, setNameRequired] = useState(false);
  const [emailRequired, setEmailRequired] = useState(false);
  const [weightRequired, setWeightRequired] = useState(false);
  const [ageRequired, setAgeRequired] = useState(false);
  const [heightRequired, setHeightRequired] = useState(false);

  useEffect(() => {
    dispatch(getStudentDetailsRequest(match.params.id));
  }, [dispatch, match.params.id]);

  useEffect(() => {
    if (student) {
      setName(student && student.name && student.name);
      setEmail(student && student.email && student.email);
      setWeight(student && student.weight && Number(student.weight));
      setAge(student && student.age && Number(student.age));
      setHeight(student && student.height && Number(student.height));
    }
  }, [student]);

  function handleBack() {
    history.push('/dashboard/students');
  }
  function handleSaveStudent() {
    if (!email || !name || !height || !age || !weight) {
      if (!email) {
        setEmailRequired(true);
      }
      if (!name) {
        setNameRequired(true);
      }
      if (!height) {
        setHeightRequired(true);
      }
      if (!age) {
        setAgeRequired(true);
      }
      if (!weight) {
        setWeightRequired(true);
      }

      return;
    }

    const { id } = match.params;

    const data = {
      name,
      email,
      weight,
      age,
      height,
    };

    dispatch(editStudentRequest({ id, ...data }));
  }

  return (
    <Container>
      <FormHeader
        title="Edição de aluno"
        onSubmit={handleSaveStudent}
        onCancel={handleBack}
      />

      <FormBoard>
        <Input
          value={name}
          onChange={e => setName(e.target.value)}
          size="100%"
          label="Nome Completo"
          placeholder="Seu nome"
          required={nameRequired && !name}
        />
        <Input
          value={email}
          onChange={e => setEmail(e.target.value)}
          size="100%"
          label="Endereço de e-mail"
          placeholder="exemplo@email.com.br"
          margin="20px 0 0"
          type="email"
          required={emailRequired && !email}
        />
        <LinhaInputs>
          <AgeInput
            value={age}
            onChange={e => setAge(Number(e))}
            size="32%"
            label="Idade (anos)"
            type="number"
            required={ageRequired && !age}
          />
          <WeightInput
            value={weight}
            onChange={e => setWeight(e)}
            size="32%"
            label="PESO (kg)"
            type="number"
            required={weightRequired && !weight}
          />
          <HeightInput
            value={height}
            onChange={e => setHeight(e)}
            size="32%"
            label="Altura (cm)"
            type="number"
            required={heightRequired && !height}
          />
        </LinhaInputs>
      </FormBoard>
    </Container>
  );
}
