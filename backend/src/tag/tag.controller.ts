import {
	Controller,
	Param,
	UseGuards,
	Delete,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
	ApiBearerAuth,
	ApiOkResponse,
	ApiOperation,
	ApiTags,
} from '@nestjs/swagger';
import { User } from '@prisma/client';
import { RequestUser } from 'src/constants/auth';
import { TagService } from './tag.service';

@Controller('tags')
@ApiTags('tags')
@UseGuards(AuthGuard())
@ApiBearerAuth()
export class TagController {
	constructor(
		private readonly tagService: TagService,
	) { }


	@Delete(':id')
	@ApiOperation({ summary: 'Deletes a Tag' })
	@ApiOkResponse({
		status: 201,
	})
	public async deleteCard(
		@RequestUser() user: User,
		@Param('id') tagId: number,
	) {
		return this.tagService.delete(user, +tagId);
	}
}
