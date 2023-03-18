/* eslint-disable @typescript-eslint/ban-types */
let tasks: Function[] = [];
let timer: NodeJS.Timeout;

/**
 * Add a function to run just before the next tick
 *
 * @param task function to schedule for later execution
 */
export const scheduleTask = (task: Function) => {
  clearTimeout(timer);
  tasks.push(task);

  timer = setTimeout(() => {
    tasks.forEach(fn => fn());
    tasks = [];
  }, 0);
};

/**
 * Cancel the scheduling operation
 *
 * @param task function to be removed from later execution
 */
export const cancelTask = (task: Function) => {
  tasks = tasks.filter(fn => fn !== task);
  if (!tasks.length) clearTimeout(timer);
};
