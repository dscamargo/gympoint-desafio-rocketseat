import faker from 'faker';
import { factory } from 'factory-girl';

import Student from '../src/app/models/Student';
import Plan from '../src/app/models/Plan';

factory.define('Student', Student, {
  name: faker.name.findName(),
  height: faker.random.number(),
  weight: faker.random.number(),
  email: faker.internet.email(),
  age: faker.random.number(),
});

factory.define('Plan', Plan, {
  title: faker.name.title(),
  duration: faker.random.number(),
  price: faker.commerce.price(),
});

export default factory;
