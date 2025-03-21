import { FileState } from './fileState';
import Task from './Task';
/**
 * 上传分片
 * @method uploadTrunk
 * @param  {Object}   param     AJAX参数
 *  	param中的属性有：
 * 		serveIp {String} IP地址
 * 		bucketName {String} 桶名
 * 		objectName {String} 对象名
 * 		token {String} 上传凭证
 * @param  {Object}   trunkData 分片数据
 * 		trunkData属性有：
 * 		file {File} File对象
 *      fileKey {String} 文件名和文件大小的组合值
 *      offset {long} 当前分片在整个对象中的起始偏移量
 *      trunkSize {long} 分片大小
 *      trunkEnd {long} 分片结束位置
 *      context: {String} 上传上下文
 * @param  {Function} callback  文件（非分片）上传成功回调函数
 * 		回调函数参数：
 * 		trunkData {Object} 分片数据
 * @return {void}
 */
declare function uploadTrunk(j176: Task, k176: number, l176: number, m176: any, n176: any, o176: FileState): void;
export default uploadTrunk;
