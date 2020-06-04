export interface Channel {
  id?: string;
  type: 'spotify-health-check';
  ownerConnectionId: string;
  connectedConnectionIds: string[];
  createdAt: Date;
}
