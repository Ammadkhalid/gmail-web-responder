import HttpClient from "@/api/HttpClient";

class Bots {

    static runBot(jobName, runOnce, keywords, fields) {
        let formData = new FormData();

        formData.append('job_name', jobName);
        formData.append('run_once', runOnce);
        formData.append('keywords', keywords);

        fields.forEach(element => {
            formData.append('message', element.message);
            formData.append('number', element.number);
            formData.append('reply_delay', element.reply_delay);

            if(element.file !== undefined && element.file !== null) {
                let fileNameExtension = element.file.name.split(".")
                let fileName = fileNameExtension[fileNameExtension.length - 1]

                formData.append('file', element.file, `${element.number}.${fileName}`);
            }
        });

        return new Promise((resolve, reject) => {
            HttpClient.post('gmail/job/execute', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }).then(res => {
                resolve(res);
            }).catch(error => {
                reject(error);
            })
        });
    }

    static listJobs() {
        return new Promise((resolve, reject) => {
            HttpClient.get('gmail/job/list').then(res => {
                resolve(res);
            }).catch(error => {
                reject(error);
            })
        });
    }

    static deleteJob(id) {
        return new Promise((resolve, reject) => {
            HttpClient.delete(`gmail/job/${id}/delete`).then(res => {
                resolve(res);
            }).catch(error => {
                reject(error);
            })
        });
    }

}

export default Bots;