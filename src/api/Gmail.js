import HttpClient from "@/api/HttpClient";

class Gmail {
    static addAccount(email, password) {
        return new Promise((resolve, reject) => {
            HttpClient.post('gmail/account/add', {
                user: email,
                password
            }).then(res => {
                resolve(res);
            }).catch(error => {
                reject(error);
            })
        });
    }

    static deleteAccount(pk) {
        return new Promise((resolve, reject) => {
            HttpClient.delete(`gmail/account/${pk}/delete`).then(res => {
                resolve(res);
            }).catch(error => {
                reject(error);
            })
        });
    }

}

export default Gmail;