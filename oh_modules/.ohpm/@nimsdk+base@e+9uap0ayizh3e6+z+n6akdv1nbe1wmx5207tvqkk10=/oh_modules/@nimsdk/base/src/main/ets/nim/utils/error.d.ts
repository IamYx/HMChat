import File from '@system.file';
import { NIMEStrAnyObj } from '../internal/types';
import { V2NIMError } from '../sdk/types';
/**
 * @details 带资源编号的错误码格式为 IM业务编号1 + 资源编号(2位) + 错误码(3位), 例如 101414
 * | 编号 | 资源 |
 * | :--: | :--: |
 * | 01 | 应用 |
 * | 02 | 用户账号 |
 * | 03 | 用户资料 |
 * | 04 | 好友 |
 * | 05 | 静音 |
 * | 06 | 黑名单 |
 * | 07 | 消息 |
 * | 08 | 群 |
 * | 09 | 群成员 |
 * | 10 | 会话 |
 * | 11 | 广播消息 |
 * | 12 | 系统消息 |
 * | 13 | 聊天室 |
 * | 14 | 聊天室成员/虚构用户 |
 * | 15 | 会话概览 |
 * | 16 | 会话分组 |
 * | 17 | 聊天室队列 |
 * | 89 | 其他 |
 * | 90 | 通用 |
 * | 91 | 接口 |
 * | 92 | 连接 |
 * | 93 | 数据库 |
 * | 94 | 文件 |
 * | 95 | 反垃圾 |
 */
