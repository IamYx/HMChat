export function registerAspect(l111, m111) {
    m111.reporterService.addAspect(l111, 'addCustomStorageScene');
    m111.reporterService.addAspect(l111, 'getStorageSceneList');
    m111.reporterService.addAspect(l111, 'createUploadFileTask');
    m111.reporterService.addAspect(l111, 'uploadFile');
    m111.reporterService.addAspect(l111, 'cancelUploadFile');
    m111.reporterService.addAspect(l111, 'downloadFile');
    m111.reporterService.addAspect(l111, 'cancelDownloadFile');
    m111.reporterService.addAspect(l111, 'shortUrlToLong');
}
