import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import { IncomingMessage } from 'node:http';
import { Message } from './types/message';

@Injectable()
export class OllamaService {
  private readonly client: axios.AxiosInstance;
  constructor(private readonly configService: ConfigService) {
    this.client = axios.create({
      baseURL: configService.getOrThrow('OLLAMA_BASE_URL'),
    });
  }
  invoke(message: Array<Message>, stream?: false): Promise<Message>;
  invoke(message: Array<Message>, stream: true): Promise<IncomingMessage>;
  async invoke(
    messages: Array<Message>,
    stream: boolean = false,
  ): Promise<Message | IncomingMessage> {
    const payload = {
      model: this.configService.getOrThrow('OLLAMA_MODEL'),
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
