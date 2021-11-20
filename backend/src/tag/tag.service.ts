import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { Tag } from 'src/constants/card';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class TagService {
	constructor(private prisma: PrismaService) { }

	/**
	 *
	 * @param {number} cardId
	 */
	async create(user: User, cardId: number, label: string, color_hex: string): Promise<Tag> {
		const tag = await this.prisma.tag.create({
			data: {
				card: { connect: { id: cardId } },
				creator_id: user.id,
				label,
				color_hex,
			},
		});
		return tag;
	}

	async delete(user: User, tagId: number)  {
		const tag = await this.prisma.tag.delete({
			where: {
				id: tagId,
			},
		});

		return tag;
	}
}
