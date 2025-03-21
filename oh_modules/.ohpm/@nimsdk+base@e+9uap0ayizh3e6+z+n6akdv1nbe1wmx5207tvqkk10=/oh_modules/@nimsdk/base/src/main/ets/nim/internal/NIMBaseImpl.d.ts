import dataRdb from '@ohos.data.relationalStore';
import { AnyArr } from '../sdk/types';
export declare abstract class NIMBaseImpl<T> {
    /**
     * Default constructor must be set to 'PRIVATE'
     */
    protected constructor();
    /**
     * Construct by parameters.
     * @param args
     */
    protected abstract fromParams(...t127: AnyArr): void;
    /**
     * Construct by cloud interface.
     * @param cloud
     */
    protected abstract fromCloud(s127: T): void;
    /**
     * Construct by valueBucket of db.
     * @param valuesBucket
     */
    protected abstract fromValueBucket(r127: dataRdb.ValuesBucket): void;
    /**
     * Return a full dataRdb.ValuesBucket from db by self.
     */
    /**
     * The return type of toJSON, like calling JSON.stringify(obj).
     * @returns
     */
    abstract toJSON(): T;
    /**
     * If the class of <U extendsNIMBaseImpl<T>> want to construct new obj by 'PARAMS', please to call initByParams(x).
     * Example: @see V2NIMFriendImpl.buildFromParams(xxx)
     *
     * @param constructFun, Like () => return new V2NIMFriendImpl()
     * @param args, Like 'name, accountId, xxx'
     * @returns
     */
    protected static initByParams<p127, q127 extends NIMBaseImpl<p127>>(r6: () => q127, ...s6: AnyArr): q127;
    /**
     * If the class of <U extendsNIMBaseImpl<T>> want to construct new obj by 'CLOUD', please to call initByCloud(x).
     * Example: @see V2NIMFriendImpl.buildFromCloud(xxx)
     *
     * @param constructFun, Like () => return new V2NIMFriendImpl()
     * @param cloud Like 'V2NIMFriend'
     * @returns
     */
    protected static initByCloud<n127, o127 extends NIMBaseImpl<n127>>(o6: () => o127, p6: n127): o127;
    /**
     * If the class of <U extendsNIMBaseImpl<T>> want to construct new obj by 'valuesBucket', please to call initByValueBucket(x).
     * Example: @see V2NIMFriendImpl.buildFromValueBucket(xxx)
     *
     * @param constructFun, Like () => return new V2NIMFriendImpl()
     * @param valuesBucket, queried from table
     * @returns
     */
    protected static initByValueBucket<l127, m127 extends NIMBaseImpl<l127>>(l6: () => m127, m6: dataRdb.ValuesBucket): m127;
}
