import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Header from '~/components/Header';

import StudentsList from '~/pages/Dashboard/Student/List';
import NewStudent from '~/pages/Dashboard/Student/New';
import StudentEdit from '~/pages/Dashboard/Student/Edit';

import PlansList from '~/pages/Dashboard/Plan/List';
import PlanEdit from '~/pages/Dashboard/Plan/Edit';
import NewPlan from '~/pages/Dashboard/Plan/New';

import RegistersList from '~/pages/Dashboard/Registers/List';
import NewRegister from '~/pages/Dashboard/Registers/New';
import EditRegister from '~/pages/Dashboard/Registers/Edit';

import HelpOrders from '~/pages/Dashboard/HelpOrders';

import { Container, Content } from './styles';

export default function Dashboard() {
  return (
    <Container>
      <Header />
      <Content>
        <Switch>
          <Route path="/dashboard/students/new" component={NewStudent} />
          <Route path="/dashboard/students/:id/edit" component={StudentEdit} />
          <Route path="/dashboard/students" component={StudentsList} />

          <Route path="/dashboard/plans/new" component={NewPlan} />
          <Route path="/dashboard/plans/:id/edit" component={PlanEdit} />
          <Route path="/dashboard/plans" component={PlansList} />

          <Route path="/dashboard/registers/new" component={NewRegister} />
          <Route
            path="/dashboard/registers/:id/edit"
            component={EditRegister}
          />
          <Route path="/dashboard/registers" component={RegistersList} />

          <Route path="/dashboard/help-orders" component={HelpOrders} />
        </Switch>
      </Content>
    </Container>
  );
}
