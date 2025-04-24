import {
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsString,
  MaxLength,
  MinLength,
} from "class-validator";
import { ActivityType } from "enums/ActivityType";
import { IActivityUpdate } from "interfaces/IActivityUpdate";
import { activityFailedValidation } from "messages/validation/activityValidationMessages";
import { commonFailedValidation } from "messages/validation/commonValidationMessages";
import { activityConstants } from "resources/constants/activityConstants";

export class ActivityUpdateDTO implements IActivityUpdate {
  @IsNotEmpty({ message: commonFailedValidation.ID_REQUIRED_MESSAGE })
  @IsInt({ message: commonFailedValidation.ID_INVALID_TYPE_MESSAGE })
  @IsPositive({ message: commonFailedValidation.ID_NEGATIVE_MESSAGE })
  id!: number;

  @IsOptional()
  @IsString({ message: activityFailedValidation.TITLE_INVALID_TYPE_MESSAGE })
  @MinLength(activityConstants.TITLE_MIN_LENGTH, {
    message: activityFailedValidation.TITLE_BELOW_MIN_LENGTH_MESSAGE,
  })
  @MaxLength(activityConstants.TITLE_MAX_LENGTH, {
    message: activityFailedValidation.TITLE_ABOVE_MAX_LENGTH_MESSAGE,
  })
  title?: string;

  @IsOptional()
  @IsString({
    message: activityFailedValidation.DESCRIPTION_INVALID_TYPE_MESSAGE,
  })
  @MinLength(activityConstants.DESCRIPTION_MIN_LENGTH, {
    message: activityFailedValidation.DESCRIPTION_BELOW_MIN_LENGTH_MESSAGE,
  })
  @MaxLength(activityConstants.DESCRIPTION_MAX_LENGTH, {
    message: activityFailedValidation.DESCRIPTION_ABOVE_MAX_LENGTH_MESSAGE,
  })
  description?: string;

  @IsOptional()
  @IsEnum(ActivityType, {
    message: activityFailedValidation.ACTIVITY_TYPE_INVALID_MESSAGE,
  })
  activityType?: ActivityType;
}
