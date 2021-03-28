const validateRollNums = (string) =>{
    const reg = new RegExp('^[0-9,]*$')
    if(reg.test(string)){
        return true
    }
    return false
}

module.exports = { validateRollNums }