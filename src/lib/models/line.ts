export interface LineEvent {
  source: {
    userId: string;
  };
  type: string;
}

export interface LineEventObject {
  events: LineEvent[];
}
