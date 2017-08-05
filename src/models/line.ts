export interface ILineEvent {
  source: {
    userId: string;
  };
  type: string;
}

export interface ILineEventObject {
  events: ILineEvent[];
}
