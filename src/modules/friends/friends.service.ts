import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateFriendDto } from './dto/create-friend.dto';
import { FriendRepository } from './friend.repository';

@Injectable()
export class FriendsService {
  constructor(private readonly friendRepository: FriendRepository) {}

  async sendFriendRequest(createFriendDto: CreateFriendDto) {
    const { user, friend } = await this.friendRepository.findInfoUserAndFriend(
      createFriendDto.requesterUserId,
      createFriendDto.friendId,
    );

    const sendRequest = await this.friendRepository.sendFriendRequest({
      ...createFriendDto,
      requesterUserImg: user.imgUrl,
      requesterUserName: user.name,
      friendName: friend.name,
      friendImg: friend.imgUrl,
    });

    if (!sendRequest) {
      throw new ConflictException('Falha ao enviar solicitação de amizade!');
    }

    return sendRequest;
  }

  async listAllFriendRequest(userId: string) {
    const list = await this.friendRepository.listAllFriendRequest(userId);

    if (!list) {
      throw new NotFoundException('Nenhuma solicitação de amizade encontrada!');
    }

    return list;
  }

  async acceptFriendRequest(id: string, friendId: string) {
    const existSoliciation =
      await this.friendRepository.findOneFriendRequest(friendId);

    if (!existSoliciation) {
      throw new NotFoundException('Solicitação de amizade não encontrada!');
    }

    const friend = await this.friendRepository.acceptFriendRequest(
      id,
      friendId,
    );

    if (!friend) {
      throw new NotFoundException('Aceitação de amizade falhou!');
    }

    return {
      message: `${friend.friendName} aceitou a solicitação de amizade!`,
      friend,
    };
  }

  async rejectFriendRequest(id: string, friendId: string) {
    const existSoliciation =
      await this.friendRepository.findOneFriendRequest(friendId);

    if (!existSoliciation) {
      throw new NotFoundException('Solicitação de amizade não encontrada!');
    }

    await this.friendRepository.rejectFriendRequest(id, friendId);

    return {
      message: 'Solicitação de amizade rejeitada!',
    };
  }

  async removeFriend(id: string) {
    await this.friendRepository.removeFriend(id);

    return {
      message: 'Amizade removida com sucesso!',
    };
  }

  async listAllFriends(userId: string) {
    const list = await this.friendRepository.listAllFriends(userId);

    if (!list) {
      throw new NotFoundException('Nenhum amigo encontrado!');
    }

    return list;
  }

  async listByName(name: string) {
    const list = await this.friendRepository.searchFriendByName(name);

    if (!list) {
      throw new NotFoundException('Nenhum amigo encontrado!');
    }

    return list;
  }
}
