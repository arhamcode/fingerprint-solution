# fingerprint-solution

Library untuk mendownload data Absensi dari Mesin fingerprint Solution

### Instalasi
```bash
$ npm i fingerprint-solution
```

### Penggunaan
import library fingerprint-solution gunakan fungsi download untuk mendownload data
dari mesin absensi. fungsi download menggunakan dua parameter :
- ip [required] alamat ip dari mesin absensi
- listPin [optional] array berisi pin absensi yang akan didownload, kosongkan jika
  mengambil seluruh data dari mesin finger

```javascript
const { FingerprintSolution } = require('fingerprint-solution')

async function main() {
    try {
        console.log(await FingerprintSolution.download('192.168.23.40', []))
    } catch (error) {
        console.error(error)
    }
}

main()
```