export declare const V2NIMErrorMap: {
    /** 未知错误 / unknown error */
    V2NIM_ERROR_CODE_UNKNOWN: {
        code: number;
        message: string;
    };
    /** 注册第三方推送SDK获取token失败 / unknown error */
    V2NIM_ERROR_CODE_REGISTER_PUSH_SDK_FAILED: {
        code: number;
        message: string;
    };
    /** 请求成功 / success */
    V2NIM_ERROR_CODE_SUCCESS: {
        code: number;
        message: string;
    };
    V2NIM_ERROR_CODE_HANDSHAKE: {
        code: number;
        message: string;
    };
    V2NIM_ERROR_CODE_REQUEST_TEMPERARY_FORBIDDEN: {
        code: number;
        message: string;
    };
    V2NIM_ERROR_CODE_SERVER_UNIT_ERROR: {
        code: number;
        message: string;
    };
    V2NIM_ERROR_CODE_FORBIDDEN: {
        code: number;
        message: string;
    };
    V2NIM_ERROR_CODE_NOT_FOUND: {
        code: number;
        message: string;
    };
    V2NIM_ERROR_CODE_PARAMETER_ERROR: {
        code: number;
        message: string;
    };
    V2NIM_ERROR_CODE_RATE_LIMIT_REACHED: {
        code: number;
        message: string;
    };
    V2NIM_ERROR_CODE_MULTI_LOGIN_FORBIDDEN: {
        code: number;
        message: string;
    };
    V2NIM_ERROR_CODE_SERVER_INTERNAL_ERROR: {
        code: number;
        message: string;
    };
    V2NIM_ERROR_CODE_SERVER_BUSY: {
        code: number;
        message: string;
    };
    V2NIM_ERROR_CODE_APP_UNREACHABLE: {
        code: number;
        message: string;
    };
    V2NIM_ERROR_CODE_SERVICE_UNAVAILABLE: {
        code: number;
        message: string;
    };
    V2NIM_ERROR_CODE_PROTOCOL_BLACKHOLE_FILTERED: {
        code: number;
        message: string;
    };
    V2NIM_ERROR_CODE_NO_PERMISSION: {
        code: number;
        message: string;
    };
    V2NIM_ERROR_CODE_UNPACK_ERROR: {
        code: number;
        message: string;
    };
    V2NIM_ERROR_CODE_PACK_ERROR: {
        code: number;
        message: string;
    };
    V2NIM_ERROR_CODE_IM_DISABLED: {
        code: number;
        message: string;
    };
    V2NIM_ERROR_CODE_SERVICE_ADDRESS_INVALID: {
        code: number;
        message: string;
    };
    V2NIM_ERROR_CODE_APPKEY_NOT_EXIST: {
        code: number;
        message: string;
    };
    V2NIM_ERROR_CODE_BUNDLEID_CHECK_FAILED: {
        code: number;
        message: string;
    };
    V2NIM_ERROR_CODE_APPKEY_BLOCKED: {
        code: number;
        message: string;
    };
    V2NIM_ERROR_CODE_INVALID_TOKEN: {
        code: number;
        message: string;
    };
    V2NIM_ERROR_CODE_ROBOT_NOT_ALLOWED: {
        code: number;
        message: string;
    };
    V2NIM_ERROR_CODE_ACCOUNT_NOT_EXIST: {
        code: number;
        message: string;
    };
    V2NIM_ERROR_CODE_ACCOUNT_CHAT_BANNED: {
        code: number;
        message: string;
    };
    V2NIM_ERROR_CODE_ACCOUNT_BANNED: {
        code: number;
        message: string;
    };
    V2NIM_ERROR_CODE_ACCOUNT_IN_BLOCK_LIST: {
        code: number;
        message: string;
    };
    V2NIM_ERROR_CODE_USER_PROFILE_NOT_EXIST: {
        code: number;
        message: string;
    };
    V2NIM_ERROR_CODE_USER_PROFILE_HIT_ANTISPAM: {
        code: number;
        message: string;
    };
    V2NIM_ERROR_CODE_PEER_FRIEND_LIMIT: {
        code: number;
        message: string;
    };
    V2NIM_ERROR_CODE_FRIEND_APPLICATION_NOT_EXIST: {
        code: number;
        message: string;
    };
    V2NIM_ERROR_CODE_FRIEND_NOT_EXIST: {
        code: number;
        message: string;
    };
    V2NIM_ERROR_CODE_FRIEND_ALREADY_EXIST: {
        code: number;
        message: string;
    };
    V2NIM_ERROR_CODE_SELF_FRIEND_OPERATION_NOT_ALLOWED: {
        code: number;
        message: string;
    };
    V2NIM_ERROR_CODE_FRIEND_LIMIT: {
        code: number;
        message: string;
    };
    V2NIM_ERROR_CODE_FRIEND_OPERATION_RATE_LIMIT: {
        code: number;
        message: string;
    };
    V2NIM_ERROR_CODE_FRIEND_HIT_ANTISPAM: {
        code: number;
        message: string;
    };
    V2NIM_ERROR_CODE_SELF_MUTE_OPERATION_NOT_ALLOWED: {
        code: number;
        message: string;
    };
    V2NIM_ERROR_CODE_MUTE_LIST_LIMIT: {
        code: number;
        message: string;
    };
    V2NIM_ERROR_CODE_SELF_BLOCK_LIST_OPERATION_NOT_ALLOWED: {
        code: number;
        message: string;
    };
    V2NIM_ERROR_CODE_BLOCK_LIST_LIMIT: {
        code: number;
        message: string;
    };
    V2NIM_ERROR_CODE_REVOKE_THIRD_PARTY_MESSAGE_NOT_ALLOWED: {
        code: number;
        message: string;
    };
    V2NIM_ERROR_CODE_SHORT_TO_LONG_URL_FAILED: {
        code: number;
        message: string;
    };
    V2NIM_ERROR_CODE_URL_INVALID: {
        code: number;
        message: string;
    };
    V2NIM_ERROR_CODE_DURATION_OUT_OF_RANGE: {
        code: number;
        message: string;
    };
    V2NIM_ERROR_CODE_GET_FILE_META_INFO_FAILED: {
        code: number;
        message: string;
    };
    V2NIM_ERROR_CODE_AUDIO_FILE_SIZE_LIMIT: {
        code: number;
        message: string;
    };
    V2NIM_ERROR_CODE_VOICE_TO_TEXT_TIMEOUT: {
        code: number;
        message: string;
    };
    V2NIM_ERROR_CODE_VOICE_TO_TEXT_FAILED: {
        code: number;
        message: string;
    };
    V2NIM_ERROR_CODE_REVOKE_EXCEED_TIME_LIMIT: {
        code: number;
        message: string;
    };
    V2NIM_ERROR_CODE_REVOKE_MESSAGE_NOT_ALLOWED: {
        code: number;
        message: string;
    };
    V2NIM_ERROR_CODE_FORCE_PUSH_LIST_LIMIT: {
        code: number;
        message: string;
    };
    V2NIM_ERROR_CODE_TEAM_MESSAGE_RECEIPT_RATE_LIMIT: {
        code: number;
        message: string;
    };
    V2NIM_ERROR_CODE_SNAPSHOT_NOT_EXIST: {
        code: number;
        message: string;
    };
    V2NIM_ERROR_CODE_PIN_LIMIT: {
        code: number;
        message: string;
    };
    V2NIM_ERROR_CODE_PIN_NOT_EXIST: {
        code: number;
        message: string;
    };
    V2NIM_ERROR_CODE_QUICK_COMMENT_LIMIT: {
        code: number;
        message: string;
    };
    V2NIM_ERROR_CODE_PIN_ALREADY_EXIST: {
        code: number;
        message: string;
    };
    V2NIM_ERROR_CODE_REVOKE_MESSAGE_TO_SELF_NOT_ALLOWED: {
        code: number;
        message: string;
    };
    V2NIM_ERROR_CODE_APP_CHAT_BANNED: {
        code: number;
        message: string;
    };
    V2NIM_ERROR_CODE_QUICK_COMMENT_FUNCTION_DISABLED: {
        code: number;
        message: string;
    };
    V2NIM_ERROR_CODE_PIN_FUNCTION_DISABLED: {
        code: number;
        message: string;
    };
    V2NIM_ERROR_CODE_TEAM_READ_RECEIPT_FUNCTION_DISABLED: {
        code: number;
        message: string;
    };
    V2NIM_ERROR_CODE_P2P_READ_RECEIPT_FUNCTION_DISABLED: {
        code: number;
        message: string;
    };
    V2NIM_ERROR_CODE_RATE_LIMIT_FOR_MESSAGING_REACHED: {
        code: number;
        message: string;
    };
    V2NIM_ERROR_CODE_MESSAGE_HIT_ANTISPAM: {
        code: number;
        message: string;
    };
    V2NIM_ERROR_CODE_MESSAGE_NOT_EXIST: {
        code: number;
        message: string;
    };
    V2NIM_ERROR_CODE_UNSENDING_MESSAGE_EXPIRED: {
        code: number;
        message: string;
    };
    V2NIM_ERROR_CODE_TEAM_MARK_READ_FAILED: {
        code: number;
        message: string;
    };
    V2NIM_ERROR_CODE_SENDER_OR_MANAGER_PERMISSION_ONLY_REVOKE: {
        code: number;
        message: string;
    };
    V2NIM_ERROR_CODE_DELETE_SELF_MESSAGE_NOT_ALLOWED: {
        code: number;
        message: string;
    };
    V2NIM_ERROR_CODE_NOT_CHATBOT_ACCOUNT: {
        code: number;
        message: string;
    };
    V2NIM_ERROR_CODE_MESSAGE_SENSE_REQUIRED: {
        code: number;
        message: string;
    };
    V2NIM_ERROR_CODE_HIGH_PRIORITY_MESSAGE_RATE_LIMIT: {
        code: number;
        message: string;
    };
    ACK_MESSAGE_BE_HIGH_PRIORITY: {
        code: number;
        message: string;
    };
    V2NIM_ERROR_CODE_DUPLICATE_CLIENT_MESSAGE_ID: {
        code: number;
        message: string;
    };
    V2NIM_ERROR_CODE_INVALID_TIME_RANGE: {
        code: number;
        message: string;
    };
    V2NIM_ERROR_CODE_MESSAGE_HIT_CLIENT_ANTISPAM: {
        code: number;
        message: string;
    };
    V2NIM_ERROR_CODE_NOT_ADVANCED_TEAM: {
        code: number;
        message: string;
    };
    V2NIM_ERROR_CODE_TEAM_MANAGER_LIMIT: {
        code: number;
        message: string;
    };
    V2NIM_ERROR_CODE_JOINED_TEAM_LIMIT: {
        code: number;
        message: string;
    };
    V2NIM_ERROR_CODE_TEAM_NORMAL_MEMBER_CHAT_BANNED: {
        code: number;
        message: string;
    };
    V2NIM_ERROR_CODE_INVITED_ACCOUNT_NOT_FRIEND: {
        code: number;
        message: string;
    };
    V2NIM_ERROR_CODE_REJECT_ALL_TEAM_APPLICATIONS: {
        code: number;
        message: string;
    };
    V2NIM_ERROR_CODE_TEAM_NOT_EXIST: {
        code: number;
        message: string;
    };
    V2NIM_ERROR_CODE_TEAM_ALREADY_CHAT_BANNED: {
        code: number;
        message: string;
    };
    V2NIM_ERROR_CODE_ALL_TEAM_MEMBER_CHAT_BANNED: {
        code: number;
        message: string;
    };
    V2NIM_ERROR_CODE_EXTENDED_SUPER_TEAM_LIMIT: {
        code: number;
        message: string;
    };
    V2NIM_ERROR_CODE_CREATED_TEAM_LIMIT: {
        code: number;
        message: string;
    };
    V2NIM_ERROR_CODE_TEAM_INVITATION_LIMIT: {
        code: number;
        message: string;
    };
    V2NIM_ERROR_CODE_TEAM_HIT_ANTISPAM: {
        code: number;
        message: string;
    };
    V2NIM_ERROR_CODE_EXTENDED_SUPER_TEAM_LIMIT_NOT_CONFIGURED: {
        code: number;
        message: string;
    };
    V2NIM_ERROR_CODE_SUPER_TEAM_SERVICE_DISABLED: {
        code: number;
        message: string;
    };
    V2NIM_ERROR_CODE_TEAM_READ_RECEIPT_RECORD_NOT_FOUND: {
        code: number;
        message: string;
    };
    V2NIM_ERROR_CODE_NOT_MANAGER: {
        code: number;
        message: string;
    };
    V2NIM_ERROR_CODE_ONLINE_MEMBER_COUNT_DISABLED: {
        code: number;
        message: string;
    };
    V2NIM_ERROR_CODE_TRANSFER_DISABLED: {
        code: number;
        message: string;
    };
    V2NIM_ERROR_CODE_CREATE_TEAM_DISABLED: {
        code: number;
        message: string;
    };
    V2NIM_ERROR_CODE_EXTENDED_SUPER_TEAM_CREATE_FAILED: {
        code: number;
        message: string;
    };
    V2NIM_ERROR_CODE_TEAM_MESSAGE_READ_RECEIPT_DISABLED: {
        code: number;
        message: string;
    };
    V2NIM_ERROR_CODE_RETRY: {
        code: number;
        message: string;
    };
    V2NIM_ERROR_CODE_CHAT_BAN_LIST_CONTAIN_NOT_TEAM_MEMBER: {
        code: number;
        message: string;
    };
    V2NIM_ERROR_CODE_CHAT_BAN_LIST_CONTAIN_OPERATOR: {
        code: number;
        message: string;
    };
    V2NIM_ERROR_CODE_CHAT_BAN_LIST_CONTAIN_TEAM_OWNER: {
        code: number;
        message: string;
    };
    V2NIM_ERROR_CODE_OPERATION_ON_TEAM_MANAGER_NOT_ALLOWED: {
        code: number;
        message: string;
    };
    V2NIM_ERROR_CODE_NO_TEAM_INVITE_PERMISSION: {
        code: number;
        message: string;
    };
    V2NIM_ERROR_CODE_TEAM_OWNER_QUIT_NOT_ALLOWED: {
        code: number;
        message: string;
    };
    V2NIM_ERROR_CODE_TEAM_OWNER_IN_KICK_LIST: {
        code: number;
        message: string;
    };
    V2NIM_ERROR_CODE_INVITE_ROBOT_ACCOUNT_NOT_ALLOWED: {
        code: number;
        message: string;
    };
    V2NIM_ERROR_CODE_KICK_OPERATOR_NOT_ALLOWED: {
        code: number;
        message: string;
    };
    V2NIM_ERROR_CODE_TEAM_MEMBER_ALREADY_EXIST: {
        code: number;
        message: string;
    };
    V2NIM_ERROR_CODE_TEAM_MEMBER_CAN_NOT_MODIFY_SELF: {
        code: number;
        message: string;
    };
    V2NIM_ERROR_CODE_TEAM_INVITATION_NOT_EXIST: {
        code: number;
        message: string;
    };
    V2NIM_ERROR_CODE_OPERATION_ON_TEAM_OWNER_NOT_ALLOWED: {
        code: number;
        message: string;
    };
    V2NIM_ERROR_CODE_TEAM_MEMBER_NOT_EXIST: {
        code: number;
        message: string;
    };
    V2NIM_ERROR_CODE_TEAM_MEMBER_CHAT_BANNED: {
        code: number;
        message: string;
    };
    V2NIM_ERROR_CODE_TEAM_OWNER_OPERATION_PERMISSION_REQUIRED: {
        code: number;
        message: string;
    };
    V2NIM_ERROR_CODE_TEAM_OWNER_OR_MANAGER_OPERATION_PERMISSION_REQUIRED: {
        code: number;
        message: string;
    };
    V2NIM_ERROR_CODE_TEAM_MEMBER_CONCURRENT_OPERATION_FAILED: {
        code: number;
        message: string;
    };
    V2NIM_ERROR_CODE_TEAM_MEMBER_HIT_ANTISPAM: {
        code: number;
        message: string;
    };
    V2NIM_ERROR_CODE_CONVERSATION_AND_ACCOUNT_MISMATCH: {
        code: number;
        message: string;
    };
    V2NIM_ERROR_CODE_CONVERSATION_STICK_TOP_LIMIT: {
        code: number;
        message: string;
    };
    V2NIM_ERROR_CODE_CONVERSATION_BELONGED_GROUP_LIMIT: {
        code: number;
        message: string;
    };
    V2NIM_ERROR_CODE_CONVERSATION_IS_NOT_STICK_TOP: {
        code: number;
        message: string;
    };
    V2NIM_ERROR_CODE_STICK_TOP_DISABLED: {
        code: number;
        message: string;
    };
    V2NIM_ERROR_CODE_CONVERSATION_NOT_EXIST: {
        code: number;
        message: string;
    };
    V2NIM_ERROR_CODE_CHATROOM_LINK_UNAVAILABLE: {
        code: number;
        message: string;
    };
    V2NIM_ERROR_CODE_IM_CONNECTION_ABNORMAL: {
        code: number;
        message: string;
    };
    V2NIM_ERROR_CODE_CHATROOM_NOT_EXIST: {
        code: number;
        message: string;
    };
    V2NIM_ERROR_CODE_CHATROOM_CLOSED: {
        code: number;
        message: string;
    };
    V2NIM_ERROR_CODE_CHATROOM_REPEATED_OPERATION: {
        code: number;
        message: string;
    };
    V2NIM_ERROR_CODE_CHATROOM_DISABLED: {
        code: number;
        message: string;
    };
    V2NIM_ERROR_CODE_ALL_CHATROOM_MEMBER_CHAT_BANNED: {
        code: number;
        message: string;
    };
    V2NIM_ERROR_CODE_CHATROOM_HIT_ANTISPAM: {
        code: number;
        message: string;
    };
    V2NIM_ERROR_CODE_ANONYMOUS_MEMBER_FORBIDDEN: {
        code: number;
        message: string;
    };
    V2NIM_ERROR_CODE_CHATROOM_MEMBER_NOT_EXIST: {
        code: number;
        message: string;
    };
    V2NIM_ERROR_CODE_CHATROOM_MEMBER_REPEATED_OPERATION: {
        code: number;
        message: string;
    };
    V2NIM_ERROR_CODE_CHATROOM_MEMBER_CHAT_BANNED: {
        code: number;
        message: string;
    };
    V2NIM_ERROR_CODE_ACCOUNT_IN_CHATROOM_BLOCK_LIST: {
        code: number;
        message: string;
    };
    V2NIM_ERROR_CODE_CHATROOM_OWNER_OPERATION_PERMISSION_REQUIRED: {
        code: number;
        message: string;
    };
    V2NIM_ERROR_CODE_SELF_IN_CHATROOM_MEMBER_OPERATION_LIST: {
        code: number;
        message: string;
    };
    V2NIM_ERROR_CODE_CHATROOM_OWNER_OR_MANAGER_OPERATION_PERMISSION_REQUIRED: {
        code: number;
        message: string;
    };
    V2NIM_ERROR_CODE_CHATROOM_MEMBER_LIMIT: {
        code: number;
        message: string;
    };
    V2NIM_ERROR_CODE_CHATROOM_MEMBER_CONCURRENT_OPERATION_FAILED: {
        code: number;
        message: string;
    };
    V2NIM_ERROR_CODE_CHATROOM_MEMBER_HIT_ANTISPAM: {
        code: number;
        message: string;
    };
    V2NIM_ERROR_CODE_CONVERSATION_GROUP_NOT_EXIST: {
        code: number;
        message: string;
    };
    V2NIM_ERROR_CODE_CONVERSATION_GROUP_LIMIT: {
        code: number;
        message: string;
    };
    V2NIM_ERROR_CODE_CONVERSATIONS_IN_GROUP_LIMIT: {
        code: number;
        message: string;
    };
    V2NIM_ERROR_CODE_SIGNALLING_ROOM_EXIST: {
        code: number;
        message: string;
    };
    V2NIM_ERROR_CODE_SIGNALLING_INVITE_ACCEPTED: {
        code: number;
        message: string;
    };
    V2NIM_ERROR_CODE_SIGNALLING_MEMBER_NOT_EXIST: {
        code: number;
        message: string;
    };
    V2NIM_ERROR_CODE_SIGNALLING_MEMBER_ALREADY_EXIST: {
        code: number;
        message: string;
    };
    V2NIM_ERROR_CODE_SIGNALLING_MEMBER_ALREADY_EXIST_AND_DEVICE_ID_NOT_UNIQUE: {
        code: number;
        message: string;
    };
    V2NIM_ERROR_CODE_SIGNALLING_UID_NOT_UNIQUE: {
        code: number;
        message: string;
    };
    V2NIM_ERROR_CODE_SIGNALLING_INVITE_REJECTED: {
        code: number;
        message: string;
    };
    V2NIM_ERROR_CODE_SIGNALLING_MEMBER_OFFLINE_BUT_PUSH_REACHABLE: {
        code: number;
        message: string;
    };
    V2NIM_ERROR_CODE_SIGNALLING_MEMBER_OFFLINE_AND_PUSH_NOT_REACHABLE: {
        code: number;
        message: string;
    };
    V2NIM_ERROR_CODE_SIGNALLING_INVITE_NOT_EXIST: {
        code: number;
        message: string;
    };
    V2NIM_ERROR_CODE_SIGNALLING_ROOM_NOT_EXIST: {
        code: number;
        message: string;
    };
    V2NIM_ERROR_CODE_SIGNALLING_SERVICE_DISABLED: {
        code: number;
        message: string;
    };
    V2NIM_ERROR_CODE_SIGNALLING_ROOM_MEMBER_LIMIT: {
        code: number;
        message: string;
    };
    V2NIM_ERROR_CODE_COLLECTION_LIMIT: {
        code: number;
        message: string;
    };
    V2NIM_ERROR_CODE_COLLECTION_NOT_EXIST: {
        code: number;
        message: string;
    };
    V2NIM_ERROR_CODE_COLLECTION_CONCURRENT_OPERATION_FAILED: {
        code: number;
        message: string;
    };
    V2NIM_ERROR_CODE_INTERNAL: {
        code: number;
        message: string;
    };
    V2NIM_ERROR_CODE_ILLEGAL_STATE: {
        code: number;
        message: string;
    };
    V2NIM_ERROR_CODE_MISUSE: {
        code: number;
        message: string;
    };
    V2NIM_ERROR_CODE_CANCELLED: {
        code: number;
        message: string;
    };
    V2NIM_ERROR_CODE_CALLBACK_FAILED: {
        code: number;
        message: string;
    };
    V2NIM_ERROR_CODE_INVALID_PARAMETER: {
        code: number;
        message: string;
    };
    V2NIM_ERROR_CODE_TIMEOUT: {
        code: number;
        message: string;
    };
    V2NIM_ERROR_CODE_RESOURCE_NOT_EXIST: {
        code: number;
        message: string;
    };
    V2NIM_ERROR_CODE_RESOURCE_ALREADY_EXIST: {
        code: number;
        message: string;
    };
    V2NIM_ERROR_CODE_CONNECT_FAILED: {
        code: number;
        message: string;
    };
    V2NIM_ERROR_CODE_CONNECT_TIMEOUT: {
        code: number;
        message: string;
    };
    V2NIM_ERROR_CODE_DISCONNECT: {
        code: number;
        message: string;
    };
    V2NIM_ERROR_CODE_PROTOCOL_TIMEOUT: {
        code: number;
        message: string;
    };
    V2NIM_ERROR_CODE_PROTOCOL_SEND_FAILED: {
        code: number;
        message: string;
    };
    V2NIM_ERROR_CODE_REQUEST_FAILED: {
        code: number;
        message: string;
    };
    V2NIM_ERROR_CODE_DATABASE_OPEN_FAILED: {
        code: number;
        message: string;
    };
    V2NIM_ERROR_CODE_DATABASE_UPGRADE_FAILED: {
        code: number;
        message: string;
    };
    V2NIM_ERROR_CODE_DATABASE_WRITE_FAILED: {
        code: number;
        message: string;
    };
    V2NIM_ERROR_CODE_DATABASE_READ_FAILED: {
        code: number;
        message: string;
    };
    V2NIM_ERROR_CODE_FILE_NOT_FOUND: {
        code: number;
        message: string;
    };
    V2NIM_ERROR_CODE_FILE_CREATE_FAILED: {
        code: number;
        message: string;
    };
    V2NIM_ERROR_CODE_FILE_OPEN_FAILED: {
        code: number;
        message: string;
    };
    V2NIM_ERROR_CODE_FILE_WRITE_FAILED: {
        code: number;
        message: string;
    };
    V2NIM_ERROR_CODE_FILE_READ_FAILED: {
        code: number;
        message: string;
    };
    V2NIM_ERROR_CODE_FILE_UPLOAD_FAILED: {
        code: number;
        message: string;
    };
    V2NIM_ERROR_CODE_FILE_DOWNLOAD_FAILED: {
        code: number;
        message: string;
    };
    V2NIM_ERROR_CODE_CLIENT_ANTISPAM: {
        code: number;
        message: string;
    };
    V2NIM_ERROR_CODE_SERVER_ANTISPAM: {
        code: number;
        message: string;
    };
    V2NIM_ERROR_CODE_PLUGIN_NO_FOUND: {
        code: number;
        message: string;
    };
};
export declare const V2NIMErrorCode: {
    V2NIM_ERROR_CODE_UNKNOWN: number;
    V2NIM_ERROR_CODE_REGISTER_PUSH_SDK_FAILED: number;
    V2NIM_ERROR_CODE_SUCCESS: number;
    V2NIM_ERROR_CODE_HANDSHAKE: number;
    V2NIM_ERROR_CODE_REQUEST_TEMPERARY_FORBIDDEN: number;
    V2NIM_ERROR_CODE_SERVER_UNIT_ERROR: number;
    V2NIM_ERROR_CODE_FORBIDDEN: number;
    V2NIM_ERROR_CODE_NOT_FOUND: number;
    V2NIM_ERROR_CODE_PARAMETER_ERROR: number;
    V2NIM_ERROR_CODE_RATE_LIMIT_REACHED: number;
    V2NIM_ERROR_CODE_MULTI_LOGIN_FORBIDDEN: number;
    V2NIM_ERROR_CODE_SERVER_INTERNAL_ERROR: number;
    V2NIM_ERROR_CODE_SERVER_BUSY: number;
    V2NIM_ERROR_CODE_APP_UNREACHABLE: number;
    V2NIM_ERROR_CODE_SERVICE_UNAVAILABLE: number;
    V2NIM_ERROR_CODE_PROTOCOL_BLACKHOLE_FILTERED: number;
    V2NIM_ERROR_CODE_NO_PERMISSION: number;
    V2NIM_ERROR_CODE_UNPACK_ERROR: number;
    V2NIM_ERROR_CODE_PACK_ERROR: number;
    V2NIM_ERROR_CODE_IM_DISABLED: number;
    V2NIM_ERROR_CODE_SERVICE_ADDRESS_INVALID: number;
    V2NIM_ERROR_CODE_APPKEY_NOT_EXIST: number;
    V2NIM_ERROR_CODE_BUNDLEID_CHECK_FAILED: number;
    V2NIM_ERROR_CODE_APPKEY_BLOCKED: number;
    V2NIM_ERROR_CODE_INVALID_TOKEN: number;
    V2NIM_ERROR_CODE_ROBOT_NOT_ALLOWED: number;
    V2NIM_ERROR_CODE_ACCOUNT_NOT_EXIST: number;
    V2NIM_ERROR_CODE_ACCOUNT_CHAT_BANNED: number;
    V2NIM_ERROR_CODE_ACCOUNT_BANNED: number;
    V2NIM_ERROR_CODE_ACCOUNT_IN_BLOCK_LIST: number;
    V2NIM_ERROR_CODE_USER_PROFILE_NOT_EXIST: number;
    V2NIM_ERROR_CODE_USER_PROFILE_HIT_ANTISPAM: number;
    V2NIM_ERROR_CODE_PEER_FRIEND_LIMIT: number;
    V2NIM_ERROR_CODE_FRIEND_APPLICATION_NOT_EXIST: number;
    V2NIM_ERROR_CODE_FRIEND_NOT_EXIST: number;
    V2NIM_ERROR_CODE_FRIEND_ALREADY_EXIST: number;
    V2NIM_ERROR_CODE_SELF_FRIEND_OPERATION_NOT_ALLOWED: number;
    V2NIM_ERROR_CODE_FRIEND_LIMIT: number;
    V2NIM_ERROR_CODE_FRIEND_OPERATION_RATE_LIMIT: number;
    V2NIM_ERROR_CODE_FRIEND_HIT_ANTISPAM: number;
    V2NIM_ERROR_CODE_SELF_MUTE_OPERATION_NOT_ALLOWED: number;
    V2NIM_ERROR_CODE_MUTE_LIST_LIMIT: number;
    V2NIM_ERROR_CODE_SELF_BLOCK_LIST_OPERATION_NOT_ALLOWED: number;
    V2NIM_ERROR_CODE_BLOCK_LIST_LIMIT: number;
    V2NIM_ERROR_CODE_REVOKE_THIRD_PARTY_MESSAGE_NOT_ALLOWED: number;
    V2NIM_ERROR_CODE_SHORT_TO_LONG_URL_FAILED: number;
    V2NIM_ERROR_CODE_URL_INVALID: number;
    V2NIM_ERROR_CODE_DURATION_OUT_OF_RANGE: number;
    V2NIM_ERROR_CODE_GET_FILE_META_INFO_FAILED: number;
    V2NIM_ERROR_CODE_AUDIO_FILE_SIZE_LIMIT: number;
    V2NIM_ERROR_CODE_VOICE_TO_TEXT_TIMEOUT: number;
    V2NIM_ERROR_CODE_VOICE_TO_TEXT_FAILED: number;
    V2NIM_ERROR_CODE_REVOKE_EXCEED_TIME_LIMIT: number;
    V2NIM_ERROR_CODE_REVOKE_MESSAGE_NOT_ALLOWED: number;
    V2NIM_ERROR_CODE_FORCE_PUSH_LIST_LIMIT: number;
    V2NIM_ERROR_CODE_TEAM_MESSAGE_RECEIPT_RATE_LIMIT: number;
    V2NIM_ERROR_CODE_SNAPSHOT_NOT_EXIST: number;
    V2NIM_ERROR_CODE_PIN_LIMIT: number;
    V2NIM_ERROR_CODE_PIN_NOT_EXIST: number;
    V2NIM_ERROR_CODE_QUICK_COMMENT_LIMIT: number;
    V2NIM_ERROR_CODE_PIN_ALREADY_EXIST: number;
    V2NIM_ERROR_CODE_REVOKE_MESSAGE_TO_SELF_NOT_ALLOWED: number;
    V2NIM_ERROR_CODE_APP_CHAT_BANNED: number;
    V2NIM_ERROR_CODE_QUICK_COMMENT_FUNCTION_DISABLED: number;
    V2NIM_ERROR_CODE_PIN_FUNCTION_DISABLED: number;
    V2NIM_ERROR_CODE_TEAM_READ_RECEIPT_FUNCTION_DISABLED: number;
    V2NIM_ERROR_CODE_P2P_READ_RECEIPT_FUNCTION_DISABLED: number;
    V2NIM_ERROR_CODE_RATE_LIMIT_FOR_MESSAGING_REACHED: number;
    V2NIM_ERROR_CODE_MESSAGE_HIT_ANTISPAM: number;
    V2NIM_ERROR_CODE_MESSAGE_NOT_EXIST: number;
    V2NIM_ERROR_CODE_UNSENDING_MESSAGE_EXPIRED: number;
    V2NIM_ERROR_CODE_TEAM_MARK_READ_FAILED: number;
    V2NIM_ERROR_CODE_SENDER_OR_MANAGER_PERMISSION_ONLY_REVOKE: number;
    V2NIM_ERROR_CODE_DELETE_SELF_MESSAGE_NOT_ALLOWED: number;
    V2NIM_ERROR_CODE_NOT_CHATBOT_ACCOUNT: number;
    V2NIM_ERROR_CODE_MESSAGE_SENSE_REQUIRED: number;
    V2NIM_ERROR_CODE_HIGH_PRIORITY_MESSAGE_RATE_LIMIT: number;
    ACK_MESSAGE_BE_HIGH_PRIORITY: number;
    V2NIM_ERROR_CODE_DUPLICATE_CLIENT_MESSAGE_ID: number;
    V2NIM_ERROR_CODE_INVALID_TIME_RANGE: number;
    V2NIM_ERROR_CODE_MESSAGE_HIT_CLIENT_ANTISPAM: number;
    V2NIM_ERROR_CODE_NOT_ADVANCED_TEAM: number;
    V2NIM_ERROR_CODE_TEAM_MANAGER_LIMIT: number;
    V2NIM_ERROR_CODE_JOINED_TEAM_LIMIT: number;
    V2NIM_ERROR_CODE_TEAM_NORMAL_MEMBER_CHAT_BANNED: number;
    V2NIM_ERROR_CODE_INVITED_ACCOUNT_NOT_FRIEND: number;
    V2NIM_ERROR_CODE_REJECT_ALL_TEAM_APPLICATIONS: number;
    V2NIM_ERROR_CODE_TEAM_NOT_EXIST: number;
    V2NIM_ERROR_CODE_TEAM_ALREADY_CHAT_BANNED: number;
    V2NIM_ERROR_CODE_ALL_TEAM_MEMBER_CHAT_BANNED: number;
    V2NIM_ERROR_CODE_EXTENDED_SUPER_TEAM_LIMIT: number;
    V2NIM_ERROR_CODE_CREATED_TEAM_LIMIT: number;
    V2NIM_ERROR_CODE_TEAM_INVITATION_LIMIT: number;
    V2NIM_ERROR_CODE_TEAM_HIT_ANTISPAM: number;
    V2NIM_ERROR_CODE_EXTENDED_SUPER_TEAM_LIMIT_NOT_CONFIGURED: number;
    V2NIM_ERROR_CODE_SUPER_TEAM_SERVICE_DISABLED: number;
    V2NIM_ERROR_CODE_TEAM_READ_RECEIPT_RECORD_NOT_FOUND: number;
    V2NIM_ERROR_CODE_NOT_MANAGER: number;
    V2NIM_ERROR_CODE_ONLINE_MEMBER_COUNT_DISABLED: number;
    V2NIM_ERROR_CODE_TRANSFER_DISABLED: number;
    V2NIM_ERROR_CODE_CREATE_TEAM_DISABLED: number;
    V2NIM_ERROR_CODE_EXTENDED_SUPER_TEAM_CREATE_FAILED: number;
    V2NIM_ERROR_CODE_TEAM_MESSAGE_READ_RECEIPT_DISABLED: number;
    V2NIM_ERROR_CODE_RETRY: number;
    V2NIM_ERROR_CODE_CHAT_BAN_LIST_CONTAIN_NOT_TEAM_MEMBER: number;
    V2NIM_ERROR_CODE_CHAT_BAN_LIST_CONTAIN_OPERATOR: number;
    V2NIM_ERROR_CODE_CHAT_BAN_LIST_CONTAIN_TEAM_OWNER: number;
    V2NIM_ERROR_CODE_OPERATION_ON_TEAM_MANAGER_NOT_ALLOWED: number;
    V2NIM_ERROR_CODE_NO_TEAM_INVITE_PERMISSION: number;
    V2NIM_ERROR_CODE_TEAM_OWNER_QUIT_NOT_ALLOWED: number;
    V2NIM_ERROR_CODE_TEAM_OWNER_IN_KICK_LIST: number;
    V2NIM_ERROR_CODE_INVITE_ROBOT_ACCOUNT_NOT_ALLOWED: number;
    V2NIM_ERROR_CODE_KICK_OPERATOR_NOT_ALLOWED: number;
    V2NIM_ERROR_CODE_TEAM_MEMBER_ALREADY_EXIST: number;
    V2NIM_ERROR_CODE_TEAM_MEMBER_CAN_NOT_MODIFY_SELF: number;
    V2NIM_ERROR_CODE_TEAM_INVITATION_NOT_EXIST: number;
    V2NIM_ERROR_CODE_OPERATION_ON_TEAM_OWNER_NOT_ALLOWED: number;
    V2NIM_ERROR_CODE_TEAM_MEMBER_NOT_EXIST: number;
    V2NIM_ERROR_CODE_TEAM_MEMBER_CHAT_BANNED: number;
    V2NIM_ERROR_CODE_TEAM_OWNER_OPERATION_PERMISSION_REQUIRED: number;
    V2NIM_ERROR_CODE_TEAM_OWNER_OR_MANAGER_OPERATION_PERMISSION_REQUIRED: number;
    V2NIM_ERROR_CODE_TEAM_MEMBER_CONCURRENT_OPERATION_FAILED: number;
    V2NIM_ERROR_CODE_TEAM_MEMBER_HIT_ANTISPAM: number;
    V2NIM_ERROR_CODE_CONVERSATION_AND_ACCOUNT_MISMATCH: number;
    V2NIM_ERROR_CODE_CONVERSATION_STICK_TOP_LIMIT: number;
    V2NIM_ERROR_CODE_CONVERSATION_BELONGED_GROUP_LIMIT: number;
    V2NIM_ERROR_CODE_CONVERSATION_IS_NOT_STICK_TOP: number;
    V2NIM_ERROR_CODE_STICK_TOP_DISABLED: number;
    V2NIM_ERROR_CODE_CONVERSATION_NOT_EXIST: number;
    V2NIM_ERROR_CODE_CHATROOM_LINK_UNAVAILABLE: number;
    V2NIM_ERROR_CODE_IM_CONNECTION_ABNORMAL: number;
    V2NIM_ERROR_CODE_CHATROOM_NOT_EXIST: number;
    V2NIM_ERROR_CODE_CHATROOM_CLOSED: number;
    V2NIM_ERROR_CODE_CHATROOM_REPEATED_OPERATION: number;
    V2NIM_ERROR_CODE_CHATROOM_DISABLED: number;
    V2NIM_ERROR_CODE_ALL_CHATROOM_MEMBER_CHAT_BANNED: number;
    V2NIM_ERROR_CODE_CHATROOM_HIT_ANTISPAM: number;
    V2NIM_ERROR_CODE_ANONYMOUS_MEMBER_FORBIDDEN: number;
    V2NIM_ERROR_CODE_CHATROOM_MEMBER_NOT_EXIST: number;
    V2NIM_ERROR_CODE_CHATROOM_MEMBER_REPEATED_OPERATION: number;
    V2NIM_ERROR_CODE_CHATROOM_MEMBER_CHAT_BANNED: number;
    V2NIM_ERROR_CODE_ACCOUNT_IN_CHATROOM_BLOCK_LIST: number;
    V2NIM_ERROR_CODE_CHATROOM_OWNER_OPERATION_PERMISSION_REQUIRED: number;
    V2NIM_ERROR_CODE_SELF_IN_CHATROOM_MEMBER_OPERATION_LIST: number;
    V2NIM_ERROR_CODE_CHATROOM_OWNER_OR_MANAGER_OPERATION_PERMISSION_REQUIRED: number;
    V2NIM_ERROR_CODE_CHATROOM_MEMBER_LIMIT: number;
    V2NIM_ERROR_CODE_CHATROOM_MEMBER_CONCURRENT_OPERATION_FAILED: number;
    V2NIM_ERROR_CODE_CHATROOM_MEMBER_HIT_ANTISPAM: number;
    V2NIM_ERROR_CODE_CONVERSATION_GROUP_NOT_EXIST: number;
    V2NIM_ERROR_CODE_CONVERSATION_GROUP_LIMIT: number;
    V2NIM_ERROR_CODE_CONVERSATIONS_IN_GROUP_LIMIT: number;
    V2NIM_ERROR_CODE_SIGNALLING_ROOM_EXIST: number;
    V2NIM_ERROR_CODE_SIGNALLING_INVITE_ACCEPTED: number;
    V2NIM_ERROR_CODE_SIGNALLING_MEMBER_NOT_EXIST: number;
    V2NIM_ERROR_CODE_SIGNALLING_MEMBER_ALREADY_EXIST: number;
    V2NIM_ERROR_CODE_SIGNALLING_MEMBER_ALREADY_EXIST_AND_DEVICE_ID_NOT_UNIQUE: number;
    V2NIM_ERROR_CODE_SIGNALLING_UID_NOT_UNIQUE: number;
    V2NIM_ERROR_CODE_SIGNALLING_INVITE_REJECTED: number;
    V2NIM_ERROR_CODE_SIGNALLING_MEMBER_OFFLINE_BUT_PUSH_REACHABLE: number;
    V2NIM_ERROR_CODE_SIGNALLING_MEMBER_OFFLINE_AND_PUSH_NOT_REACHABLE: number;
    V2NIM_ERROR_CODE_SIGNALLING_INVITE_NOT_EXIST: number;
    V2NIM_ERROR_CODE_SIGNALLING_ROOM_NOT_EXIST: number;
    V2NIM_ERROR_CODE_SIGNALLING_SERVICE_DISABLED: number;
    V2NIM_ERROR_CODE_SIGNALLING_ROOM_MEMBER_LIMIT: number;
    V2NIM_ERROR_CODE_COLLECTION_LIMIT: number;
    V2NIM_ERROR_CODE_COLLECTION_NOT_EXIST: number;
    V2NIM_ERROR_CODE_COLLECTION_CONCURRENT_OPERATION_FAILED: number;
    V2NIM_ERROR_CODE_INTERNAL: number;
    V2NIM_ERROR_CODE_ILLEGAL_STATE: number;
    V2NIM_ERROR_CODE_MISUSE: number;
    V2NIM_ERROR_CODE_CANCELLED: number;
    V2NIM_ERROR_CODE_CALLBACK_FAILED: number;
    V2NIM_ERROR_CODE_INVALID_PARAMETER: number;
    V2NIM_ERROR_CODE_TIMEOUT: number;
    V2NIM_ERROR_CODE_RESOURCE_NOT_EXIST: number;
    V2NIM_ERROR_CODE_RESOURCE_ALREADY_EXIST: number;
    V2NIM_ERROR_CODE_CONNECT_FAILED: number;
    V2NIM_ERROR_CODE_CONNECT_TIMEOUT: number;
    V2NIM_ERROR_CODE_DISCONNECT: number;
    V2NIM_ERROR_CODE_PROTOCOL_TIMEOUT: number;
    V2NIM_ERROR_CODE_PROTOCOL_SEND_FAILED: number;
    V2NIM_ERROR_CODE_REQUEST_FAILED: number;
    V2NIM_ERROR_CODE_DATABASE_OPEN_FAILED: number;
    V2NIM_ERROR_CODE_DATABASE_UPGRADE_FAILED: number;
    V2NIM_ERROR_CODE_DATABASE_WRITE_FAILED: number;
    V2NIM_ERROR_CODE_DATABASE_READ_FAILED: number;
    V2NIM_ERROR_CODE_FILE_NOT_FOUND: number;
    V2NIM_ERROR_CODE_FILE_CREATE_FAILED: number;
    V2NIM_ERROR_CODE_FILE_OPEN_FAILED: number;
    V2NIM_ERROR_CODE_FILE_WRITE_FAILED: number;
    V2NIM_ERROR_CODE_FILE_READ_FAILED: number;
    V2NIM_ERROR_CODE_FILE_UPLOAD_FAILED: number;
    V2NIM_ERROR_CODE_FILE_DOWNLOAD_FAILED: number;
    V2NIM_ERROR_CODE_CLIENT_ANTISPAM: number;
    V2NIM_ERROR_CODE_SERVER_ANTISPAM: number;
    V2NIM_ERROR_CODE_PLUGIN_NO_FOUND: number;
};
export declare class V2NIMErrorImpl extends Error implements V2NIMError {
    /**
     * 错误码
     */
    code: number;
    desc: string;
    detail: {
        [key: string]: any;
    };
    duration?: number;
    constructor(b16: Partial<V2NIMError>);
}
export declare function genCmdError(w15: number, x15: string): V2NIMError | null;
export declare class ValidateError extends V2NIMErrorImpl {
    data: NIMEStrAnyObj;
    rules?: string;
    constructor(t15: string, u15?: {}, v15?: string);
}
export declare class ValidateErrorV2 extends V2NIMErrorImpl {
    constructor(s15: Partial<V2NIMError>);
}
export declare class FormatError extends V2NIMErrorImpl {
    constructor(p15: string, q15: string, r15: string);
}
export declare class UploadError extends V2NIMErrorImpl {
    constructor(o15: {
        code?: number;
        desc?: string;
        detail?: {
            reason: string;
            rawError: Error;
            curProvider: 1 | 2;
            mixStorePolicy?: NIMEStrAnyObj;
            file?: File | string;
        };
    });
}
export declare class CustomError extends V2NIMErrorImpl {
    data: NIMEStrAnyObj;
    constructor(l15: string, m15?: {}, n15?: number);
}
export declare function checkStubServiceErrorCode(j15: Error): void;
