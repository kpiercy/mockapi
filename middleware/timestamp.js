
const getStamp = async () => {
    try {
        const d = new Date()
        let year = d.getFullYear()
        let month = d.getMonth() + 1
        let day = d.getDate()
        let hour = d.getHours()
        let min = d.getMinutes()
        let s = d.getSeconds()
        let ms = d.getMilliseconds()

        const stamp = month +"-"+ day +"-"+ year +" "+ hour +":" + min + ":" + s + "." + ms
        return stamp
        
    } catch (e) {
        console.log(e)
        //throw new Error(e)
    }
};

module.exports = {
    getStamp
}