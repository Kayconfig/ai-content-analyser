import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { IncomingMessage } from 'node:http';
import { Message } from './types/message';

@Injectable()
export class OllamaService {
  private readonly client: axios.AxiosInstance;
  constructor() {
    this.client = axios.create({
      baseURL: 'http://localhost:11434/api',
    });
  }
  invoke(message: Array<Message>, stream?: false): Promise<Message>;
  invoke(message: Array<Message>, stream: true): Promise<IncomingMessage>;
  async invoke(
    messages: Array<Message>,
    stream: boolean = false,
  ): Promise<Message | IncomingMessage> {
    const payload = {
      model: 'gpt-oss:20b',
      messages,
      stream,
    };
    const { data } = await this.client.post('/chat', payload, {
      responseType: stream ? 'stream' : 'json',
    });

    if (!stream && !data?.message) {
      throw new Error('Expected message property in non-streaming response');
    }

    return stream ? data : data.message;
  }
}
