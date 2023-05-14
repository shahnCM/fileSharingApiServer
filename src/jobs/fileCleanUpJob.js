const { Queue, Worker } = require('bullmq')
const { file_clean_up_interval, file_max_inactive_time } = require('../../config/serverConfig')
const { deleteOneByName, findOneByName } = require('../repositories/fileRepository')
const { storageServiceFactory } = require('../factories/storageFactories')
const { ioRedisConn } = require('../redis')
const { localeTime, timestampUnix } = require('../utils/commonUtils')

const options = {
  removeOnComplete: true,
  removeOnFail: false,
  delay: parseInt(file_clean_up_interval) * 1000,
  attempts: Number.MAX_SAFE_INTEGER,
  backoff: {
    type: 'fixed',
    delay: parseInt(file_clean_up_interval) * 1000,
  },
}

const queue = "fileCleanUpQueue"
const fileCleanUpQueue = new Queue(queue, { connection: ioRedisConn })

new Worker(queue, async (job) => {
  console.log('\n\t[JOB] FROM FILE CLEAN UP QUEUE', JSON.stringify(job.data))

  const storageService = storageServiceFactory(job.data.storage)

  const fileInfo = await findOneByName(job.data.name)

  if (!fileInfo) {
    console.log('\t[JOB] File not found while cleaning up, already deleted maybe')
    return true;
  }

  const { updated_at } = fileInfo
  const fileLastDownloadLocaleTimestamp = timestampUnix(updated_at)
  const currentUnixLocaleTimestamp = timestampUnix(localeTime())
  const fileInavctivityTimestamp = currentUnixLocaleTimestamp - fileLastDownloadLocaleTimestamp

  if (file_max_inactive_time > fileInavctivityTimestamp) {
    console.log('\t[JOB] backoff, file is still active ', fileInavctivityTimestamp, ' seconds of inactivity')
    throw new Error('[JOB] backoff, file is still active')
  }

  console.log('\t[JOB] deleting file after ', fileInavctivityTimestamp, ' seconds of inactivity')
  storageService.deleteFile(job.data)
  deleteOneByName(job.data.name)

  return true

}, { connection: ioRedisConn })

exports.dispatchFileCleanUpJob = async (data) => await fileCleanUpQueue.add(queue, data, options)
