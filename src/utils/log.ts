const ansi: Record<string, string> = {
  gray: '\x1b[90m',
  green: '\x1b[32m',
  cyan: '\x1b[36m',
  magenta: '\x1b[35m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
  reset: '\x1b[0m',
};

const useColor = process.stdout.isTTY === true;
const timestamp = () => new Date().toLocaleString('en-GB', { hour12: false });

const print = (color: string, tag: string, message: string) => {
  const c = (code: string, text: string) => (useColor ? `${ansi[code]}${text}${ansi.reset}` : text);
  console.log(`${c('gray', `[${timestamp()}]`)} ${c(color, tag)} ${message}`);
};

export default {
  info: (message: string) => print('green', '[info]', message),
  command: (message: string) => print('cyan', '[command]', message),
  role: (message: string) => print('magenta', '[role]', message),
  starboard: (message: string) => print('yellow', '[starboard]', message),
  error: (message: string) => print('red', '[error]', message),
};
