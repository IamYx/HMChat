import { FileState } from './FileState';
import { UploadTask } from './UploadTask';
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
declare function uploadTrunk(h62: UploadTask, i62: number, j62: number, k62: any, l62: any, m62: any, n62: FileState, o62: string): void;
export default uploadTrunk;
