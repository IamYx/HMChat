import { V2InternalService } from "../V2NIMInternalService";
export interface NTPTimerInternal extends V2InternalService {
    getNTPTime(): number;
}
