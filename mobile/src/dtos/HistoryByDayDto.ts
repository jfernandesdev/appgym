import { HistoryDto } from "@dtos/HistoryDto";

export type HistoryByDayDto = {
  title: string;
  data: HistoryDto[];
}