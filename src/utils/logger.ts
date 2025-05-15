import chalk from 'chalk';

const Logger = {
  info: (msg: string) => {
    console.log(`${chalk.bgBlue.black(' INFO ')} ${chalk.blue(msg)}`);
  },
  sucess: (msg: string) => {
    console.log(`${chalk.bgGreen.black(' OK ')} ${chalk.green(msg)}`);
  },
  warn: (msg: string) => {
    console.log(`${chalk.bgYellow.black(' WARN ')} ${chalk.yellow(msg)}`);
  },
  error: (msg: string) => {
    console.log(`${chalk.bgRed.black(' ERROR ')} ${chalk.red(msg)}`);
  },
  debug: (msg: string) => {
    if (process.env.NODE_ENV === 'development') {
      console.log(`${chalk.bgMagenta.black(' DEBUG ')} ${chalk.magenta(msg)}`);
    }
  },
};

export default Logger;
