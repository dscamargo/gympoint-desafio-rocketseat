import Bee from 'bee-queue';
import RegisterMail from '../app/jobs/RegisterMail';
import AnswerMail from '../app/jobs/AnswerMail';
import RedisConfig from '../config/redis';

const jobs = [RegisterMail, AnswerMail];

class Queue {
  constructor() {
    this.queues = {};

    this.init();
  }

  init() {
    jobs.forEach(({ key, handle }) => {
      this.queues[key] = {
        bee: new Bee(key, {
          redis: RedisConfig,
        }),
        handle,
      };
    });
  }

  add(queue, job) {
    return this.queues[queue].bee.createJob(job).save();
  }

  processQueue() {
    jobs.forEach(job => {
      const { bee, handle } = this.queues[job.key];

      bee.on('failed', this.handleFailure).process(handle);
    });
  }

  handleFailure(job, err) {
    throw new Error(`Queue ${job.queue.name}: FAILED ${err}`);
  }
}

export default new Queue();
