import {
  Model,
  Column,
  Table,
  CreatedAt,
  UpdatedAt,
  PrimaryKey,
  DataType,
  Default,
  BelongsTo,
  ForeignKey,
  HasOne,
} from "sequelize-typescript";
import { UsersJobs } from "./UsersJobs";

enum ContingencyType {
  Absence = "ausencia",
  overtime = "horas extras",
  lateArrival = "llegada tarde",
  earlyWithdrawal = "retiro temprano",
}

enum ContingencyState {
  pending = "Pendiente",
  accepted = "Atendida",
  rejected = "Rechazada",
  discarded = "Descartada",
}

@Table
export class Contingencies extends Model<Contingencies> {
  @BelongsTo(() => UsersJobs)
  userJob!: UsersJobs;

  @ForeignKey(() => UsersJobs)
  @Column
  UserCuil!: string;

  @ForeignKey(() => UsersJobs)
  @Column
  JobId!: string;

  @Column
  date!: Date;

  @Column
  endDate?: Date;

  @Default(0)
  @Column
  absenceDays?: number;

  @Column
  contingencyType!: ContingencyType;

  @Default(0)
  @Column
  hoursNumber?: number;

  @Column
  hasNotice!: boolean;

  @Column
  reason!: string;

  @Column
  substitute?: string;

  @Default(ContingencyState.pending)
  @Column
  state?: ContingencyState;

  @CreatedAt
  @Column
  createdAt!: Date;

  @UpdatedAt
  @Column
  updatedAt!: Date;
}
