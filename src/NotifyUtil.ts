import { Notify } from 'quasar'

export default async function notify(caption: string, message: string, type: string, task: () => void ) {
    const dismiss = Notify.create({
        caption: caption,
        message: message,
        type: type,
        timeout: 0,
        position: "bottom-right",
        progress: true
    })
    try{
        await task()
    } catch (e) {
        Notify.create({
            caption: "Error",
            message: "And error has occured",
            type: 'negative',
            position: "bottom-right",
        })
    } finally {
        dismiss();
    }

}