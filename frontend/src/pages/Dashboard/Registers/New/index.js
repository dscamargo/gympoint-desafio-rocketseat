import React, { useMemo, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { format, addMonths } from 'date-fns';

import history from '~/services/history';

import {
  getStudentsSelectRequest,
  clearStudents,
} from '~/store/modules/students/actions';
import { getAllPlansRequest } from '~/store/modules/plans/actions';
import { createRegisterRequest } from '~/store/modules/registers/actions';

import FormHeader from '~/components/FormHeader';
import FormBoard from '~/components/FormBoard';
import MySelect from '~/components/Select';
import DatePicker from '~/components/DatePicker';
import Input from '~/components/Input';
import { Container, LinhaSelects } from './styles';

export default function New() {
  const dispatch = useDispatch();

  const { loading, studentsSelect } = useSelector(state => state.students);
  const { plansSelect } = useSelector(state => state.plans);

  const [selectedStudent, setSelectedStudent] = useState('');
  const [selectedPlan, setSelectedPlan] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [finalDate, setFinalDate] = useState(null);

  const [studentRequired, setStudentRequired] = useState(false);
  const [planRequired, setPlanRequired] = useState(false);
  const [startDateRequired, setStartDateRequired] = useState(false);
  const [finalDateRequired, setFinalDateRequired] = useState(false);

  const total = useMemo(() => {
    if (selectedPlan) {
      return Number(selectedPlan.duration) * Number(selectedPlan.price);
    }
    return 0;
  }, [selectedPlan]);

  useEffect(() => {
    dispatch(getAllPlansRequest());
    dispatch(clearStudents());
  }, [dispatch]);

  useEffect(() => {
    if (startDate && selectedPlan) {
      setFinalDate(addMonths(startDate, selectedPlan.duration));
    }
  }, [startDate, selectedPlan]);

  function handleSubmit() {
    if (!selectedStudent || !selectedPlan || !startDate || !finalDate) {
      if (!selectedStudent) {
        setStudentRequired(true);
      }
      if (!selectedPlan) {
        setPlanRequired(true);
      }
      if (!startDate) {
        setStartDateRequired(true);
      }
      if (!finalDate) {
        setFinalDateRequired(true);
      }
      return;
    }
    const data = {
      student_id: selectedStudent.id,
      plan_id: selectedPlan.id,
      start_date: format(startDate, 'yyyy-MM-dd'),
    };

    dispatch(createRegisterRequest(data));
  }
  function handleCancel() {
    history.goBack();
  }

  function handleSearchStudents(newValue) {
    if (newValue) dispatch(getStudentsSelectRequest(1, 10, newValue));
    if (!newValue) dispatch(clearStudents());
  }

  return (
    <Container>
      <FormHeader
        title="Nova matrícula"
        onSubmit={handleSubmit}
        onCancel={handleCancel}
      />

      <FormBoard>
        <MySelect
          loading={loading}
          label="Aluno"
          size="100%"
          placeholder="Buscar Aluno"
          handleInputChange={handleSearchStudents}
          value={selectedStudent}
          onChange={setSelectedStudent}
          options={studentsSelect}
          required={studentRequired && !selectedStudent}
        />

        <LinhaSelects>
          <MySelect
            isClearable
            label="Plano"
            size="24%"
            placeholder="Selecione o plano"
            options={plansSelect}
            value={selectedPlan}
            onChange={setSelectedPlan}
            required={planRequired && !selectedPlan}
          />
          <DatePicker
            size="24%"
            label="Data de início"
            value={startDate}
            onChange={date => setStartDate(date)}
            required={startDateRequired && !startDate}
          />
          <DatePicker
            disabled
            label="Data de término"
            size="24%"
            value={finalDate}
            onChange={date => setFinalDate(date)}
            required={finalDateRequired && !finalDate}
          />
          <Input
            disabled
            label="Valor final"
            size="24%"
            value={total.toLocaleString('pt-BR', {
              style: 'currency',
              currency: 'BRL',
            })}
          />
        </LinhaSelects>
      </FormBoard>
    </Container>
  );
}
