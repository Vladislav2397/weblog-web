// eslint-disable-next-line import/no-extraneous-dependencies
import { initializeApp } from "firebase/app"
import { ENV } from "@/shared/config"

const firebaseConfig = {
    apiKey: ENV.API_KEY,
    authDomain: ENV.AUTH_DOMAIN,
    projectId: "weblog-c5d09",
    storageBucket: ENV.STORAGE_BUCKET,
    messagingSenderId: ENV.MESSAGING_SENDER_ID,
    appId: ENV.APP_ID,
}

const app = initializeApp(firebaseConfig)
