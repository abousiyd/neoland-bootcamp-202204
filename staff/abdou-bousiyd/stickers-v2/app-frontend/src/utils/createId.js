function createId() {
    return (Math.random() + Date.now()).toFixed(10)
}

export default createId