import {
  Injectable,
  NotFoundException,
  NotImplementedException,
} from '@nestjs/common';
import { CreateChatDto } from './dto/create-chat.dto';
import { UpdateChatDto } from './dto/update-chat.dto';
import { ChatRepository } from './chat.repository';
import UploadFileFactoryService from 'src/utils/uploads/upload-file.service';

@Injectable()
export class ChatService {
  constructor(
    private readonly chatRepository: ChatRepository,
    private readonly uploadImg: UploadFileFactoryService,
  ) {}

  async create(createChatDto: CreateChatDto) {
    let imgUrl: string | undefined = '';

    if (createChatDto.imgUrl) {
      imgUrl = await this.uploadImg.upload(createChatDto.imgUrl);
    }

    const createChat = await this.chatRepository.create({
      ...createChatDto,
      imgUrl: imgUrl,
    });

    if (!createChat) {
      throw new NotImplementedException('Falha ao criar chat');
    }

    return createChat;
  }

  async findAll() {
    const chats = await this.chatRepository.findAll();

    if (!chats) {
      throw new NotFoundException('Falha ao buscar chats');
    }

    return chats;
  }

  async findOne(id: string) {
    const chat = await this.chatRepository.findById(id);

    if (!chat) {
      throw new NotFoundException('Chat não encontrado');
    }

    return chat;
  }

  update(id: number, updateChatDto: UpdateChatDto) {
    return `This action updates a #${id} chat`;
  }

  remove(id: number) {
    return `This action removes a #${id} chat`;
  }
}
