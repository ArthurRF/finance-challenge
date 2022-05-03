export interface ICreateTrackDTO {
  stockTikerSlug: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  lastUpdate: Date;
}