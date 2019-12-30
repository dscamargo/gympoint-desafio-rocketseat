import React, { useState, useMemo, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { parseISO, addMonths, format } from 'date-fns';

import FormHeader from '~/components/FormHeader';
import FormBoard from '~/components/FormBoard';
import Input from '~/components/Input';
import Select from '~/components/Select';
import DatePicker from '~/components/DatePicker';

import history from '~/services/history';

import {
  registerDetailsRequest,
  editRegisterRequest,
} from '~/store/modules/registers/actions';
import {
  clearStudents,
  getStudentsSelectRequest,
} from '~/store/modules/students/actions';
import { getAllPlansRequest } from '~/store/modules/plans/actions';

import { Container, LinhaSelects } from './styles';

export default function Edit({ match }) {
  const dispatch = useDispatch();

  const loading = useSelector(state => state.registers.loading);
  const students = useSelector(state => state.students.studentsSelect);
  const plansSelect = useSelector(state => state.plans.plansSelect);
  const registerDetails = useSelector(state => state.registers.registerDetails);

  const [selectedStudent, setSelectedStudent] = useState(``);
  const [selectedPlan, setSelectedPlan] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [finalDate, setFinalDate] = useState(null);

  const [studentRequired, setStudentRequired] = useState(false);
  const [planRequired, setPlanRequired] = useState(false);
  const [startDateRequired, setStartDateRequired] = useState(false);
  const [finalDateRequired, setFinalDateRequired] = useState(false);

  const total = useMemo(() => {
    if (selectedPlan) {
      return Number(selectedPlan.price) * Number(selectedPlan.duration);
    }
    return 0;
  }, [selectedPlan]);

  useEffect(() => {
    dispatch(registerDetailsRequest(match.params.id));
    dispatch(getAllPlansRequest());
    dispatch(clearStudents());
  }, [dispatch, match]);

  useEffect(() => {
    if (Object.keys(registerDetails).length > 0) {
      setSelectedStudent(registerDetails.student);
      setSelectedPlan(registerDetails.plan);
      setStartDate(parseISO(registerDetails.start_date));
    }
  }, [registerDetails]);

  useEffect(() => {
    if (startDate && selectedPlan) {
      const end_date = addMonths(startDate, selectedPlan.duration);
      setFinalDate(end_date);
    }
  }, [startDate, selectedPlan]);

  function handleSave() {
    if (!selectedPlan || !selectedPlan || !startDate || !finalDate) {
      if (!selectedPlan) {
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

    const { id: student_id } = selectedStudent;
    const { id: plan_id } = selectedPlan;
    const { id } = match.params;

    const data = {
      id,
      student_id,
      plan_id,
      start_date: format(startDate, 'yyyy-MM-dd'),
    };

    dispatch(editRegisterRequest(data));
  }

  function handleSearchStudents(newValue) {
    if (newValue) dispatch(getStudentsSelectRequest(1, 10, newValue));
    if (!newValue) dispatch(clearStudents());
  }

  return (
    <Container>
      <FormHeader
        title="Edição de matrícula"
        onSubmit={handleSave}
        onCancel={history.goBack}
      />
      <FormBoard>
        {selectedStudent && (
          <Select
            loading={loading}
            label="Aluno"
            size="100%"
            placeholder="Buscar Aluno"
            handleInputChange={handleSearchStudents}
            value={selectedStudent}
            onChange={setSelectedStudent}
            options={students}
            required={studentRequired && !selectedStudent}
            selectedValue={selectedStudent}
          />
        )}

        <LinhaSelects>
          {selectedPlan && (
            <Select
              label="Plano"
              size="24%"
              placeholder="Selecione o plano"
              options={plansSelect}
              value={selectedPlan}
              onChange={setSelectedPlan}
              required={planRequired && !selectedPlan}
              selectedValue={selectedPlan}
            />
          )}

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
