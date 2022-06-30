const { FingerprintSolution } = require('./index')

async function main() {
    try {
        console.log(await FingerprintSolution.download('192.168.23.40', []))
    } catch (error) {
        console.error(error)
    }
}

main()