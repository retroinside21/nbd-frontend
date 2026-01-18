export interface IServersResponse {
  servers: {
    id: number,
    cluster_name: string
    inbound_id: string
  }[];
  total_keys: number;
}

export interface IDevice {
    platform: string,
    osVersion: string,
    deviceModel: string,
    userAgent: string,
    createdAt: string,
    updated_at: string,
    updatedAt: string,
    hwid: string
  }

export interface IResponseDevice {
    total: number,
    devices: IDevice[]
  }

export interface ICreateUser {
  username: string;
  expireAt: string;
  status?: 'ACTIVE' | 'DISABLED' | 'LIMITED' | 'EXPIRED';
  hwidDeviceLimit?: number;

  trojanPassword?: string;
  ssPassword?: string;
  vlessUuid?: string;
  trafficLimitBytes?: number;
  trafficLimitStrategy?: 'NO_RESET' | 'DAY' | 'WEEK' | 'MONTH';
  description?: string;
  tag?: 'VIP_USER';
  tg_id?: number | null;
  email?: string;
}
