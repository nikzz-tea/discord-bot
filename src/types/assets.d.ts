declare module 'markov-generator' {
  export default class MarkovGen {
    constructor(options: { input: string[]; minLength: number; bannedTerminals?: string[] });
    makeChain(minLength?: number): string;
  }
}
